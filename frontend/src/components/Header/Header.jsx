import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    const history = useHistory();

    // Функция для выхода
    const handleLogout = () => {
        // Удалить токен из localStorage
        localStorage.removeItem('access_token');
        history.push('/');
    };

    return (
        <header>
            <nav>
                <Link to="/classifier">
                    <img src="/images/icon.png" alt="НИЯУ МИФИ" className={styles.label} />
                </Link>
                <ul>
                    <li>
                        <Link to="#" onClick={handleLogout} className={styles.more}>Выход</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
