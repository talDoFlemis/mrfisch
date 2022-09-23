import { Auth, IconArrowLeft } from "@supabase/ui";
import { supabase } from "@utils/supabaseClient";
import Link from "next/link";
import { GiFriedFish } from "react-icons/gi";

interface loginProps {}

const Login = ({}: loginProps) => {
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center p-4 lg:w-1/2">
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
      <Auth supabaseClient={supabase} />
    </div>
  );
};

export default Login;
