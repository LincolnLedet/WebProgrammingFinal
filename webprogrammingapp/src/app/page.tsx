'use client'
import Image from "next/image";

import styles from "./page.module.css";
import SplashPage from "./splash/SplashPage"

import { useState } from 'react';



export default function Home() {
  return (
    <div>
      <SplashPage/>
    </div>
  )
  /*(
    <div className={styles.page}>
      <main className={styles.main}>
        <p> This button pings the mongo db database. If it is not working for you please make sure you have ur .env.local file set up. Look at the discord</p>
        <button onClick ={pingDB}> Ping</button>
        <p>{msg}</p>

        <ol>
          <li>
            Hey, Welcome the the CS project <code>src/app/page.tsx</code>.
          </li>
          <li>What is cranking my slimes</li>
        </ol>


      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );*/
}
