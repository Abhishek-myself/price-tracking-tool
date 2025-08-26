"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      // if (!session) {
      //   router.push("/login"); // Not logged in → go to signup
      // } else {
      //   router.push("/scraper"); // Logged in → go to scraper
      // }
      router.push("/scraper");
    }
  }, [session, status, router]);

  return <p className="text-center">Loading...</p>;
}
