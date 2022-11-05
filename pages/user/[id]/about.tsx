import DashboardLayout from "@components/layout/DashboardLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineUserSwitch } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import Image from "next/image";
import { useQuery } from "hooks/useQuery";
import { toast } from "react-toastify";
import { CodeInterface } from "typings";
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from "recharts";
import CodeCard from "@components/code/CodeCard";
import LoadingComponent from "@components/layout/LoadingComponent";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image: string;
  isNew: boolean;
  role: string;
  codes: CodeInterface[];
}

interface GlobalState {
  views: number;
  codeCount: number;
  langs: { name: string; count: number; fill: string }[];
  favoriteTags: { name: string; count: number }[];
}

const About = () => {
  const router = useRouter();
  const [global, setGlobal] = useState<GlobalState>();
  const { data: user, error } = useQuery<User>(
    router.query.id ? `/api/user/${router.query.id}/profile` : null,
    false
  );
  if (error) toast.error(`Unable to fetch the code, ${error.message}`);

  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const updateGlobal = () => {
    const up: GlobalState = {
      views: 0,
      codeCount: 0,
      langs: [],
      favoriteTags: [],
    };
    const langMap = new Map();
    const tagMap = new Map();

    user?.codes.map((code) => {
      up.codeCount++;
      up.views += code.number_views;
      langMap.set(code.language, langMap.get(code.language) + 1 || 1);
      code.tags?.map((tag) => {
        tagMap.set(tag, tagMap.get(tag) + 1 || 1);
      });
    });

    up.langs = Array.from(langMap, ([name, count]) => {
      return {
        name: name,
        count: count,
        fill: randomColor(),
      };
    });
    up.langs.sort((a, b) => b.count - a.count);
    console.log(up.langs);

    up.favoriteTags = Array.from(tagMap, ([name, count]) => {
      return {
        name: name,
        count: count,
      };
    });
    up.favoriteTags.sort((a, b) => b.count - a.count);
    setGlobal(up);
  };

  useEffect(() => {
    if (user) updateGlobal();
  }, [user]);

  return (
    <main className="flex flex-col gap-4 items-center w-full h-max">
      <Head>
        <title>My Codes • Mr Fisch</title>
      </Head>
      <div className="sticky top-0 z-10 justify-between bg-opacity-40 navbar bg-neutral backdrop-blur-sm">
        <button
          className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent"
          onClick={() => router.back()}
        >
          <AiOutlineArrowLeft className="w-6 h-6 md:w-8 md:h-8" aria-hidden />
          <p className="hidden md:inline-flex">Go back</p>
        </button>
        <label
          className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
          htmlFor="drawer"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </label>
      </div>
      {!user && !error ? (
        <div className="flex justify-center items-center h-3/5">
          <LoadingComponent className="w-16 h-16 text-accent" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 place-content-center place-items-center p-4 w-full lg:container lg:grid-cols-5">
            <div className="flex flex-col gap-4 items-center mx-auto">
              {user?.image ? (
                <div className="relative w-52 h-52 mask mask-circle">
                  <Image
                    src={user.image}
                    alt="avatar"
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              ) : (
                <AiOutlineUserSwitch className="w-4 h-4" />
              )}
              <h1 className="text-5xl font-geo">{user?.name}</h1>
            </div>
            <div className="col-span-full w-4/5 lg:col-span-4 card bg-neutral">
              <div className="card-body">
                <h3 className="text-2xl font-geo">User status</h3>
                <p>
                  Favorite language:{" "}
                  <span className="font-bold text-accent">
                    {global?.langs[0].name ?? "none"}
                  </span>
                </p>
                <p>
                  Number of codes:{" "}
                  <span className="font-bold text-accent">
                    {global?.codeCount}
                  </span>
                </p>
                <p>
                  Number of views:{" "}
                  <span className="font-bold text-accent">{global?.views}</span>
                </p>
                <h3 className="text-2xl font-geo">Most used languages</h3>
                <ResponsiveContainer height={200} width="100%">
                  <PieChart>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip />
                    <Pie
                      data={global?.langs}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {global?.favoriteTags && global.favoriteTags.length !== 0 && (
                  <>
                    <h3 className="text-2xl font-geo">Most used tags</h3>
                    <div className="flex flex-wrap gap-2 justify-center pt-2 item-center">
                      {global?.favoriteTags?.map((tag, index) => (
                        <div
                          key={index}
                          className="text-2xs badge badge-secondary shrink-0"
                        >
                          {tag.name}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <h1 className="self-start p-4 text-4xl font-geo">
            All codes from {user?.name ?? user?.email}
          </h1>
          <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 xl:grid-cols-3 h-max">
            {user?.codes?.length !== 0 ? (
              user?.codes?.map((code) => (
                <CodeCard
                  key={code.id}
                  id={code.id}
                  code_title={code.code_title}
                  description={code.description}
                  updated_at={code.updated_at}
                  code_block={code.code_block}
                  user={code.user}
                  className="min-h-52 bg-neutral"
                  tags={code.tags}
                  language={code.language}
                />
              ))
            ) : (
              <div className="flex flex-col col-span-full gap-y-4 justify-center items-center font-geo">
                <h3 className="text-2xl text-center">
                  No code was found for this user
                </h3>
                <div className="relative w-52 h-40">
                  <Image
                    src="/img/yui.gif"
                    layout="fill"
                    objectFit="contain"
                    alt="yui gif"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default About;

About.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
