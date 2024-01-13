import React from "react";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import Shimmer from "../common/Shimmer";

const AVATAR_SIZE_CSS = "h-16 w-16";

const DashboardLoading = () => {
  return (
    <>
      <Shimmer className={`${AVATAR_SIZE_CSS} `} />
      <Shimmer className="h-10 w-full md:w-1/2" />
    </>
  );
};

const DashboardHeader = () => {
  const { data, status } = useSession();
  const loading = status === "loading";
  const user = data?.user;
  const userImg = user?.image;
  const userName = user?.name;
  const userExists = user && userImg && userName;

  if (!loading && !userExists) return null;
  return (
    <div className="flex items-center gap-4 border-b border-neutral-200 py-4">
      {loading && <DashboardLoading />}
      {userExists && (
        <>
          <Avatar
            img={userImg}
            name={userName}
            className={`${AVATAR_SIZE_CSS} rounded-lg text-2xl`}
          />
          <h1 className="text-xl font-medium capitalize text-brand-dark">
            {userName}&apos;s Dashboard
          </h1>
        </>
      )}
    </div>
  );
};

export default DashboardHeader;
