'use client'
import React, { useState, useEffect } from 'react';
import styles from './playlistPage.module.css'
import TopBar from '../components/TopBar'
import Image, { StaticImageData } from 'next/image';
import temp from '../images/tempG.png'
import { useRouter } from 'next/navigation'
import albumcover from '../images/albumcover.png'
import spotify from '../images/SpotifyConnect.png'
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

interface Song {
    id: number,
    name:string,
    album:string,
    artist:string,
    albumPicture: string;
}

export default function PlaylistPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const playlistName = searchParams.get('name') || 'My Playlist';
    const playlistImage = searchParams.get('image') || albumcover.src;
    const user = session?.user?.name || 'Me';

    const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]);
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    const [query, setQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    useEffect(()=> {
        if (!isLoggedIn) {
            router.push('/signin')
        }
    }, [session, router])

    const addSong = async (song: Song) => {
        const alreadyExists = playlistSongs.some((s) => s.id === song.id);
        if (!alreadyExists) {
          setPlaylistSongs((prev) => [...prev, song]);
      
          try {
            const res = await fetch('/api/playlist/addSong', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                playlistName: 'Songs To Get Silly To', // update this if using a dynamic playlist
                song,
              }),
            });
      
            if (!res.ok) {
              const text = await res.text();
              console.error('Failed to save song to playlist:', text);
            }
          } catch (err) {
            console.error('Error saving song to playlist:', err);
          }
        }
      };
      
      

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

    const sendQuery = async () => {
        if (!session?.accessToken || !query) return;
      
        console.log("Access Token:", session.accessToken); // Helpful for debugging
    
        try {
          const res = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=6`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
      
          const contentType = res.headers.get("content-type");
          if (!res.ok || !contentType?.includes("application/json")) {
            const errorText = await res.text();
            console.error("Spotify API Error:", errorText);
            setSearchResults([]);
            return;
          }
      
          const data = await res.json();
      
          if (!data.tracks || !data.tracks.items) {
            console.warn("No tracks returned from Spotify:", data);
            setSearchResults([]);
            return;
          }
      
          const uniqueTracks = new Map();
          data.tracks.items.forEach((item: any) => {
            uniqueTracks.set(item.id, item); 
            });

            const mappedSongs: Song[] = Array.from(uniqueTracks.values()).map((item, index) => ({
            id: item.id || index,
            name: item.name,
            album: item.album.name,
            artist: item.artists.map((a: any) => a.name).join(", "),
            albumPicture: item.album.images?.[0]?.url || temp.src,
            }));

    
        
          setSearchResults(mappedSongs);
        } catch (err) {
          console.error("Spotify Search Error:", err);
          setSearchResults([]);
        }
      
        setQuery('');
      };
      
      

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
                        <input 
                            type='text' 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search songs..."
                        />
                        <button onClick={sendQuery}> Search </button>
                    </div>
                    <div className={styles.results}>
                        {searchResults.length > 0 ? (
                            searchResults.map((song:Song) => (
                                <section 
                                    key={song.id} 
                                    className={styles.result_card} 
                                    onClick={async () => await addSong(song)}
                                >
                                    <Image
                                        src={song.albumPicture}
                                        alt={song.name + " button"}
                                        className={styles.result_image}
                                        width={100}
                                        height={100}
                                        unoptimized
                                    />
                                    <div className={styles.card_text}>
                                        <p><strong>Artist: {song.artist}</strong> </p>
                                        <p><strong>Album: {song.album}</strong></p>
                                        <p><strong> Song: {song.name} </strong></p>
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
                                src={playlistImage}
                                alt={"Playlist picture"}
                                id={styles.playlist_image}
                                width={120}
                                height={120}
                            />
                            <div>
                                <h1>{playlistName}</h1>
                                <h2>By {user}</h2>
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
                                            width={100}
                                            height={100}
                                            unoptimized
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
