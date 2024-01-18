import React from "react";
import Avatar from "../Avatar";

const UserCard = ({
  user,
  avatarCss = "",
}: {
  user: any;
  avatarCss?: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      {user && user.image && user.name && (
        <div className="rounded-full shadow-lg shadow-brand-light/40">
          <Avatar
            img={user.image}
            name={user.name}
            className={`sm:h-12 sm:w-12 ${avatarCss}`}
          />
        </div>
      )}
      <div>
        <div>{user.name}</div>
        <div className="max-w-60 truncate text-sm">{user.email}</div>
      </div>
    </div>
  );
};

export default UserCard;
