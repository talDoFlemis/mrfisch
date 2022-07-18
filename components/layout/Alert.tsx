import cl from "clsx";
import { useEffect, useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import { MdInfo, MdDone } from "react-icons/md";
import { VscError } from "react-icons/vsc";

interface AlertProps {
  alertType?: string;
  message?: string;
}

const Alert = ({ alertType, message }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [message]);
  return (
    <>
      {isVisible && (
        <div
          className={cl(
            "alert sticky top-16 shadow-lg",
            alertType === "success" && "alert-success",
            alertType === "error" && "alert-error",
            alertType === "info" && "alert-info",
            alertType === "warning" && "alert-warning"
          )}
        >
          <div className="flex-start flex">
            {(alertType === "error" && <VscError className="h-6 w-6" />) ||
              (alertType === "info" && <MdInfo className="h-6 w-6" />) ||
              (alertType === "warning" && (
                <AiFillWarning className="h-6 w-6" />
              )) ||
              (alertType === "success" && <MdDone className="h-6 w-6" />)}
            {message}
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
