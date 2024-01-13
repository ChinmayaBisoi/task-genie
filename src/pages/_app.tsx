import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>TaskGenie</title>
        <meta
          name="description"
          content="TaskGenie | Project Management and Colaboration Tool"
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className={`${inter.variable} min-h-screen`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
