import axios from "axios";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "../../public/nueno-logo-black.svg";
import styles from "../../styles/Auth.module.css";

// User Props
interface UserProps {
  name: string;
  email: string;
  password: string;
  isSubmitting: boolean;
}

export default function Signup() {
  // User state
  const [user, setUser] = useState<UserProps>({
    name: "",
    email: "",
    password: "",
    isSubmitting: false,
  });

  // pulling out from user state
  const { name, email, password, isSubmitting } = user;

  // onChange event: setting the typed char to the input
  const onChange = (e: { target: { name: string; value: string | boolean } }) =>
    setUser({ ...user, [e.target.name]: e.target.value });

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

    // Set isSubmitting to true
    setUser({ ...user, isSubmitting: true });

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
        // Set isSubmitting to false
        setUser({ ...user, isSubmitting: false });
        const errorMessage = e.response?.data?.message;
        alert(errorMessage || e.message);
      });
  }

  return (
    <div className="flex flex-row-reverse items-center justify-center min-h-screen">
      <div
        className={`items-center justify-center hidden w-full h-screen lg:flex lg:w-1/2 ${styles.authStyles}`}>
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="w-full my-5 text-4xl font-bold text-center md:w-4/4 lg:text-right lg:w-1/2 lg:text-6xl">
            Hiring platform for engineering leaders
          </h1>
          <p className="w-1/2 text-3xl italic text-right lg:text-3xl">
            Own your pipeline, identify hidden talent and build your A-team.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-screen mx-10 lg:w-1/2">
        <form className="w-full mx-10 mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Image src={Logo} className="w-auto h-12 mx-auto" width={60} height={60} />
            <h2 className="mt-6 text-xl font-bold text-center text-gray-900 md:text-2xl">Sign up!</h2>
          </div>
          <div className="m-auto -space-y-px rounded-md shadow-sm md:w-1/2 lg:w-full xl:w-1/2">
            <div>
              <label htmlFor="email-address" className="capitalize sr-only">
                Full Name
              </label>
              <input
                name="name"
                type="name"
                autoComplete="name"
                value={name}
                onChange={onChange}
                placeholder="John Doe"
                required
                className="relative block w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 capitalize border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="capitalize sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
                placeholder="john@doe.com"
                required
                className="relative block w-full h-12 px-3 py-2 mt-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="capitalize sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
                className="relative block w-full h-12 px-3 py-2 my-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <div className="m-auto md:w-1/2 lg:w-full xl:w-1/2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative flex justify-center w-full h-12 px-4 py-2 pt-3 text-sm font-medium text-white align-middle bg-indigo-600 border border-transparent rounded-md cursor-pointer group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting && "cursor-progress"
              }`}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </form>
        <div className="w-full px-1 py-5 text-left lg:w-full xl:w-1/2 md:w-1/2">
          <p>
            Already a user?{" "}
            <span className="text-indigo-800">
              {" "}
              <Link href="/auth/login">Sign in </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
