import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import type { ReactElement } from "react";
import Image from "next/image";
import ManageProfile from "~/components/Profile/ManageProfile";
import UserHeader from "~/components/common/UserHeader";
import UserNotLoggedIn from "~/components/common/UserNotLoggedIn";
import Layout from "~/components/layout/Layout";
import { getServerAuthSession } from "~/server/auth";

const ProfilePage = ({ user }: { user: Session["user"] }) => {
  const isLoggedIn = Boolean(user);
  return (
    <div>
      <div className="p-4">
        <UserHeader title={"profile"} />
        <div className="mx-auto my-4 md:my-8 md:max-w-3xl">
          <Image
            src="/profile/profile.svg"
            alt="profile-page-image"
            width={531}
            height={108}
            className="mx-auto h-auto w-full"
          />
          <div className="my-4">
            {isLoggedIn ? <ManageProfile user={user} /> : <UserNotLoggedIn />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
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
