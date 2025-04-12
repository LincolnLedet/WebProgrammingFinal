'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './profile.module.css'
import TopBar from '../components/TopBar'
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import temp from '../images/tempG.png'

interface Playlist {
    id: number,
    name:string,
    picture:string,
}

export default function Profile() {
    const [name, setName] = useState('')
    const [pictureSrc, setPictureSrc] = useState('')
    const router = useRouter();

    const defaultUserPlaylists = []
    for (let i = 0; i < 4; i++) {
        let playlist = {
            id: i,
            name:"Playlist " + i,
            picture: temp.src
        }
        defaultUserPlaylists.push(playlist)
    }
    const [userPlaylists, setUserPlaylists] = useState(defaultUserPlaylists)

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    useEffect(()=> {
        if (!isLoggedIn) {
            router.push('/home')
        }
    }, [isLoggedIn])

    const width = 1210
    const height = 170

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let oldToNew = userPlaylists;
        oldToNew.push({
            id: userPlaylists.length,
            name: name,
            picture: pictureSrc
        })
        setUserPlaylists(oldToNew)
    }

    return (
        <div className={styles.main_body}>
            <dialog ref={ref} className={styles.d_body}>
                <section className={styles.modal_button}>
                    <button onClick={() => setIsOpened(false)}> X </button>
                </section>
                <h1> Add Playlist </h1>
                <section className={styles.playlist_form}>
                    <form onSubmit={handleSubmit}>
                        <h2 className={styles.headers}>Playlist Name</h2>
                        <input value={name} onChange={(e) => setName(e.target.value)} className={styles.text_fields} required />
                        <h2 className={styles.headers}>Playlist Photo (URL)</h2>
                        <input value={pictureSrc} onChange={(e) => setPictureSrc(e.target.value)} className={styles.text_fields} required />
                        <button type='submit'> Submit</button>
                    </form>
                </section>
            </dialog>
            <TopBar isLoggedIn={true} title={"YOUR PLAYLISTS"} changeLogStatus={setIsLoggedIn}/>
            <hr></hr>
            <section className={styles.body}>
                <ul className={styles.music_tabs}>
                    <li className={styles.add_playlist} onClick={() => setIsOpened(true)}>
                        <p> Add Playlist </p>
                    </li>
                    {userPlaylists.length > 0 ? (
                        userPlaylists.map((playlist:Playlist) => (
                            <li className={styles.card_holder} key={playlist.id} onClick={() => router.push('playlist-page')}>
                                <Image
                                    src={playlist.picture}
                                    height={height}
                                    width={width}
                                    alt="Study Music button"
                                    className={styles.card}
                                />
                                <p className={styles.text_in_image}> {playlist.name} </p>
                            </li>
                        ))
                    ) : (
                        <p> No Playlists fo und... </p>
                    )} 
                </ul>
            </section>
        </div>
    );
};
