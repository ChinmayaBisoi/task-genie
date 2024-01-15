import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps, type AppType } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Page } from "~/types/page";
import { Fragment } from "react";

type Props = AppProps & {
  Component: Page;
};

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: Props) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

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
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
