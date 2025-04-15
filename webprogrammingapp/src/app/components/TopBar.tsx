import React, { useEffect, useState } from 'react';
import styles from './topBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import temp from '../images/tempG.png'
import dawglogo from '../images/dawglogo.png'
import { useRouter } from 'next/navigation';

const TopBar = ({isLoggedIn, title, changeLogStatus} : {isLoggedIn:boolean, title:string, changeLogStatus:(x:boolean) => void}) => {
    const router = useRouter();
    const notLoggedIn = (
        <div className={styles.links}>
                {/*<Link
                    href={{
                        pathname: '/seat-selection',
                        query: {},
                    }}
                    className={styles.link}
                >
                    Login
                </Link>*/}
                <p onClick={()=>changeLogStatus(true)} className={styles.p_link}> Login </p>
                <p></p>
                <p onClick={() => router.push('/register')} className={styles.p_link}> Register </p>
                
            </div>
    )

    const loggedIn = (
        <div className={styles.links}>
                <Link
                    href={{
                        pathname: '/profile',
                        query: {},
                    }}
                    className={styles.link}
                >
                    My Account
                </Link>
                <p>|</p>
                {/*<Link
                    href={{
                        pathname: '/seat-selection',
                        query: {},
                    }}
                    className={styles.link}
                >
                    Logout
                </Link>*/}
                <p onClick={()=>changeLogStatus(false)} className={styles.p_link}> Logout </p>
            </div>
    )

    return (
        <div className={styles.main_body}>
            <Link href="/splash">
                <Image
                    src={dawglogo}
                    height={80}
                    width={120}
                    alt="Dawgify about page button"
                />
            </Link>
            <Link href="/">

            <p id={styles.dawgify}> {title} </p>
            </Link>


            {isLoggedIn ? loggedIn : notLoggedIn}
        </div>
  );
};

export default TopBar;