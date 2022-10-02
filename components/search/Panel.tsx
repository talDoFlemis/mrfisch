/* eslint-disable no-undef */
interface PanelProps {
  header: string;
  attributes: string[] | undefined;
  children: React.ReactNode;
}
import CustomClearRefinements from "@components/search/CustomClearRefinements";

const Panel = ({ header, attributes, children }: PanelProps) => {
  return (
    <div className="flex flex-col gap-y-2 p-3">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl">{header}</h3>
        <CustomClearRefinements includedAttributes={attributes} />
      </div>
      {children}
    </div>
  );
};

export default Panel;
