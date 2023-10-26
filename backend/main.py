from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException

app = FastAPI()


# Разрешить все источники
origins = ["*"]

# Настроить CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создайте модель данных для регистрации
class UserData(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    patronymic: str

# Создайте хэшер паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Список пользователей (замените его на базу данных)
users = []

# Создайте функцию для создания и проверки токенов
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Define the function to verify the token
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username,
                               first_name=payload.get("first_name"),
                               last_name=payload.get("last_name"),
                               patronymic=payload.get("patronymic"))
    except JWTError:
        raise credentials_exception
    return token_data

# Define the TokenData class
class TokenData(BaseModel):
    username: str
    first_name: str
    last_name: str
    patronymic: str

# Define the credentials_exception
credentials_exception = HTTPException(
    status_code=401,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

# Функция для проверки пользователя
def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="login"))):
    token_data = verify_token(token)
    return token_data

# Роут для обработки регистрации
@app.post("/api/register")
async def register_user(user_data: UserData):
    # Проверяем, не существует ли уже пользователь с таким email
    if any(user.email == user_data.email for user in users):
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")

    # Создаем нового пользователя и сохраняем в базе данных
    users.append(user_data)

    # В реальном приложении здесь может потребоваться хеширование пароля

    # Создайте токен с данными о пользователе, включая имя, фамилию и отчество
    token_data = {"sub": user_data.email,
                  "first_name": user_data.first_name,
                  "last_name": user_data.last_name,
                  "patronymic": user_data.patronymic}
    access_token = create_access_token(data=token_data)

    return {"message": "Регистрация прошла успешно", "access_token": access_token, "token_type": "bearer"}

class LoginData(BaseModel):
    username: str
    password: str

@app.post("/api/login", response_model=dict)
async def login_user(login_data: LoginData):
    print("Login request received with username:", login_data.username)

    user = next((u for u in users if u.email == login_data.username), None)
    print("Users:", users)

    if user is None:
        print("Login failed for username:", login_data.username)
        raise HTTPException(status_code=401, detail="Неверные учетные данные")

    if user.password != login_data.password:
        print("Password doesn't match for username:", login_data.username)
        raise HTTPException(status_code=401, detail="Неверные учетные данные")

    # Создайте токен с данными о пользователе, включая имя, фамилию и отчество
    token_data = {"sub": user.email,
                  "first_name": user.first_name,
                  "last_name": user.last_name,
                  "patronymic": user.patronymic}
    access_token = create_access_token(data=token_data)
    return {"access_token": access_token, "token_type": "bearer"}

# Защищенный роут для доступа к защищенным данным
@app.get("/api/protected-data")
async def get_protected_data(current_user: TokenData = Depends(get_current_user)):
    return {"message": "Это защищенные данные"}

class SelectedFeaturesData(BaseModel):
    selectedFeatures: list
    selectedImage: str
    accessToken: str


@app.post("/receive-data")
async def receive_data(selectedFeaturesData: SelectedFeaturesData):
    if not selectedFeaturesData.accessToken:
        raise HTTPException(status_code=401, detail="Требуется токен доступа")

    token = selectedFeaturesData.accessToken
    try:
        # Декодируйте токен и извлеките данные, как ранее
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        first_name: str = payload.get("first_name")
        last_name: str = payload.get("last_name")
        patronymic: str = payload.get("patronymic")

        # Теперь можно использовать извлеченные данные
        return {"message": "Данные успешно получены", "username": username, "first_name": first_name, "last_name": last_name, "patronymic": patronymic}
    except JWTError:
        raise HTTPException(status_code=401, detail="Неверный токен")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
