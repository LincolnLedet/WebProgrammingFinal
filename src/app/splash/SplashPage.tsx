'use client'
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import Link from 'next/link';
import Image from 'next/image';
import styles from './splashPage.module.css';
import dawglogo from '../images/dawglogo.png'
import temp from '../images/tempG.png';

export default function SplashPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={styles.main_body}>
      <TopBar isLoggedIn={isLoggedIn} title="DAWGIFY" changeLogStatus={setIsLoggedIn} />
      <hr></hr>

      {/* Three Columns */}
      <div className={styles.three_columns}>
 
        <div className={styles.column}>
          <Image src={dawglogo} alt="Logo" width={275} height={250} />
          <h1 className={styles.column_h1}>Dawgify </h1>
        </div>

        <div className={styles.column}>
          <h2 className={styles.col2_header}>Dawgify</h2>
          <p className={styles.col2_content}>
          is a UGA student community playlist sharer where students can view their own Spotify accounts information and create and edit playlist to share with others.
          </p>
          <Link href="/home">
            <button className={styles.getStartedButton}> Get Started</button>
          </Link>
        </div>

        <div className={styles.column}>
          <h2 className={styles.col3_header}>Our Application:</h2>
          <div className={styles.col3_section}>
            <p className={styles.col3_text}>
            UGA students can access their Spotify account and view the statistics for their most listened songs, hours listened, genres, and more.
            </p>
          </div>
          <div className={styles.col3_section}>
            <p className={styles.col3_text}>
            Authenticated UGA students can login and edit and share playlists to a community board based on different classes, clubs, and genres
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
