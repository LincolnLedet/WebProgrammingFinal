'use client'

import { useParams } from 'next/navigation'
import styles from './PlaylistGenrePage.module.css';
import TopBar from '../../components/TopBar'
import React, { useState } from 'react';




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
    const title = categoryTitles[category] || 'Unknown Playlist';
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        
        <div  className={styles.genrePage}>
                <TopBar isLoggedIn={isLoggedIn} title={"DAWGIFY"} changeLogStatus={setIsLoggedIn}/>
                <hr></hr>
            <div  className={styles.genrePageContainer}>
                <h1 className={styles.title}>{title}</h1>
                <p> hey</p>
            </div>

        </div>
    )
}
