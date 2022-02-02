import Link from "next/link";

import Shell from "@components/Shell";

export default function Manage() {
  return (
    <Shell>
      <div className="pt-8">
        <Link href="/api/auth/signout">
          {/* this is the default next-auth sign-out template. */}
          <a className="p-1 ml-2 text-white bg-blue-800">LOGOUT</a>
        </Link>
        <h1 className="py-4 text-3xl font-bold">You are signed in.</h1>
      </div>
    </Shell>
  );
}
