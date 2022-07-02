import "../styles/globals.css";
import type { AppProps } from "next/app";
import { supabase } from "../utils/supabaseClient";
import { AuthProvider } from "../utils/authProvider";

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
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <>
          <Component {...pageProps} />
        </>
      )}
    </AuthProvider>
  );
}

export default MyApp;
