import { BiReset } from "react-icons/bi";
import {
  useClearRefinements,
  UseClearRefinementsProps,
} from "react-instantsearch-hooks-web";

const CustomClearRefinements = ({
  includedAttributes,
}: UseClearRefinementsProps) => {
  const { canRefine, refine } = useClearRefinements({ includedAttributes });
  return (
    <>
      {canRefine ? (
        <BiReset
          className="h-6 w-6 cursor-pointer hover:text-accent"
          onClick={() => refine()}
        />
      ) : (
        <BiReset className="h-6 w-6 text-neutral-focus" />
      )}
    </>
  );
};

export default CustomClearRefinements;
