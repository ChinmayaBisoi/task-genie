import { ChevronLeft } from "lucide-react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactElement } from "react";
import ProjectSettings from "~/components/Projects/ProjectSettings";
import UserNotLoggedIn from "~/components/common/UserNotLoggedIn";
import Layout from "~/components/layout/Layout";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

const ProjectSettingsPage = ({ user }: { user: Session["user"] }) => {
  const isLoggedIn = Boolean(user);
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="p-4">
      <Link href={`/project/${projectId}`}>
        <Button variant={"secondary"} className="rounded-full pr-6">
          <ChevronLeft className="mr-2" /> Back to Project
        </Button>
      </Link>
      <div className="my-4 md:mx-4 md:max-w-3xl">
        {isLoggedIn ? (
          <ProjectSettings isLoggedIn={isLoggedIn} />
        ) : (
          <>
            <Image
              src="/team/colab.svg"
              alt="profile-page-image"
              width={531}
              height={108}
              className="mx-auto h-auto w-full max-w-sm"
            />
            <UserNotLoggedIn />
          </>
        )}
      </div>
    </div>
  );
};

ProjectSettingsPage.getLayout = function getLayout(page: ReactElement) {
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

export default ProjectSettingsPage;
