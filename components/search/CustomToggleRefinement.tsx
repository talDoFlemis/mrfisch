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
          className="float-left w-9 h-5 align-top bg-white bg-no-repeat bg-contain rounded-full shadow-sm appearance-none cursor-pointer focus:outline-none form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          disabled={!canRefine}
          onChange={(event) => refine({ isRefined: !event.target.checked })}
        />
        <label
          className="inline-block text-gray-800 form-check-label"
          htmlFor="flexSwitchCheckDefault"
        >
          {value.isRefined ? "Public" : "Private"}
        </label>
      </div>
    </div>
  );
};

export default CustomToggleRefinement;
