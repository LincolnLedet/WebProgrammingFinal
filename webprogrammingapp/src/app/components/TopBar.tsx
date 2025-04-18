import React, { useEffect, useState, useRef } from 'react';
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
                <p onClick={()=>setIsOpened(true)} className={styles.p_link}> Login </p>
                <p>|</p>
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
            <p onClick={() => changeLogStatus(false)} className={styles.p_link}> Logout </p>
        </div>
    )

    const [isOpened, setIsOpened] = useState(false); 
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpened) {
        ref.current?.showModal();
        document.body.classList.add('modal-open');
        } else {
        ref.current?.close();
        document.body.classList.remove('modal-open');
        }
    }, [isOpened]);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // call login fetch
        setIsOpened(false);
        setPassword('')
        setEmail('')
        changeLogStatus(true)
    }

    return (
        <div className={styles.main_body}>
            <dialog ref={ref} className={styles.dialog}>
                <div className={styles.modal_body}>
                    <section className={styles.modal_button}>
                        <button onClick={() => setIsOpened(false)}> X </button>
                    </section>
                    <h1> Login </h1>
                    <section className={styles.form}>
                        <form onSubmit={handleSubmit}>
                            <div id={styles.login_form}>
                                <h2 className={styles.headers}> Email </h2>
                                <input 
                                    value={email} 
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className={styles.text_fields} 
                                    required 
                                />
                                <h2 className={styles.headers}> Password </h2>
                                <input 
                                    value={password} 
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className={styles.text_fields} 
                                    required 
                                />
                            </div>
                            <button type='submit' > Submit</button>
                        </form>
                        <Link href='/register'>
                            Click here to create new account!
                        </Link>
                    </section>
                </div>
            </dialog>
            <Link href="/splash">
                <Image
                    src={dawglogo}
                    height={80}
                    width={120}
                    alt="Dawgify about page button"
                />
            </Link>

            <Link href="/home">
                <p id={styles.dawgify}> {title} </p>
            </Link>


            <h2>{isLoggedIn ? loggedIn : notLoggedIn}</h2>

        </div>
    );
};

export default TopBar;