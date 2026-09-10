"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import "./admin.css";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="adminLoginPage">
      <div className="adminLoginCard">

        <div className="adminLogo">
          EDHF
        </div>

        <p className="adminEyebrow">
          ADMINISTRATOR
        </p>

        <h1>
          Welcome Back
        </h1>

        <p className="adminSubtitle">
          Sign in to manage your blog and upcoming events.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="adminField">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>

          <div className="adminField">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="adminError">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="adminLoginButton"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </div>
    </main>
  );
}