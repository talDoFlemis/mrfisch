import { Auth } from "@supabase/ui";
import { supabase } from "@utils/supabaseClient";
import Link from "next/link";
import { GiFriedFish } from "react-icons/gi";

interface loginProps {}

const Login = ({}: loginProps) => {
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center p-4 lg:w-1/2">
      <Link href="/">
        <a className="font-spaceRave text-4xl italic text-white transition-colors hover:text-red-500 sm:text-6xl">
          Mr fisch
          <GiFriedFish className="mx-auto h-12 w-12 sm:h-16 sm:w-16" />
        </a>
      </Link>
      <Auth supabaseClient={supabase} />
    </div>
  );
};

export default Login;
