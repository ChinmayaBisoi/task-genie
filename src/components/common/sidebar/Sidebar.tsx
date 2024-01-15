import Link from "next/link";
import React from "react";
import styles from "./sidebar.module.css";
import { useRouter } from "next/router";

export const NAV_ITEMS = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Timeline", link: "/timeline" },
  { label: "Team", link: "/team" },
  { label: "Profile", link: "/profile" },
];

const Sidebar = () => {
  const { pathname } = useRouter();
  return (
    <aside
      className={`${styles.customHeight} sticky top-12 hidden md:inline-block md:w-52`}
    >
      <ul className="my-8 space-y-2 px-4 text-sm">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.includes(item.link);
          return (
            <li key={item.label}>
              <Link
                href={item.link}
                className={`block rounded-lg px-4 py-2 font-medium  hover:bg-brand-light hover:text-white 
                ${isActive ? "bg-brand-light text-white" : "text-gray-700"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
