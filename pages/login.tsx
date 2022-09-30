import { Auth, IconArrowLeft } from "@supabase/ui";
import { useAuth } from "@utils/authProvider";
import { supabase } from "@utils/supabaseClient";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GiFriedFish } from "react-icons/gi";

const Login = () => {
  const { view, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user?.id) {
      router.push("codes");
    }
  }, [user]);
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center p-4 lg:w-1/2">
      <Head>
        <title>Login • Mr Fisch</title>
      </Head>

      <Link href="/codes/">
        <a className="flex w-fit cursor-pointer items-center font-bold text-base-content transition-colors hover:text-accent">
          <IconArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
          <p className="hidden md:inline-flex">Go back</p>
        </a>
      </Link>

      <Link href="/">
        <a className="font-spaceRave text-4xl italic text-base-content transition-colors hover:text-accent sm:text-6xl">
          Mr fisch
          <GiFriedFish className="mx-auto h-12 w-12 sm:h-16 sm:w-16" />
        </a>
      </Link>
      <Auth view={view} supabaseClient={supabase} />
    </div>
  );
};

export default Login;
