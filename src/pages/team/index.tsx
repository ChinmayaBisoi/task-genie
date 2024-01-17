import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import Image from "next/image";
import React from "react";
import type { ReactElement } from "react";
import UserHeader from "~/components/common/UserHeader";
import UserNotLoggedIn from "~/components/common/UserNotLoggedIn";
import Layout from "~/components/layout/Layout";
import Team from "~/components/team/Team";
import { getServerAuthSession } from "~/server/auth";

const TeamsPage = ({ user }: { user: Session["user"] }) => {
  const isLoggedIn = Boolean(user);
  return (
    <div className="p-4">
      <UserHeader title={"Colaborations"} />
      <div className="mx-auto my-4 md:my-8 md:max-w-3xl">
        <Image
          src="/team/colab.svg"
          alt="profile-page-image"
          width={531}
          height={108}
          className="mx-auto h-auto w-full max-w-sm"
        />
        <div className="my-4">
          {isLoggedIn ? <Team /> : <UserNotLoggedIn />}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;

TeamsPage.getLayout = function getLayout(page: ReactElement) {
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
