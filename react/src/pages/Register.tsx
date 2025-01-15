import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string>();
  const { register } = useAuth();

  const clearState = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await register({
      email,
      password,
      passwordConfirmation,
      name,
    });

    if (error) {
      setError(error);
      clearState();
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Create an account</h1>
        {error && <p>{error}</p>}
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </main>
  );
}
