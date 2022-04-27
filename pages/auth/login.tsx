import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { getSession } from "@helpers/auth";

interface ServerSideProps {
  csrfToken: string;
}

export default function Login({ csrfToken }: ServerSideProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/jobs";

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

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
    <div className="flex items-center justify-center w-screen h-screen bg-secondary">
      <div className="flex flex-col justify-center items-center min-h-[50vh] w-[50vw]">
        <span className="mt-5 text-2xl font-bold text-center">Login</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start px-10 pb-5 pt-10 items-start min-h-[38vh] w-[30vw]  rounded-sm border-secondary bg-white shadow-md">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} hidden />
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
            {"SIGN IN"}
          </button>
        </form>
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
