import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const { login, accessToken, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;

  if (accessToken) {
    return (
      <main>
        <h1>You are already logged in</h1>
        <Link to={"/"}>
          <button>Return home</button>
        </Link>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await login(email, password);

    if (error) {
      setError(error);
    }
    if (!error) {
      navigate("/");
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">{isLoading ? "Logging in..." : "Login"}</button>
      </form>
    </main>
  );
}
