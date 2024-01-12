import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Topnav = ({ signIn }: { signIn: () => Promise<any> }) => {
  return (
    <div className="sticky top-0 flex w-full bg-white shadow-lg">
      <div className="flex items-center gap-2 px-4 py-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <span className="text-brand-dark text-2xl font-bold">TaskGenie</span>
      </div>
      <nav className="ml-auto">
        <Button
          onClick={signIn}
          className="bg-brand-light hover:bg-brand-dark h-full rounded-none px-6 text-lg font-semibold"
        >
          Login
        </Button>
      </nav>
    </div>
  );
};

export default Topnav;
