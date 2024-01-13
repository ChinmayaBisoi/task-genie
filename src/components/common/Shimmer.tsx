import React from "react";

const Shimmer = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`animate-pulse rounded-lg bg-neutral-200 ${className}`} />
  );
};

export default Shimmer;
