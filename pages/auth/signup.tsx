import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function redirectOnLogin() {
      const session = await getSession();
      if (session) window.location.replace("/");
    }
    redirectOnLogin();
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    return axios
      .post("/api/auth/signup", {
        name,
        email,
        password,
      })
      .then(() => {
        alert("success");
        window.location.replace("/");
      })
      .catch((e) => {
        setIsSubmitting(false);
        const errorMessage = e.response?.data?.message;
        alert(errorMessage || e.message);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="name"
        required
        value={name}
        onInput={(e) => setName(e.currentTarget.value)}
        className="block border border-neutral-300 focus:ring-neutral-900"
      />
      <input
        id="email"
        name="email"
        type="email"
        placeholder="email"
        required
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
        className="block border border-neutral-300 focus:ring-neutral-900"
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        autoComplete="current-password"
        required
        value={password}
        onInput={(e) => setPassword(e.currentTarget.value)}
        className="block border border-neutral-300 focus:ring-neutral-900"
      />

      <button type="submit" disabled={isSubmitting} className="p-1 text-white bg-blue-800">
        SIGN UP
      </button>
    </form>
  );
}
