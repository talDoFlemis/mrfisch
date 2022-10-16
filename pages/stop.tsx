import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { TbHandStop } from "react-icons/tb";
//TODO: Maybe change the quote to You weren't supposed to be here, LG occupied this page before you came
const Stop = () => {
  return (
    <main className="flex flex-col gap-6 justify-center items-center p-4 h-screen bg-base-100 text-base-content">
      <Head>
        <title>Stop • Mr Fisch</title>
      </Head>
      <div className="relative w-full h-full md:w-1/2 md:h-1/2">
        <Image src="/img/lg.png" alt="LG" layout="fill" objectFit="contain" />
      </div>
      <div className="flex gap-4 items-center text-4xl font-bold uppercase sm:text-5xl lg:text-6xl font-raleway">
        Stop
        <TbHandStop className="w-10 h-10" />
      </div>
      <p className="text-2xl text-center sm:text-3xl lg:text-4xl font-momcake">
        You do not have permission to pass, return to the main page.
      </p>
      <Link href="/codes">
        <a className="btn btn-accent sm:btn-lg">I surrender</a>
      </Link>
    </main>
  );
};

export default Stop;
