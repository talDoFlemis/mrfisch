import Algolia from "@svgs/algolia.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks-web";

type CustomSearchBoxProps = UseSearchBoxProps;
const CustomSearchBox = ({ queryHook }: CustomSearchBoxProps) => {
  const { refine } = useSearchBox({ queryHook });

  return (
    <div className="relative w-full">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <AiOutlineSearch className="w-4 h-4 sm:w-6 sm:h-6" />
      </div>
      <input
        type="search"
        placeholder="Search for a code"
        onChange={(e) => refine(e.target.value)}
        className="block pl-10 w-full placeholder-transparent rounded-lg sm:placeholder-current input input-bordered input-primary bg-neutral"
      />
      <div className="flex absolute inset-y-0 right-0 gap-x-2 items-center pr-3">
        <span className="hidden text-sm sm:inline-flex lg:text-base">
          Search by{" "}
        </span>
        <Algolia className="w-12 h-12 sm:w-20 sm:h-20 text-neutral-content" />
      </div>
    </div>
  );
};

export default CustomSearchBox;
