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
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (debouncedSearch) {
      searchForItems(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <AiOutlineSearch className="h-4 w-4" />
        </div>
        <input
          type="search"
          placeholder={searchPlaceholder}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-primary block h-8 w-full rounded-lg bg-neutral pl-10 text-neutral-content"
        />
      </div>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-x-1">
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
