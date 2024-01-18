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
      <div className="grid grid-cols-12 bg-gradient-to-r from-brand-dark via-indigo-500 to-brand-light/30 px-4 py-16 md:px-0 md:py-16">
        <div className="col-span-full flex flex-col items-center gap-4 md:col-span-8 md:col-start-3">
          <h3 className="text-center text-4xl text-brand-dark text-white">
            Get started with TaskGenie today
          </h3>
        </div>
      </div>
      <div className="my-2 grid grid-cols-12 px-4 md:px-0">
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
