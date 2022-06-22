import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import Logo from "../public/nueno-logo-black.svg";

export default function Index() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (session) window.location.replace("/jobs");
  }, [loading, session]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col">
          <Image src={Logo} className="w-auto h-12 mx-auto" width={60} height={60} />
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Nueno - Open Source ATS (Applicant Tracking System)
          </h2>
        </div>
        <div className="items-center justify-center pt-2">
          <Link href="/auth/login">
            <a className="relative flex justify-center w-full px-4 py-2 mt-5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              LOGIN
            </a>
          </Link>
          <Link href="/auth/signup">
            <a className="relative flex justify-center w-full px-4 py-2 mt-5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              SIGN UP
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
