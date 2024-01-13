import React from "react";
import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarWrapper,
} from "./ui/avatar";

const Avatar = ({
  img,
  name,
  className = "",
}: {
  img: string;
  name: string;
  className?: string;
}) => {
  name = name.slice(0, 2).toUpperCase();
  return (
    <AvatarWrapper className={`h-9 w-9 ${className}`}>
      <AvatarImage src={img} />
      <AvatarFallback className={className}>{name}</AvatarFallback>
    </AvatarWrapper>
  );
};

export default Avatar;
