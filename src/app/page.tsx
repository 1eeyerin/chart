import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  BugsChart,
  FloChart,
  GenieChart,
  MelonChart,
} from "@/components/chart";
import YouTubeChart from "@/components/chart/YouTubeChart";
import Header from "@/components/layout/Header";
import TweetComposer from "@/components/social/TweetComposer";
import TwitterLogin from "@/components/auth/TwitterLogin";
import { ARTIST_CONFIG, SITE_CONFIG } from "@/lib/constants";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header title={SITE_CONFIG.NAME} />
      <main className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col space-y-8">
            {session && (
              <>
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-4">
                    <YouTubeChart
                      videoId={ARTIST_CONFIG.YOUTUBE_ID}
                      session={session}
                    />
                  </div>
                  <div className="col-span-8">
                    <MelonChart title={ARTIST_CONFIG.TITLE} session={session} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <GenieChart title={ARTIST_CONFIG.TITLE} session={session} />
                  <FloChart title={ARTIST_CONFIG.TITLE} session={session} />
                  <BugsChart title={ARTIST_CONFIG.TITLE} session={session} />
                </div>
                <TweetComposer />
              </>
            )}
            <TwitterLogin />
          </div>
        </div>
      </main>
    </>
  );
}
