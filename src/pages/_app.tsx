import "@/styles/globals.css";

import type { NextPage } from "next";

import AuthWrapper from "@/wrappers/AuthWrapper";
import { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  auth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const isProtected = Component.auth ?? false;

  return (
    <AuthWrapper isProtected={isProtected}>
      <Component {...pageProps} />
    </AuthWrapper>
  );
}
