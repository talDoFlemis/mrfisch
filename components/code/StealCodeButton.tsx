import { useState } from "react";
import { GiDaemonSkull } from "react-icons/gi";
import { BsClipboardCheck } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

const StealCodeButton = ({
  code,
  codeId,
  toHide = false,
}: {
  code: string;
  codeId: string;
  toHide?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async () => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);
    toast.success("Code copied with success", { theme: "dark" });
    await axios.patch("/api/codes/trendingcodes", { id: codeId });
    toast.info("The code rank was increased by 1");

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button
      onClick={() => copyToClipboard()}
      className="border-none shadow btn btn-sm bg-accent text-accent-content hover:bg-accent-focus hover:text-accent-content hover:shadow-white"
    >
      {isCopied ? (
        <>
          <p className={`${toHide && "hidden sm:inline-flex"} text-2xs`}>
            Copied
          </p>
          <BsClipboardCheck className="w-6 h-6" />
        </>
      ) : (
        <>
          <p className={`${toHide && "hidden sm:inline-flex"} text-2xs`}>
            Steal Code
          </p>
          <GiDaemonSkull className="w-6 h-6 transition-colors duration-300 shadow-accent" />
        </>
      )}
    </button>
  );
};

export default StealCodeButton;
