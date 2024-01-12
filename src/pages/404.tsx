import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center pb-10">
      <Link href="/" className="absolute left-5 top-5 flex items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <span className="text-3xl font-semibold text-brand-dark">Mello</span>
      </Link>
      <Link href="/" className="absolute right-5 top-5">
        <Button variant="ghost">
          <ChevronLeft className="mr-2" /> Back to Homepage
        </Button>
      </Link>

      <h2 className="text-5xl font-semibold">404</h2>

      <h1 className="font-bold">Page not found</h1>
    </div>
  );
};

export default PageNotFound;
