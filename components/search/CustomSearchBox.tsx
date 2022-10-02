import Algolia from "@svgs/algolia.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks-web";

type CustomSearchBoxProps = UseSearchBoxProps;
const CustomSearchBox = ({ queryHook }: CustomSearchBoxProps) => {
  const { refine } = useSearchBox({ queryHook });

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <AiOutlineSearch className="h-4 w-4 sm:h-6 sm:w-6" />
      </div>
      <input
        type="search"
        placeholder="Search for a code"
        onChange={(e) => refine(e.target.value)}
        className="input input-bordered input-primary block w-full rounded-lg bg-neutral pl-10 placeholder-transparent sm:placeholder-current "
      />
      <div className="absolute inset-y-0 right-0 flex items-center gap-x-2 pr-3">
        <span className="hidden text-sm sm:inline-flex lg:text-base">
          Search by{" "}
        </span>
        <Algolia className="h-12 w-12 text-neutral-content sm:h-20 sm:w-20" />
      </div>
    </div>
  );
};

export default CustomSearchBox;
