import DashboardLayout from "@components/layout/DashboardLayout";
import { ReactElement } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  DynamicWidgets,
  Hits,
  InstantSearch,
  SearchBoxProps,
} from "react-instantsearch-hooks-web";
import CodeCard from "@components/code/CodeCard";
import Panel from "@components/search/Panel";
import CustomRefinementList from "@components/search/CustomRefinementList";
import CustomSearchBox from "@components/search/CustomSearchBox";
import CustomClearRefinements from "@components/search/CustomClearRefinements";

const searchClient = algoliasearch(
  "IEWGM4QLJ8",
  "3419a08e8edca60c7352612c1b375b2b"
);

let timerId: any = undefined;

const queryHook: SearchBoxProps["queryHook"] = (query, search) => {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => search(query), 1000);
};

const Hit = ({ hit }: any) => {
  return (
    <CodeCard
      id={hit.objectID}
      code_title={hit.code_title}
      description={hit.description}
      is_public={hit.is_public}
      user={hit.user}
      tags={hit._tags}
      className="min-h-52 h-full bg-neutral"
    />
  );
};

const Search = () => {
  return (
    <div className="flex h-max w-full flex-col gap-4">
      {" "}
      <InstantSearch searchClient={searchClient} indexName="mrfisch">
        <CustomSearchBox queryHook={queryHook} />
        {/* <SearchBox queryHook={queryHook} /> */}
        <div className="flex gap-4 p-4">
          <div className="hidden h-fit flex-col rounded-lg bg-neutral sm:flex sm:w-1/3 lg:w-1/4">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-3xl">Filters</h2>
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
    </div>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
