import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            username: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                setMessage('Вход выполнен успешно');
                setMessageType('success');
                setTimeout(() => {
                    history.push('/home');
                }, 1000);
            } else {
                setMessage('Произошла ошибка при аутентификации. Пожалуйста, попробуйте еще раз.'); // Display the error message from the API
                setMessageType('error');
            }

        } catch (error) {
            setMessage('Произошла ошибка при аутентификации. Пожалуйста, попробуйте еще раз.');
            setMessageType('error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>Вход</h2>
                {message && (
                    <div className={`${styles.message} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
                        {message}
                    </div>
                )}
                <form>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button onClick={handleLogin} className={styles.button}>Войти</button>
                </form>
                <Link to="/register" className={styles.link}>Нет аккаунта? Зарегистрироваться</Link>
            </div>
        </div>
    );
}

export default Login;
