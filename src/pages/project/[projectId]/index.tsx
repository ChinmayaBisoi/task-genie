import { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import Image from "next/image";
import { type ReactElement } from "react";
import ProjectDetails from "~/components/Projects/ProjectDetails";
import UserNotLoggedIn from "~/components/common/UserNotLoggedIn";
import Layout from "~/components/layout/Layout";
import { getServerAuthSession } from "~/server/auth";

const ProjectPage = ({ user }: { user: Session["user"] }) => {
  const isLoggedIn = Boolean(user);

  return (
    <div className="p-4">
      <div className="my-4 ">
        {isLoggedIn ? (
          <ProjectDetails isLoggedIn={isLoggedIn} />
        ) : (
          <div className="mx-auto md:max-w-3xl">
            <Image
              src="/team/colab.svg"
              alt="profile-page-image"
              width={531}
              height={108}
              className="mx-auto h-auto w-full max-w-sm"
            />
            <UserNotLoggedIn />
          </div>
        )}
      </div>
    </div>
  );
};

ProjectPage.getLayout = function getLayout(page: ReactElement) {
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

export default ProjectPage;
