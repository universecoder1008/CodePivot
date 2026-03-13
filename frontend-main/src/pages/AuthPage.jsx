import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";

export const AuthPage = () => {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const loginValid = loginEmail.includes("@") && loginPassword.length >= 6;
  const signupValid =
    signupEmail.includes("@") &&
    signupPassword.length >= 6 &&
    name.length > 1;

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
      })
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    console.error(err);
  }
};
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullname: name,
    email: signupEmail,
    password: signupPassword,
  }),
});

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">

      {/* Login Card */}
      <Card>
        <h2 className="mb-1 text-2xl font-black">Welcome back</h2>
        <p className="mb-6 text-sm text-slate-500">Login to continue.</p>

        <form className="space-y-4" onSubmit={handleLogin}>

          <input
            className="input"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <input
            className="input"
            placeholder="Password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          {!loginValid && loginEmail && loginPassword && (
            <p className="text-xs text-rose-500">
              Please enter valid credentials.
            </p>
          )}

          <Button className="w-full" type="submit" disabled={!loginValid}>
            Login
          </Button>

        </form>
      </Card>

      {/* Signup Card */}
      <Card>
        <h2 className="mb-1 text-2xl font-black">Create account</h2>
        <p className="mb-6 text-sm text-slate-500">Sign up to get started.</p>

        <form className="space-y-4" onSubmit={handleSignup}>

          <input
            className="input"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input"
            placeholder="Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />

          <input
            className="input"
            placeholder="Password"
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />

          {!signupValid && name && signupEmail && signupPassword && (
            <p className="text-xs text-rose-500">
              Please enter valid credentials.
            </p>
          )}

          <Button className="w-full" type="submit" disabled={!signupValid}>
            Sign Up
          </Button>

        </form>
      </Card>

    </div>
  );
};