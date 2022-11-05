import DashboardLayout from "@components/layout/DashboardLayout";
import { ReactElement } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  Hits,
  InstantSearch,
  SearchBoxProps,
} from "react-instantsearch-hooks-web";
import CodeCard from "@components/code/CodeCard";
import Panel from "@components/search/Panel";
import CustomRefinementList from "@components/search/CustomRefinementList";
import CustomSearchBox from "@components/search/CustomSearchBox";
import CustomClearRefinements from "@components/search/CustomClearRefinements";
import Link from "next/link";
import { IconArrowLeft } from "@supabase/ui";
import { HiOutlineMenu } from "react-icons/hi";
import Head from "next/head";

const searchClient = algoliasearch(
  "IEWGM4QLJ8",
  "3419a08e8edca60c7352612c1b375b2b"
);

let timerId: any = undefined;

const queryHook: SearchBoxProps["queryHook"] = (query, search) => {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => search(query), 0);
};

const Hit = ({ hit }: any) => {
  return (
    <CodeCard
      id={hit.objectID}
      code_title={hit.code_title}
      description={hit.description}
      user={hit.user}
      tags={hit._tags}
      updated_at={hit.updated_at}
      className="h-full min-h-52 bg-neutral"
      hit={hit}
      language={hit.language}
      code_block={hit.code_block}
    />
  );
};

const Search = () => {
  return (
    <main className="flex flex-col gap-4 w-full h-max">
      <Head>
        <title>Search • Mr Fisch</title>
      </Head>{" "}
      <InstantSearch searchClient={searchClient} indexName="mrfisch">
        <div className="sticky top-0 z-10 gap-x-2 justify-between p-4 bg-opacity-40 lg:gap-x-10 navbar font-raleway backdrop-blur-sm">
          <Link href="/codes/">
            <a className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent">
              <IconArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
              <p className="hidden whitespace-nowrap md:inline-flex w-fit">
                Go back
              </p>
            </a>
          </Link>
          <CustomSearchBox queryHook={queryHook} />
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </label>
        </div>
        <div className="flex gap-4 p-4 w-full">
          <div className="hidden flex-col w-60 rounded-lg sm:flex h-fit bg-neutral">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-3xl font-geo">Filters</h2>
              <CustomClearRefinements />
            </div>
            <Panel header="Tags" attributes={["_tags"]}>
              <CustomRefinementList
                attribute="_tags"
                searchPlaceholder="Search a tag"
              />
            </Panel>
            <Panel header="Language" attributes={["language"]}>
              <CustomRefinementList
                attribute="language"
                searchPlaceholder="Search a language"
              />
            </Panel>
            <Panel header="Username" attributes={["user.username"]}>
              <CustomRefinementList
                attribute="user.username"
                searchPlaceholder="Search a username"
              />
            </Panel>
          </div>
          <Hits
            hitComponent={Hit}
            classNames={{
              list: "mx-auto grid h-max grid-cols-1 gap-6 md:grid-cols-2 place-items-stretch",
            }}
          />
        </div>
      </InstantSearch>
    </main>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
