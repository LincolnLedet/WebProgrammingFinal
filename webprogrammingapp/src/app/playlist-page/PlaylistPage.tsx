'use client'
import React, { useState, useEffect } from 'react';
import styles from './playlistPage.module.css'
import TopBar from '../components/TopBar'
import Image, { StaticImageData } from 'next/image';
import temp from '../images/tempG.png'
import { useRouter } from 'next/navigation'
import albumcover from '../images/albumcover.png'
import spotify from '../images/SpotifyConnect.png'

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

    useEffect(() => {
        //fetch for playlist songs
    }, [])

    const user = "Me"

    const defaultPlaylistSongs = []
    for (let i = 0; i < 7; i++) {
        let song = {
            id: i,
            name:"Song " + i,
            album: "Ur Mom",
            artist: "Me",
            albumPicture: temp,
        }
        defaultPlaylistSongs.push(song)
    }
    const [playlistSongs, setPlaylistSongs] = useState(defaultPlaylistSongs)

    const [searchResults, setSearchResults] = useState(defaultPlaylistSongs)

    const [query, setQuery] = useState('')

    const addSong = (song:Song) => {
        setPlaylistSongs([...playlistSongs, song])
    }

    const removeSong = (song:Song) => {
        // Remove song fetch, replace below with setting playlistSongs to return of the remove method
        let tempSongs = []
        for (let i = 0; i < playlistSongs.length; i++) {
            if (song.id != playlistSongs[i].id) {
                tempSongs.push(playlistSongs[i])
            }
        }
        setPlaylistSongs(tempSongs)
    }

    const sendQuery = () => {
        // fetch for matching songs
        setQuery('')
    }

    return (
        <div className={styles.main_body}>
            <TopBar isLoggedIn={true} title={"DAWGIFY"} changeLogStatus={setIsLoggedIn}/>
            <hr></hr>
            <section className={styles.body}>
                <div className={styles.left_half}> 
                    <div className={styles.spotify_connect}>
                        <p className={styles.spotify_text}>Press to connect to Spotify</p>
                        <button className={styles.spotify_button}>
                            <Image
                                src={spotify}
                                alt="Connect to Spotify"
                                width={300}
                                height={100}
                            />
                        </button>
                    </div>
                    <div className={styles.searchbar}>
                        <input type='text' value={query} onChange={(e) => setQuery(e.target.value)}></input>
                        <button onClick={sendQuery}> Search </button>
                    </div>
                    <div className={styles.results}>
                        {searchResults.length > 0 ? (
                            searchResults.map((song:Song) => (
                                <section className={styles.result_card} key={song.id} onClick={() => addSong(song)}>
                                    <Image
                                        src={song.albumPicture}
                                        alt={song.name + " button"}
                                        className={styles.result_image}
                                    />
                                    <div className={styles.card_text}>
                                        <p> Artist: {song.artist} </p>
                                        <p> Album: {song.album} </p>
                                        <p> Song: {song.name} </p>
                                    </div>
                                </section>
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
                                src={albumcover}
                                alt={"Playlist picture"}
                                id={styles.playlist_image}
                            />
                            <div>
                                <h1> Songs To Get Silly To </h1>
                                <h2> By {user} </h2>
                            </div>
                        </div>
                        <hr id={styles.hr}></hr>
                        <div className={styles.song_section}>
                            {playlistSongs.length > 0 ? (
                                playlistSongs.map((song:Song) => (
                                    <section className={styles.playlist_song} key={song.id}>
                                        <Image
                                            src={song.albumPicture}
                                            alt={song.name + " button"}
                                            className={styles.song_image}
                                        />
                                        <div className={styles.song_component}>
                                            <p> Song: {song.name} | Artist: {song.artist} </p>
                                        </div>
                                        <button onClick={() => removeSong(song)}> Delete </button>
                                    </section>
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
