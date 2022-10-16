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
          className="w-6 h-6 cursor-pointer hover:text-accent"
          onClick={() => refine()}
        />
      ) : (
        <BiReset className="w-6 h-6 text-neutral-focus" />
      )}
    </>
  );
};

export default CustomClearRefinements;
