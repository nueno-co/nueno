import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import Logo from "../../public/nueno-logo-black.svg";

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
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col">
          <Image src={Logo} className="w-auto h-12 mx-auto" width={60} height={60} />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Create Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="name"
            required
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            required
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative flex justify-center w-full px-4 py-2 mt-5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
