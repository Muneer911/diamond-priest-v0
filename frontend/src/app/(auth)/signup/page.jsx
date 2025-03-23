"use client";
import Link from "next/link";
import "./style.css";
export default function singup() {
  return (
    <main>
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up to use the Diamond Prediction tool</p>
          </div>

          <form>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Create a password"
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
