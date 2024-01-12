import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

const PageNotFound = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center pb-10">
      <Link href="/" className="absolute left-5 top-5 flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <span className="text-3xl font-semibold text-brand-dark">Mello</span>
      </Link>
      <h2 className="text-5xl font-semibold">404</h2>
      <h1 className="font-bold">Page not found</h1>
      <Button className="bg-brand-light hover:bg-brand-dark">
        Back to Homepage
      </Button>
    </div>
  );
};

export default PageNotFound;
