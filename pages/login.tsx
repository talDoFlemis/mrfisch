import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Auth, IconArrowLeft } from "@supabase/ui";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GiFriedFish } from "react-icons/gi";

const Login = () => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.id) {
      router.push("codes");
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-center items-center p-4 mx-auto h-screen lg:w-1/2">
      <Head>
        <title>Login • Mr Fisch</title>
      </Head>
      <Link href="/codes/">
        <a className="flex items-center font-bold transition-colors cursor-pointer w-fit text-base-content hover:text-accent">
          <IconArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          <p className="hidden md:inline-flex">Go back</p>
        </a>
      </Link>
      <Link href="/">
        <a className="text-4xl italic transition-colors sm:text-6xl font-spaceRave text-base-content hover:text-accent">
          Mr fisch
          <GiFriedFish className="mx-auto w-12 h-12 sm:w-16 sm:h-16" />
        </a>
      </Link>
      <Auth supabaseClient={supabaseClient} />
    </div>
  );
};

export default Login;
