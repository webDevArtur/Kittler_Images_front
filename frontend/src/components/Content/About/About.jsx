import React from 'react';
import styles from './About.module.css';
import Layout from "../../Layout/Layout";

function About() {
    return (
        <Layout>
            <main>
                <section className={styles.slide}>
                    <h2>Меланома и её факторы риска</h2>
                    <p>Меланома - это злокачественная опухоль, исходящая из пигментных клеток меланоцитов, которые определяют цвет кожи и защищают организм от ультрафиолетового излучения. Факторы риска: ультрафиолетовое излучение, кельтский фототип кожи, наличие меланомы у ближайших родственников, большое количество родинок и нарушенный иммунитет.</p>

                    <img  src="/images/about.jpg" alt="melanoma" className={styles.melanoma}/>

                    <div className={styles.container_more}>
                        <a className={styles.classifier} href="/Classifier">Анализ изображений</a>
                    </div>

                </section>


            </main>
        </Layout>
    );
}

export default About;
