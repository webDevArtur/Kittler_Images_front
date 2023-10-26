import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
    const [lastName, setLastName] = useState(''); // Фамилия
    const [firstName, setFirstName] = useState(''); // Имя
    const [patronymic, setPatronymic] = useState(''); // Отчество
    const [email, setEmail] = useState(''); // Email
    const [password, setPassword] = useState(''); // Пароль
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();

        const userData = {
            last_name: lastName, // Фамилия
            first_name: firstName, // Имя
            patronymic: patronymic, // Отчество
            email: email, // Email
            password: password, // Пароль
        };

        fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                if (response.ok) {
                    setMessage('Регистрация прошла успешно');
                    setMessageType('success');
                } else {
                    throw new Error('Ошибка регистрации');
                }
            })
            .catch(error => {
                setMessage('Пользователь с данными уже существует.');
                setMessageType('error');
            });
    }

    return (
        <div className={styles.containerStyle}>
            <div className={styles.formStyle}>
                <h2 className={styles.titleStyle}>Регистрация</h2>
                {message && (
                    <div className={`${styles.message} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
                        {message}
                    </div>
                )}
                <form>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Имя"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Отчество"
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                        className={styles.inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.inputStyle}
                    />
                    <button onClick={handleRegister} className={styles.buttonStyle}>Зарегистрироваться</button>
                </form>
                <Link to="/" className={styles.linkStyle}>Уже есть аккаунт? Войти</Link>
            </div>
        </div>
    );
}

export default Register;
