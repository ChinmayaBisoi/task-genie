import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

const Seciton1 = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="grid grid-cols-12 bg-gradient-to-r from-brand-light to-brand-light/30 px-4 py-16 md:px-0 md:py-20">
      <div className="col-span-full md:col-span-10 md:col-start-2">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="text-gray-100">
            <h1 className="text-4xl font-medium md:text-5xl">
              TaskGenie brings all your tasks, teammates, and tools together
            </h1>
            <h2 className="mt-8 text-xl">
              Keep everything in the same place—even if your team isn't.
            </h2>
            <div className="my-4 md:mx-auto">
              {sessionData && (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-brand-dark">
                    Go to dashboard
                  </Button>{" "}
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Task management app image"
              width={2000}
              height={2000}
              src="/homepage/homepage-main.svg"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seciton1;
