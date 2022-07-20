import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsClipboardCheck, BsLink45Deg } from "react-icons/bs";

const CopyLink = ({ link }: { link: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copied = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <CopyToClipboard text={link} onCopy={() => copied()}>
      <div className="btn btn-primary btn-sm border-none transition-colors hover:text-white">
        {isCopied ? (
          <>
            <p>Copied</p>
            <BsClipboardCheck className="h-6 w-6 " />
          </>
        ) : (
          <>
            <p>Copy Link</p>
            <BsLink45Deg className="h-6 w-6 shadow-accent" />
          </>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default CopyLink;
