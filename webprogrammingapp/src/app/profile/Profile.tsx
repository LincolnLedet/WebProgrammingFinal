'use client'
import React, { useState } from 'react';
import styles from './profile.module.css'
import TopBar from '../components/TopBar'
import Image, { StaticImageData } from 'next/image';
import temp from '../images/tempG.png'

interface Playlist {
    id: number,
    name:string,
    picture:StaticImageData,
}

export default function Profile() {

    const defaultUserPlaylists = []
    for (let i = 0; i < 4; i++) {
        let playlist = {
            id: i,
            name:"Playlist " + i,
            picture: temp
        }
        defaultUserPlaylists.push(playlist)
    }
    const [userPlaylists, setUserPlaylists] = useState(defaultUserPlaylists)

    console.log(styles.main_body)
    const width = 510
    const height = 170

    return (
        <div className={styles.main_body}>
            <TopBar isLoggedIn={true} title={"YOUR PLAYLISTS"}/>
            <hr></hr>
            <section className={styles.body}>
                <div className={styles.music_tabs}> 
                    <div className={styles.addPlaylist}>
                        <p className={styles.text_in_image}> Add or Edit Playlists </p>
                    </div>
                    {userPlaylists.length > 0 ? (
                        userPlaylists.map((playlist:Playlist) => (
                            <div className={styles.card_holder} key={playlist.id}>
                                <Image
                                    src={playlist.picture}
                                    height={height}
                                    width={width}
                                    alt="Study Music button"
                                    className={styles.card}
                                />
                                <p className={styles.text_in_image}> {playlist.name} </p>
                            </div>
                        ))
                    ) : (
                        <p> No Playlists found... </p>
                    )}
                </div>
            </section>
        </div>
    );
};
