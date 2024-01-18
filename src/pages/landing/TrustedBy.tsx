import Image from "next/image";
import React from "react";

const TrustedBy = () => {
  return (
    <div className="my-16 grid grid-cols-12 px-4 md:my-16 md:px-0">
      <div className="col-span-full flex flex-col items-center gap-4 md:col-span-8 md:col-start-3">
        <h3 className="text-center text-xl text-brand-dark">
          Join over 2,000,000 teams worldwide that are using TaskGenie to get
          more done.
        </h3>
        <Image
          alt="trusted by image"
          width={960}
          height={80}
          src="/homepage/trustedby.svg"
        />
      </div>
    </div>
  );
};

export default TrustedBy;
