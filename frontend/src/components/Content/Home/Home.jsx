import React from 'react';
import styles from './Home.module.css';
import Layout from '../../Layout/Layout.jsx'; // Путь зависит от вашей структуры каталогов

function Home() {
    return (
        <Layout>
            <main className={styles.main}>
                <section>
                    <h1>Добро пожаловать!</h1>
                    <p>
                        Данный сайт создан с целью сбора данных для развития инновационных автоматизированных систем, улучшающих процесс принятия решений в области онкодерматологии. Он позволяет анализировать изображения и выделять признаки Киттлера.
                    </p>

                    <p>
                        Наша миссия - сделать процесс диагностики кожных заболеваний более доступным, точным и эффективным. Мы верим, что технологии и медицина могут объединиться, чтобы спасти жизни и улучшить качество жизни пациентов.
                    </p>

                    <img  src="/images/home.jpg" alt="medicine_and_tech" className={styles.image}/>

                    <div className={styles.container_more}>
                        <a className={styles.more} href="/about">Подробнее</a>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Home;

