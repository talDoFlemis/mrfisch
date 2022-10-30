import Link from "next/link";
import { CodeInterface } from "typings";
import StealCodeButton from "../StealCodeButton";

interface LinkedCodeCardProps
  extends Omit<
    CodeInterface,
    | "user"
    | "userId"
    | "updated_at"
    | "inserted_at"
    | "documentation"
    | "language"
    | "number_views"
    | "favorited_by"
    | "comments"
    | "associatedTo"
    | "associatedBy"
  > {
  className?: string;
}
const LinkedCodeCard = ({
  code_title,
  code_block,
  id,
  description,
}: LinkedCodeCardProps) => {
  return (
    <Link href={`/codes/${id}`}>
      <a className="h-48 transition-transform cursor-pointer hover:scale-105 card bg-neutral font-inter">
        <div className="card-body">
          <h3 className="text-xl font-geo">{code_title}</h3>
          <p className="font-light truncate">{description}</p>
          <StealCodeButton code={code_block} codeId={id} />
        </div>
      </a>
    </Link>
  );
};

export default LinkedCodeCard;
