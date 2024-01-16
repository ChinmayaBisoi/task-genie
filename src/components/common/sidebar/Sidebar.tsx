import Link from "next/link";
import React from "react";
import styles from "./sidebar.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Avatar from "~/components/Avatar";

export const NAV_ITEMS = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Timeline", link: "/timeline" },
  { label: "Team", link: "/team" },
  { label: "Profile", link: "/profile" },
];

const Sidebar = () => {
  const { pathname } = useRouter();
  const noActivePaths = !NAV_ITEMS.find((item) => pathname.includes(item.link));

  return (
    <aside
      className={`${styles.customHeight} sticky top-12 hidden md:flex md:w-52 md:flex-col md:justify-between`}
    >
      <nav>
        <ul className="my-8 space-y-2 px-4 text-sm">
          {noActivePaths && (
            <li className="ml-4 rounded-sm pr-4 pt-1 text-xs font-medium text-gray-700 underline">
              Quick Links
            </li>
          )}
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.includes(item.link);
            return (
              <li key={item.label}>
                <Link
                  href={item.link}
                  className={`block rounded-full px-4 py-2 font-medium  hover:bg-brand-light hover:text-white 
                ${isActive ? "bg-brand-light text-white" : "text-gray-700"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
