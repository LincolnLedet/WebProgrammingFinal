'use client';
import React, { useState } from 'react';
import styles from './register.module.css';
import { useRouter } from 'next/navigation'
import TopBar from '../components/TopBar';

//interface for sending form data
interface FormState {
  name: string
  email: string
  password: string
}

const Register = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });


  const [loading, setLoading] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    console.log('Registering user:', form);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        // server returned 4xx/5xx
      } else {
        // success: redirect to NextAuth signin page
        router.push('/home')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }



  };

  return (
    <div className={styles.main_body}>
      <TopBar
        isLoggedIn={isLoggedIn}
        title="DAWGIFY"
        changeLogStatus={setIsLoggedIn}

      />
      <hr></hr>
      <div className={styles.registerContainer}>
        <h1 className={styles.title}> Create Account </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label className={styles.label}>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className={styles.input}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className={styles.input}
            required
          />

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
