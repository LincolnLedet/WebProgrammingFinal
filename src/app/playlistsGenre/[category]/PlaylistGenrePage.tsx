'use client'

import { useParams, useRouter } from 'next/navigation';
import styles from './PlaylistGenrePage.module.css';
import TopBar from '../../components/TopBar';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import PlaylistCard from '@/app/components/PlaylistCard';

const categoryTitles: Record<string, string> = {
    workout: 'Workout music',
    study: 'Study Music',
    game: 'Game Day tunes',
    club: 'Club Music',
    walking: 'Walking music',
    all: 'All playlists'
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
              <PlaylistCard index={index} playlist={pl} isButton={false} clickHandle={() => null} key={pl._id}></PlaylistCard>
            ))}
        </div>
      </div>

    </div>
  )
}
