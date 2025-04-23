'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './playlistCard.module.css'
import Image from 'next/image';

interface Playlist {
    _id: number
    name: string
    userName: string
    picture: string
    genre: string
  }


export default function PlaylistCard({index, playlist, isButton, clickHandle}: {index:number, playlist:Playlist, isButton:boolean, clickHandle:(param:any) => void}) {
    const router = useRouter()


    return (
    <div
        className={styles.card_holder}
        onClick={() =>
            router.push(`/playlist-page?name=${encodeURIComponent(playlist.name)}&image=${encodeURIComponent(playlist.picture)}&userName=${encodeURIComponent(playlist.userName)}&genre=${encodeURIComponent(playlist.genre)}`)
        }
        >
        <Image
            src={playlist.picture}
            width={1210}
            height={170}
            alt={playlist.name}
            className={styles.card}
        />
        <p className={styles.text_in_image}>{playlist.name}</p>
        {isButton ? (<button onClick={() => clickHandle(playlist)} className={styles.delete_button}> Delete </button>) : (<div/>)}
    </div>
    );
};