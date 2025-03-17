"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [receivedData, setReceivedData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage("Request has been sent successfully!");
        setReceivedData(data);
      } else {
        setMessage("Failed to send request.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while sending the request.");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Sign in</h1>
        <form onSubmit={handleSubmit} method="POST" className={styles.form}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        {message && <p>{message}</p>}
        {receivedData && (
          <div>
            <p>Username: {receivedData.username}</p>
            <p>Password: {receivedData.password}</p>
          </div>
        )}
        <Link href="/singup">
          <button type="button" className={styles.signupButton}>
            Sign up
          </button>
        </Link>
      </main>
    </div>
  );
}
