'use client'
import React, { useState } from 'react';
import styles from './home.module.css'
import TopBar from '../components/TopBar'
import Image from 'next/image';
import temp from '../images/tempG.png'

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log(styles.main_body)
    const width = 510
    const height = 170

    return (
        <div className={styles.main_body}>
            <TopBar isLoggedIn={isLoggedIn} title={"DAWGIFY"}/>
            <hr></hr>
            <section className={styles.body}>
                <div className={styles.get_started}>
                    <p className={styles.text_in_image}> Get Started </p>
                </div>
                <div className={styles.music_tabs}> 
                    <div className={styles.card_holder}>
                        <Image
                            src={temp}
                            height={height}
                            width={width}
                            alt="Study Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Study Music </p>
                    </div>
                    <div className={styles.card_holder}>
                        <Image
                            src={temp}
                            height={height}
                            width={width}
                            alt="Study Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Study Music </p>
                    </div>
                    <div className={styles.card_holder}>
                        <Image
                            src={temp}
                            height={height}
                            width={width}
                            alt="Walking Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Walking Music </p>
                    </div>
                    <div className={styles.card_holder}>
                        <Image
                            src={temp}
                            height={height}
                            width={width}
                            alt="Game Day Tunes button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Game Day Tunes </p>
                    </div>
                    <div className={styles.card_holder}>
                        <Image
                            src={temp}
                            height={height}
                            width={width}
                            alt="Workout Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Workout </p>
                    </div>
                    <div className={styles.card_holder}>
                        <Image
                            src={temp}
                            height={height}
                            width={width}
                            alt="Club Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Club Music </p>
                    </div>
                </div>
            </section>
        </div>
    );
};
