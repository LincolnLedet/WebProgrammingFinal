'use client'

import { useParams } from 'next/navigation';
import styles from './PlaylistGenrePage.module.css';
import TopBar from '../../components/TopBar';
import React, { useState } from 'react';
import Link from 'next/link';


const dummyPlaylists = [
  // Workout Playlists
  {
    title: 'Leg Day Hype',
    user: 'lincoln',
    image: '/images/legday.png',
    category: 'workout',
  },
  {
    title: 'Pump It Up',
    user: 'alex',
    image: '/images/pumpitup.png',
    category: 'workout',
  },
  {
    title: 'Gym Flow',
    user: 'riley',
    image: '/images/gymflow.png',
    category: 'workout',
  },

  // Study Playlists
  {
    title: 'LoFi Beats',
    user: 'emily',
    image: '/images/lofi.png',
    category: 'study',
  },
  {
    title: 'Coding Vibes',
    user: 'chris',
    image: '/images/codingvibes.png',
    category: 'study',
  },
  {
    title: 'Quiet Focus',
    user: 'sarah',
    image: '/images/focus.png',
    category: 'study',
  },

  // Game Day Playlists
  {
    title: 'UGA Gameday Bangers',
    user: 'dawgsfan420',
    image: '/images/gameday.png',
    category: 'game',
  },
  {
    title: 'Tailgate Anthems',
    user: 'matt',
    image: '/images/tailgate.png',
    category: 'game',
  },
  {
    title: 'Victory Vibes',
    user: 'hunter',
    image: '/images/victory.png',
    category: 'game',
  },

  // Club Playlists
  {
    title: 'Late Night Moves',
    user: 'zoe',
    image: '/images/latenight.png',
    category: 'club',
  },
  {
    title: 'House Party',
    user: 'tyler',
    image: '/images/houseparty.png',
    category: 'club',
  },
  {
    title: 'EDM Hits',
    user: 'lucas',
    image: '/images/edm.png',
    category: 'club',
  },

  // Walking Playlists
  {
    title: 'Walk It Off',
    user: 'james',
    image: '/images/walkitoff.png',
    category: 'walking',
  },
  {
    title: 'Stroll Sounds',
    user: 'ella',
    image: '/images/stroll.png',
    category: 'walking',
  },
  {
    title: 'City Walks',
    user: 'olivia',
    image: '/images/citywalks.png',
    category: 'walking',
  },
];



const categoryTitles: Record<string, string> = {
    workout: 'Workout music',
    study: 'Study Music',
    game: 'Game Day tunes',
    club: 'Club Music',
    walking: 'Walking music'
};

export default function PlaylistCategoryPage() {


    const params = useParams();
    const category = params.category as string;

    const filteredPlaylists = dummyPlaylists.filter(
        (playlist) => playlist.category == category
    );

    console.log(filteredPlaylists);
    const title = categoryTitles[category] || 'Unknown Playlist';
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (

        <div className={styles.genrePage}>
            <TopBar isLoggedIn={isLoggedIn} title={"DAWGIFY"} changeLogStatus={setIsLoggedIn} />
            <hr></hr>
            <div className={styles.genrePageContainer}>
            <h1 className={styles.title}>{title}</h1>
            <Link href = "/playlist-page">
                {filteredPlaylists.map((playlist, index) => (
                    <div key={index} className={styles.card}>
                        <img src={playlist.image} alt={playlist.title} className={styles.cardImage} />
                        <div className={styles.cardText}>
                            <h3 className={styles.cardTitle}>{playlist.title}</h3>
                            <p className={styles.cardUser}>By {playlist.user}</p>
                        </div>
                    </div>
                ))}
                </Link>
            </div>

        </div>
    )
}
