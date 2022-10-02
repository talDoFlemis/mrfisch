import { useToggleRefinement } from "react-instantsearch-hooks-web";

interface CustomToggleRefinementProps {
  attribute: string;
}

const CustomToggleRefinement = ({ attribute }: CustomToggleRefinementProps) => {
  const { value, refine, canRefine } = useToggleRefinement({
    attribute: attribute,
  });
  return (
    <div className="flex justify-center">
      <div className="form-check form-switch">
        <input
          className="form-check-input float-left  h-5 w-9 cursor-pointer appearance-none rounded-full bg-white bg-contain bg-no-repeat  align-top shadow-sm focus:outline-none"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          disabled={!canRefine}
          onChange={(event) => refine({ isRefined: !event.target.checked })}
        />
        <label
          className="form-check-label inline-block text-gray-800"
          htmlFor="flexSwitchCheckDefault"
        >
          {value.isRefined ? "Public" : "Private"}
        </label>
      </div>
    </div>
  );
};

export default CustomToggleRefinement;
