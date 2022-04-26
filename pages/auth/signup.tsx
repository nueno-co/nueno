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
    <div className="flex items-center justify-center w-screen h-screen bg-secondary">
      <div className="flex flex-col justify-center items-center min-h-[50vh] w-[50vw]">
        <span className="mt-5 text-2xl font-bold text-center">Signup</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start px-10 pb-5 pt-10 items-start min-h-[38vh] w-[30vw]  rounded-sm border-secondary bg-white shadow-md">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="name"
            required
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            required
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
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
            className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className={`w-full items-center px-4 py-3 mt-5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm m hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            disabled={isSubmitting}>
            {"SIGN UP"}
          </button>
        </form>
      </div>
    </div>
  );
}
