import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Index() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (session) window.location.replace("/private");
  }, [loading, session]);

  return (
    <div className="pt-8">
      <Link href="/auth/login">
        <a className="p-1 text-white bg-blue-800">LOGIN</a>
      </Link>
      <Link href="/auth/signup">
        <a className="p-1 ml-2 text-white bg-blue-800">SIGN UP</a>
      </Link>
      <h1 className="py-4 text-3xl font-bold">Launch something bad quickly.</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/1hHMwLxN6EM"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
}
