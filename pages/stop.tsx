import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { TbHandStop } from "react-icons/tb";
//TODO: Maybe change the quote to You weren't supposed to be here, LG occupied this page before you came
const Stop = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6 bg-base-100 p-4 text-base-content">
      <Head>
        <title>Stop • Mr Fisch</title>
      </Head>
      <div className="relative h-full w-full md:h-1/2 md:w-1/2">
        <Image src="/img/lg.png" alt="LG" layout="fill" objectFit="contain" />
      </div>
      <div className="flex items-center gap-4 font-raleway text-4xl font-bold uppercase sm:text-5xl lg:text-6xl">
        Stop
        <TbHandStop className="h-10 w-10" />
      </div>
      <p className="text-center font-momcake text-2xl sm:text-3xl lg:text-4xl">
        You do not have permission to pass, return to the main page.
      </p>
      <Link href="/codes">
        <a className="btn btn-accent sm:btn-lg">I surrender</a>
      </Link>
    </main>
  );
};

export default Stop;
