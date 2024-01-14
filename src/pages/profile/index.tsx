import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import Image from "next/image";
import ManageProfile from "~/components/Profile/ManageProfile";
import UserHeader from "~/components/common/UserHeader";
import Topnav from "~/components/topnav/Topnav";
import { getServerAuthSession } from "~/server/auth";

const ProfilePage = ({ user }: { user: Session["user"] }) => {
  const isLoggedIn = Boolean(user);
  return (
    <div>
      <Topnav />
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
            {isLoggedIn ? (
              <ManageProfile user={user} />
            ) : (
              <div className="my-8 flex flex-col items-center font-medium">
                <h4 className="text-3xl">Oops !</h4>
                <h5 className="text-brand-dark">
                  Please login to view this page.
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

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
