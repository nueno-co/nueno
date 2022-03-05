import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Index() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (session) window.location.replace("/jobs");
  }, [loading, session]);

  return (
    <div className="pt-8">
      <Link href="/auth/login">
        <a className="p-1 text-white bg-blue-800">LOGIN</a>
      </Link>
      <Link href="/auth/signup">
        <a className="p-1 ml-2 text-white bg-blue-800">SIGN UP</a>
      </Link>
    </div>
  );
}
