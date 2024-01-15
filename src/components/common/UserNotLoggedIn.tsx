import React from "react";

const UserNotLoggedIn = () => {
  return (
    <div className="my-8 flex flex-col items-center font-medium">
      <h4 className="text-3xl">Oops !</h4>
      <h5 className="text-brand-dark">Please login to view this page.</h5>
    </div>
  );
};

export default UserNotLoggedIn;
