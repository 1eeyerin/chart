import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TwitterLogin from "@/components/TwitterLogin";
import TweetComposer from "@/components/TweetComposer";
import Header from "@/components/Header";
import {
  BugsChart,
  FloChart,
  GenieChart,
  MelonChart,
} from "@/components/chart";
import YouTubeChart from "@/components/chart/YouTubeChart";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header title={process.env.NEXT_PUBLIC_SITE_NAME} />
      <main className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-8">
            {session && (
              <>
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-4">
                    <YouTubeChart session={session} />
                  </div>
                  <div className="col-span-8">
                    <MelonChart session={session} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <GenieChart session={session} />
                  <FloChart />
                  <BugsChart session={session} />
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
