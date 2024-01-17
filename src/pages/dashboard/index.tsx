import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import React from "react";
import type { ReactElement } from "react";
import Dashboard from "~/components/Dashboard/Dashboard";
import UserNotLoggedIn from "~/components/common/UserNotLoggedIn";
import Layout from "~/components/layout/Layout";
import { getServerAuthSession } from "~/server/auth";

const DashboardPage = ({ user }: { user: Session["user"] }) => {
  const isLoggedIn = Boolean(user);

  if (!isLoggedIn) return <UserNotLoggedIn />;
  return (
    <div>
      <Dashboard />
    </div>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps({
  req,
  res,
}: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession({
    req,
    res,
  });
  return {
    props: { user: session?.user ?? null }, // Will be passed to the page component as props
  };
}

export default DashboardPage;
