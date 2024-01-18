import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import Image from "next/image";
import React, { ReactElement } from "react";
import UserHeader from "~/components/common/UserHeader";
import UserNotLoggedIn from "~/components/common/UserNotLoggedIn";
import Layout from "~/components/layout/Layout";
import Timeline from "~/components/timeline/Timeline";
import { getServerAuthSession } from "~/server/auth";

const TimelinePage = ({ user }: { user: Session["user"] }) => {
  const isLoggedIn = Boolean(user);
  return (
    <div>
      <div className="p-4">
        <UserHeader title={"Timeline"} />
        <div className="mx-auto my-4 md:my-8 md:max-w-3xl">
          <Image
            src="/timeline/timeline.svg"
            alt="profile-page-image"
            width={531}
            height={108}
            className="mx-auto h-auto w-full max-w-sm"
          />
        </div>
        <div className="my-4">
          {isLoggedIn ? <Timeline user={user} /> : <UserNotLoggedIn />}
        </div>
      </div>
    </div>
  );
};

TimelinePage.getLayout = function getLayout(page: ReactElement) {
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

export default TimelinePage;
