import React from "react";
import Topnav from "~/components/common/topnav/Topnav";
import Sidebar from "~/components/common/sidebar/Sidebar";

const Layout = ({
  children,
  hideSidebar = false,
}: {
  children: React.ReactNode;
  hideSidebar?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <Topnav />
      <div className="flex">
        <div className={`flex-shrink-0 ${hideSidebar ? "hidden" : ""}`}>
          <Sidebar />
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
