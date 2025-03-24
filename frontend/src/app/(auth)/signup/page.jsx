"use client";
import Link from "next/link";
import axios from "axios";
import "./style.css";
import { useState } from "react";
import { cache } from "react";

export default function singup() {
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data.error);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up to use the Diamond Prediction tool</p>
          </div>

          <form onSubmit={handleSubmission}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            </div>

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
                placeholder="Create a password"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-buttons"
              onClick={() => {}}
            >
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link href="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
