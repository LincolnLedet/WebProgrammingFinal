'use client'

import { useParams, useRouter } from 'next/navigation';
import styles from './PlaylistGenrePage.module.css';
import TopBar from '../../components/TopBar';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link';

const categoryTitles: Record<string, string> = {
    workout: 'Workout music',
    study: 'Study Music',
    game: 'Game Day tunes',
    club: 'Club Music',
    walking: 'Walking music'
};

interface Playlist {
  _id: number
  name: string
  userName: string
  picture: string
  genre: string
}

export default function PlaylistCategoryPage() { //uses router and [category] dir name to dynimcal make pages based on list. 

  const router = useRouter()

    const params = useParams();
    const category = params.category as string;
    const title = categoryTitles[category] || 'Unknown Playlist';
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [playlists, setPlaylists] = useState<Playlist[]>([])


    // Fetch user playlists
    useEffect(() => {
      fetch(`/api/playlists/genres?genre=${category}`)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText)
          return res.json()
        })
        .then((data: Playlist[]) => setPlaylists(data.slice(0, 10)))
        .catch((err) => console.error("❌ fetch playlists:", err))
    }, [])
    

    return (
    <div className={styles.genrePage}>
      <TopBar title={"DAWGIFY"} changeLogStatus={setIsLoggedIn} />
      <hr></hr>
      <div className={styles.genrePageContainer}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.cardContainer}>
            {playlists.map((pl, index) => (
              <li
                key={index}
                className={styles.card_holder}
                onClick={() =>
                  router.push(`/playlist-page?name=${encodeURIComponent(pl.name)}&image=${encodeURIComponent(pl.picture)}&userName=${encodeURIComponent(pl.userName)}&genre=${encodeURIComponent(pl.genre)}`)
                }
              >
                <Image
                  src={pl.picture}
                  width={1210}
                  height={170}
                  alt={pl.name}
                  className={styles.card}
                />
                <p className={styles.text_in_image}>{pl.name}</p>
              </li>
            ))}
        </div>
      </div>

    </div>
  )
}
