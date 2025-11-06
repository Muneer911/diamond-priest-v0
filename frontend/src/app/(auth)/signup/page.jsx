"use client";
import Link from "next/link";
import axios from "axios";
import "../../style.css";
import { useState } from "react";
import Loading from "../../components/Loading";

export default function Singup() {
  const [loading, setLoading] = useState(false);
  const [ErrorNotification, setErrorNotification] = useState({
    visible: false,
    title: "Error",
    message: "",
  });
  const [SuccessNotification, setSuccessNotification] = useState({
    visible: false,
    title: "Success",
    message: "",
  });
  // true => show successNotification, false => show errorNotification
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, SetFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const handleChange = (e) => {
    SetFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/signup`, formData);
      setSuccessNotification({
        visible: true,
        title: "Success",
        message: response.data?.message || "Account created",
      });
      setErrorNotification((s) => ({ ...s, visible: false }));
      setIsSuccess(true);
    } catch (error) {
      const msg =
        error.response?.data.error || error.message || "Signup failed";
      console.log(msg);
      setErrorNotification({
        visible: true,
        title: "Error",
        message: msg,
      });
      setSuccessNotification((s) => ({ ...s, visible: false }));
      setIsSuccess(false);
    }
    setLoading(false);
  };

  return (
    <main>
      <div className="container">
        <div className="auth-container">
          <div className="auth-loading">{loading && <Loading />} </div>
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up to use the Diamond Prediction tool</p>
          </div>

          <form onSubmit={handleSubmission}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="username"
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
            {isSuccess && SuccessNotification.visible ? (
              <div
                className="auth-alert-container"
                style={{ backgroundColor: "#09DF3B" }}
              >
                <p className="auth-alert">{SuccessNotification.message}</p>
              </div>
            ) : null}

            {!isSuccess && ErrorNotification.visible ? (
              <div
                className="auth-alert-container"
                style={{ backgroundColor: "red" }}
              >
                <p className="auth-alert">{ErrorNotification.message}</p>
              </div>
            ) : null}
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link href="/">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
