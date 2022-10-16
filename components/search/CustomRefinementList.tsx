import useDebounce from "hooks/useDebouncer";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  useRefinementList,
  UseRefinementListProps,
} from "react-instantsearch-hooks-web";

type CustomRefinementListProps = UseRefinementListProps & {
  searchPlaceholder: string;
};

const CustomRefinementList = ({
  attribute,
  searchPlaceholder,
}: CustomRefinementListProps) => {
  const { items, refine, searchForItems } = useRefinementList({ attribute });
  const [search, setSearch] = useState<string | "">("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      searchForItems(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <AiOutlineSearch className="w-4 h-4" />
        </div>
        <input
          type="search"
          placeholder={searchPlaceholder}
          onChange={(e) => setSearch(e.target.value)}
          className="block pl-10 w-full h-8 rounded-lg input input-bordered input-primary bg-neutral text-neutral-content"
        />
      </div>
      {items.map((item) => (
        <div key={item.label} className="flex gap-x-1 items-center">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            onClick={() => refine(item.label)}
          />
          <span className="flex-grow justify-self-start truncate">
            {item.label}
          </span>
          <span className="text-primary">{item.count}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomRefinementList;
