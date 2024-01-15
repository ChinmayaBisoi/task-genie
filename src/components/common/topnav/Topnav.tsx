import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Login from "../Login";
import { UserMenuDropdown } from "./UserMenuDropdown";

const Topnav = () => {
  const { data } = useSession();

  return (
    <div className="sticky top-0 flex w-full bg-white shadow-lg">
      <Link
        href={data ? "/dashboard" : "/"}
        className="mx-4 my-2 flex cursor-pointer items-center gap-2"
      >
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <span className="text-2xl font-bold text-brand-dark">TaskGenie</span>
      </Link>
      <nav className="ml-auto flex items-center">
        <Login />
        <UserMenuDropdown />
      </nav>
    </div>
  );
};

export default Topnav;
