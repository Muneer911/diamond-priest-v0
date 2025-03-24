// client side
"use client";
import { useState } from "react";
import "./style.css";
import Link from "next/link";
import axios from "axios";

export default function signin() {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/signin",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data.error);
    }
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className="auth-container">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access your dashboard</p>
            </div>

            <form action="" onSubmit={handleSubmission}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary auth-buttons">
                Sign In
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account? Sign Up{" "}
                <Link href="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
