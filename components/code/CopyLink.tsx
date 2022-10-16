import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsClipboardCheck, BsLink45Deg } from "react-icons/bs";
import { toast } from "react-toastify";

const CopyLink = ({ link }: { link: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copied = () => {
    setIsCopied(true);
    toast.info("Link copied with success", { theme: "dark" });

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <CopyToClipboard text={link} onCopy={() => copied()}>
      <div className="border-none transition-colors hover:text-white btn btn-primary btn-sm">
        {isCopied ? (
          <>
            <p>Copied</p>
            <BsClipboardCheck className="w-6 h-6" />
          </>
        ) : (
          <>
            <p>Copy Link</p>
            <BsLink45Deg className="w-6 h-6 shadow-accent" />
          </>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default CopyLink;
