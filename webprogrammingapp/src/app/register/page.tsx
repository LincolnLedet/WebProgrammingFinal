'use client';

import React, { useState } from 'react';
import Register from './Register';
import TopBar from '../components/TopBar'; 

export default function RegisterPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <TopBar
        isLoggedIn={isLoggedIn}
        title="DAWGIFY"
        changeLogStatus={setIsLoggedIn}
      />
      <Register />
    </>
  );
}
