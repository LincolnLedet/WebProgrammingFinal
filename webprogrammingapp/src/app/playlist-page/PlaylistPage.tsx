'use client'
import React, { useState, useEffect } from 'react';
import styles from './playlistPage.module.css'
import TopBar from '../components/TopBar'
import Image, { StaticImageData } from 'next/image';
import temp from '../images/tempG.png'
import { useRouter } from 'next/navigation'

interface Song {
    id: number,
    name:string,
    album:string,
    artist:string,
    albumPicture:StaticImageData,
}

export default function PlaylistPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    useEffect(()=> {
        if (!isLoggedIn) {
            router.push('/home')
        }
    }, [isLoggedIn])

    const user = "Me"

    const defaultPlaylistSongs = []
    for (let i = 0; i < 3; i++) {
        let song = {
            id: i,
            name:"Song " + i,
            album: "Ur Mom",
            artist: "Me",
            albumPicture: temp
        }
        defaultPlaylistSongs.push(song)
    }
    const [playlistSongs, setPlaylistSongs] = useState(defaultPlaylistSongs)

    const [searchResults, setSearchResults] = useState(defaultPlaylistSongs)

    const width = 510
    const height = 170

    return (
        <div className={styles.main_body}>
            <TopBar isLoggedIn={true} title={"DAWGIFY"} changeLogStatus={setIsLoggedIn}/>
            <hr></hr>
            <section className={styles.body}>
                <div className={styles.left_half}> 
                    <div className={styles.spotify_connect}>
                        <p> Press to connect Spotify Account </p>
                        <button> Spotify </button>
                    </div>
                    <div className={styles.searchbar}>
                        <button></button> {/** Put search icon here */}
                        <input type='text'></input>
                    </div>
                    <div className={styles.results}>
                        {searchResults.length > 0 ? (
                            searchResults.map((song:Song) => (
                                <div className={styles.card_holder} key={song.id}>
                                    <Image
                                        src={song.albumPicture}
                                        height={60}
                                        width={60}
                                        alt={song.name + " button"}
                                    />
                                    <p> {song.name} </p>
                                </div>
                            ))
                        ) : (
                            <p> No Songs found... </p>
                        )}
                    </div>
                </div>
                <div className={styles.right_half}> 
                    <div className={styles.playlist_card}>
                        <div className={styles.title_section}>
                            <Image
                                src={temp}
                                height={180}
                                width={180}
                                alt={"Playlist picture"}
                                id={styles.playlist_picture}
                            />
                            <div>
                                <h1> Songs To Get Silly To </h1>
                                <h2> By {user} </h2>
                            </div>
                        </div>
                        <hr></hr>
                        <div className={styles.song_section}>
                            {playlistSongs.length > 0 ? (
                                playlistSongs.map((song:Song) => (
                                    <div className={styles.song_component} key={song.id}>
                                        <div className={styles.song}>
                                            <Image
                                                src={song.albumPicture}
                                                height={70}
                                                width={200}
                                                alt={song.name + " button"}
                                                className={styles.song_picture}
                                            />
                                            <p> Song: {song.name} | Artist: {song.artist} </p>
                                        </div>
                                        <button> Delete </button>
                                    </div>
                                ))
                            ) : (
                                <p> No Songs found... </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
