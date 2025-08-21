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
import { collectChartDataServer } from "@/lib/utils";

export default async function Home() {
  const session = await getServerSession(authOptions);

  let chartData = null;
  if (session && ARTIST_CONFIG.TITLE) {
    chartData = await collectChartDataServer(ARTIST_CONFIG.TITLE);
  }

  return (
    <>
      <Header title={SITE_CONFIG.NAME} />
      <main className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col space-y-8">
            {session && (
              <>
                <TweetComposer chartData={chartData} />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
                  <div className="md:col-span-4">
                    <YouTubeChart session={session} chartData={chartData} />
                  </div>
                  <div className="md:col-span-8">
                    <MelonChart session={session} chartData={chartData} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
                  <GenieChart session={session} chartData={chartData} />
                  <FloChart session={session} chartData={chartData} />
                  <BugsChart session={session} chartData={chartData} />
                </div>
              </>
            )}
            <TwitterLogin />
          </div>
        </div>
      </main>
    </>
  );
}
