import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import {
  AiFillGithub,
  AiFillGoogleCircle,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { GiFriedFish } from "react-icons/gi";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 mx-auto w-screen h-screen bg-base-100 text-neutral-content">
      <Head>
        <title>Login • Mr Fisch</title>
      </Head>
      <Link href="/codes/">
        <a className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent">
          <AiOutlineArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          <p className="hidden md:inline-flex">Go back</p>
        </a>
      </Link>
      <Link href="/">
        <a className="text-4xl italic transition-colors sm:text-6xl font-spaceRave text-base-content font-geo hover:text-accent">
          Mr fisch
          <GiFriedFish className="mx-auto w-12 h-12 sm:w-16 sm:h-16" />
        </a>
      </Link>
      <h2 className="text-3xl font-geo">Select a method for login</h2>
      <div className="flex gap-4">
        <AiFillGithub
          className="w-8 h-8 cursor-pointer hover:text-accent"
          onClick={() => signIn("github")}
        />
        <AiFillGoogleCircle
          className="w-8 h-8 cursor-pointer hover:text-accent"
          onClick={() => signIn("google")}
        />
        <FaDiscord
          className="w-8 h-8 cursor-pointer hover:text-accent"
          onClick={() => signIn("discord")}
        />
      </div>
    </div>
  );
};

export default Login;
