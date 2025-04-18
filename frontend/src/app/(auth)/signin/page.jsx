// client side
"use client";
import { useState } from "react";
import "./style.css";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

export default function Signin() {
  const [ErrorNotification, setErrorNotification] = useState("");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`,
        formData
      );
      console.log(response.data.message);

      Cookies.set("access_token", response.data?.access_token);
      window.location.href = "/dash";
    } catch (error) {
      setErrorNotification(error.response?.data.error);
      console.log(error.response?.data.error);
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
              {ErrorNotification && (
                <div className="auth-alert-container hidden">
                  <p className="auth-alert">{ErrorNotification}</p>
                </div>
              )}
            </form>

            <div className="auth-footer">
              <p>
                Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
