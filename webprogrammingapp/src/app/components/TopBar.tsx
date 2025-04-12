import React, { useEffect, useState } from 'react';
import styles from './topBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import temp from '../images/tempG.png'

const TopBar = ({isLoggedIn, title} : {isLoggedIn:boolean, title:string}) => {

    const notLoggedIn = (
        <div className={styles.links}>
                <Link
                    href={{
                        pathname: '/seat-selection',
                        query: {},
                    }}
                    className={styles.link}
                >
                    Login
                </Link>
                <p>|</p>
                <Link
                    href={{
                        pathname: '/seat-selection',
                        query: {},
                    }}
                    className={styles.link}
                >
                    Register
                </Link>
            </div>
    )

    const loggedIn = (
        <div className={styles.links}>
                <Link
                    href={{
                        pathname: '/seat-selection',
                        query: {},
                    }}
                    className={styles.link}
                >
                    My Account
                </Link>
                <p>|</p>
                <Link
                    href={{
                        pathname: '/seat-selection',
                        query: {},
                    }}
                    className={styles.link}
                >
                    Logout
                </Link>
            </div>
    )

    return (
        <div className={styles.main_body}>
            <Link href="/about-page">
                <Image
                    src={temp}
                    height={100}
                    width={100}
                    alt="Dawgify about page button"
                />
            </Link>
            <p id={styles.dawgify}> {title} </p>

            {isLoggedIn ? loggedIn : notLoggedIn}
        </div>
  );
};

export default TopBar;