import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Classifier from './components/Classifier/Classifier';


function App() {
    // Проверяем, авторизован ли пользователь (по наличию токена в localStorage)
    const isAuthenticated = !!localStorage.getItem('access_token');

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                {/* Добавляем проверку на аутентификацию для защищенных маршрутов */}
                <PrivateRoute path="/classifier" component={Classifier} isAuthenticated={isAuthenticated} />
            </Switch>
        </Router>
    );
}

// Компонент для защиты маршрутов
// Компонент для защиты маршрутов
function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
    // Проверяем токен доступа в localStorage
    const accessToken = localStorage.getItem('access_token');

    // Если токен доступа отсутствует или недействителен, перенаправляем пользователя на страницу входа
    if (!accessToken || !isAccessTokenValid(accessToken)) {
        return <Redirect to="/" />;
    }

    return (
        <Route
            {...rest}
            render={(props) => <Component {...props} />}
        />
    );
}

// Функция для проверки действительности токена доступа на сервере
async function isAccessTokenValid(accessToken) {
    try {
        // Отправляем запрос на сервер для проверки токена
        const response = await fetch('http://localhost:8000/api/check-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return response.ok;
    } catch (error) {
        return false;
    }
}


export default App;
