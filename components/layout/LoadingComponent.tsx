import React from "react";
import Spinner from "@svgs/trailSpinner.svg";
import cl from "clsx";

function LoadingComponent({ className }: { className?: string }) {
  return (
    <div className={cl(className, "my-auto mx-auto")}>
      <Spinner className="mx-auto h-16 w-16" />{" "}
    </div>
  );
}

export default LoadingComponent;
