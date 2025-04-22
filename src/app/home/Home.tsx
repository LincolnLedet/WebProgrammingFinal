'use client'
import React, { useState } from 'react';
import styles from './home.module.css'
import TopBar from '../components/TopBar'
import Image from 'next/image';
import temp from '../images/tempG.png'
import workout from '../images/workoutmusic.png'
import gameday from '../images/ugagameday.png'
import study from '../images/studymusic.png'
import studying from '../images/studyingmusic.png'
import club from '../images/clubmusic.jpg'
import walking from '../images/walkingmusic.png'
import dawglogo from '../images/dawglogo.png'
import Link from 'next/link';


export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log(styles.main_body)
    const width = 510
    const height = 170

    return (
        <div className={styles.main_body}>
            <TopBar title={"DAWGIFY"} changeLogStatus={setIsLoggedIn}/>
            <hr></hr>
            <section className={styles.body}>
                
                <div className={styles.music_tabs}> 
                <Link href = "/playlistsGenre/all">
                    <div className={styles.card_holder}>
                        <Image
                            src={studying}
                            height={height}
                            width={width}
                            alt="All Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> All Music </p>
                    </div>
                    </Link>
                    <Link href = "/playlistsGenre/study">
                    <div className={styles.card_holder}>
                        <Image
                            src={study}
                            height={height}
                            width={width}
                            alt="Study Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Study Music </p>
                    </div>
                    </Link>
                    <Link href = "/playlistsGenre/walking">
                    <div className={styles.card_holder}>
                        <Image
                            src={walking}
                            height={height}
                            width={width}
                            alt="Walking Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Walking Music </p>
                    </div>
                    </Link>
                    <Link href = "/playlistsGenre/game">

                    <div className={styles.card_holder}>
                        <Image
                            src={gameday}
                            height={height}
                            width={width}
                            alt="Game Day Tunes button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Game Day Tunes </p>
                    </div>
                    </Link>
                    <Link href = "/playlistsGenre/workout">

                    <div className={styles.card_holder}>
                        <Image
                            src={workout}
                            height={height}
                            width={width}
                            alt="Workout Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Workout </p>
                    </div>
                    </Link>
                    <Link href = "/playlistsGenre/club">
                    <div className={styles.card_holder}>
                        <Image
                            src={club}
                            height={height}
                            width={width}
                            alt="Club Music button"
                            className={styles.card}
                        />
                        <p className={styles.text_in_image}> Club Music </p>
                    </div>
                    </Link>

                </div>
            </section>
        </div>
    );
};
