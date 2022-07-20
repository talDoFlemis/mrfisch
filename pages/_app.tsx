import "../styles/globals.css";
import type { AppProps } from "next/app";
import { supabase } from "../utils/supabaseClient";
import { AuthProvider } from "../utils/authProvider";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

function MyApp({
  Component,
  pageProps: { ...pageProps },
}: ComponentWithPageLayout) {
  return (
    <AuthProvider supabase={supabase}>
      <ToastContainer autoClose={4000} />
      {Component.PageLayout ? (
        <Component.PageLayout>
          <NextNProgress color="#ed3833" />
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <>
          <NextNProgress color="#ed3833" />
          <Component {...pageProps} />
        </>
      )}
    </AuthProvider>
  );
}

export default MyApp;
