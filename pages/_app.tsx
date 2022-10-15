import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { ThemeProvider } from "next-themes";

export type NextPageWithLayout = NextPage & {
  /* eslint-disable no-unused-vars */
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return (
    <UserProvider supabaseClient={supabaseClient}>
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
    </UserProvider>
  );
}

export default MyApp;
