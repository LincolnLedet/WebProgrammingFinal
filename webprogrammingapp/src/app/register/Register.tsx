'use client'
import React, { useState, useEffect } from 'react';
import styles from './register.module.css';
import TopBar from '../components/TopBar'



const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Registering user:', form);
      
    };
  
    return (
      <div className={styles.registerContainer}>
        <h1 className={styles.title}>DAWGIFY</h1>
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
  
          <button type="submit" className={styles.button}>Register</button>
        </form>
      </div>
    );
  };
  
  export default Register;