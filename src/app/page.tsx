"use client";

import { useSession } from "next-auth/react";
import TwitterLogin from "../components/TwitterLogin";
import TweetComposer from "../components/TweetComposer";
import Header from "../components/Header";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Header title={process.env.NEXT_PUBLIC_SITE_NAME} />
      <main className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {session ? (
            <div className="space-y-8">
              <TweetComposer />
              <div className="flex justify-center">
                <TwitterLogin />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <TwitterLogin />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
