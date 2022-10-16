import { useState } from "react";
import { BsClipboardCheck, BsLink45Deg } from "react-icons/bs";
import { toast } from "react-toastify";

const CopyLink = ({ link }: { link: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(link);
    toast.info("Link copied with success", { theme: "dark" });

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button
      onClick={() => {
        copyToClipboard();
      }}
      className="border-none transition-colors hover:text-white btn btn-primary btn-sm"
    >
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
    </button>
  );
};

export default CopyLink;
