import type { ReactElement } from "react";
import Layout from "~/components/layout/Layout";
import TrustedBy from "./landing/TrustedBy";
import Section1 from "./landing/Seciton1";
import HowItWorks from "./landing/HowItWorks";
import Twitter from "~/components/icons/Twitter";
import Github from "~/components/icons/Github";

export default function Home() {
  return (
    <div>
      <Section1 />
      <HowItWorks />
      <TrustedBy />
      <div className="my-16 grid grid-cols-12 px-4 md:my-16 md:px-0">
        <div className="col-span-full flex flex-col items-center gap-4 md:col-span-8 md:col-start-3">
          <div className="flex justify-between gap-4">
            <div>© TaskGenie 2024</div>
            <div className="flex gap-4">
              <Github />
              <Twitter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout hideSidebar>{page}</Layout>;
};
