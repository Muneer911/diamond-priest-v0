// client side
"use client";
import "./style.css";
import Link from "next/link";

export default function signin() {
  return (
    <div>
      <main>
        <div className="container">
          <div className="auth-container">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access your dashboard</p>
            </div>

            <form action="">
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
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-buttons"
                onClick={() => {}}
              >
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
