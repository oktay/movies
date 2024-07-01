import "@/styles/globals.css";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GeistSans } from "geist/font/sans";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HolyLoader from "holy-loader";
import { siteConfig, themeColor } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <HolyLoader color={themeColor[500]} showSpinner />
        <div>
          <header className="bg-[#111]/80 border-t backdrop-blur-xl border-zinc-800 lg:border-r fixed bottom-0 lg:top-0 left-0 z-10 h-16 w-full lg:h-full lg:w-20">
            <Navbar />
          </header>
          <div className="overflow-hidden pb-16 lg:pl-20 lg:pb-0 min-h-screen flex flex-col">
            <div className="flex-1 h-full">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
      <GoogleAnalytics gaId={process.env.GA_ID!} />
    </html>
  );
}
