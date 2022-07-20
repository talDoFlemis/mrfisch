import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { GiDaemonSkull } from "react-icons/gi";
import { BsClipboardCheck } from "react-icons/bs";
import { toast } from "react-toastify";

const StealCodeButton = ({
  code,
  toHide = false,
}: {
  code: string;
  toHide?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const copied = () => {
    setIsCopied(true);
    toast.info("Code copied with success", { theme: "dark" });

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <CopyToClipboard text={code} onCopy={() => copied()}>
      <div className="btn btn-sm border-none bg-[#ed3833] text-white shadow hover:bg-[#ed3833]  hover:text-[#021431] hover:shadow-white">
        {isCopied ? (
          <>
            <p className={`${toHide && "hidden sm:inline-flex"}`}>Copied</p>
            <BsClipboardCheck className="h-6 w-6 " />
          </>
        ) : (
          <>
            <p className={`${toHide && "hidden sm:inline-flex"}`}>Steal Code</p>
            <GiDaemonSkull className="h-6 w-6 shadow-accent transition-colors duration-300 " />
          </>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default StealCodeButton;
