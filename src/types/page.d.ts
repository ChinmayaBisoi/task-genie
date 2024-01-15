import type { NextPage } from "next";
import type { ComponentType, ReactElement, ReactNode } from "react";

export type Page<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
