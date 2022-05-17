import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { getSession } from "@helpers/auth";

import ImageComponent from "../../components/Image";
import Logo from "../../public/nueno-logo-black.svg";
import styles from "../../styles/Auth.module.css";

interface ServerSideProps {
  csrfToken: string;
}

// User Props
interface UserProps {
  email: string;
  password: string;
  isSubmitting: boolean;
}
export default function Login({ csrfToken }: ServerSideProps) {
  const router = useRouter();

  // User state
  const [user, setUser] = useState<UserProps>({
    email: "",
    password: "",
    isSubmitting: false,
  });

  // pulling out from user state
  const { email, password, isSubmitting } = user;

  // onChange event: setting the typed char to the input
  const onChange = (e: { target: { name: string; value: string | boolean } }) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/jobs";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    // Set isSubmitting to true
    setUser({ ...user, isSubmitting: true });

    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    if (!response) {
      throw new Error("Received empty response from next auth");
    }

    if (!response.error) {
      // we're logged in! let's do a hard refresh to the desired url
      window.location.replace(callbackUrl);
      return;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`items-center justify-center hidden w-full h-screen lg:flex lg:w-1/2 ${styles.signinSideBar}`}>
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="w-full my-5 text-4xl font-bold text-center md:w-4/4 lg:text-left lg:w-1/2 lg:text-6xl">
            Hiring platform for engineering leaders
          </h1>
          <p className="w-1/2 text-3xl italic lg:text-3xl">
            Own your pipeline, identify hidden talent and build your A-team.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-screen mx-10 lg:w-1/2">
        <form className="w-full mx-10 mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <ImageComponent src={Logo} width={60} height={60} />
            <h2 className="mt-6 text-xl font-bold text-center text-gray-900 md:text-2xl">
              Welcome back! Sign in
            </h2>
          </div>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} hidden />
          <div className="m-auto -space-y-px rounded-md shadow-sm md:w-1/2 lg:w-full xl:w-1/2">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={onChange}
                className="relative block w-full h-12 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="john@doe.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={onChange}
                className="relative block w-full h-12 px-3 py-2 my-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
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
              Sign in
            </button>
          </div>
        </form>
        <div className="w-full px-1 py-5 text-right lg:w-full xl:w-1/2 md:w-1/2">
          <p>
            New user?{" "}
            <span className="text-indigo-800">
              {" "}
              <Link href="/auth/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
