import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export type NextPageWithLayout = NextPage & {
  /* eslint-disable no-unused-vars */
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <SessionProvider session={session}>
      <ThemeProvider defaultTheme="mrfisch">
        <ToastContainer
          autoClose={4000}
          toastClassName={() =>
            "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-neutral"
          }
          bodyClassName={() => "font-neutral-content block p-3"}
        />
        {layout}
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
