import Algolia from "@svgs/algolia.svg";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks-web";

type CustomSearchBoxProps = UseSearchBoxProps;
const CustomSearchBox = ({ queryHook }: CustomSearchBoxProps) => {
  const { refine } = useSearchBox({ queryHook });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <AiOutlineSearch className="h-6 w-6" />
      </div>
      <input
        type="search"
        placeholder="Search for a code"
        onChange={(e) => refine(e.target.value)}
        className="input input-bordered input-primary block w-full rounded-lg bg-neutral pl-10"
      />
      <div className="absolute inset-y-0 right-0 flex items-center gap-x-2 pr-3">
        Search by <Algolia className="h-20 w-20 text-neutral-content" />
      </div>
    </div>
  );
};

export default CustomSearchBox;
