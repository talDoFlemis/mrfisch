import React from "react";
import Spinner from "@svgs/trailSpinner.svg";
import cl from "clsx";

function LoadingComponent({ className }: { className?: string }) {
  return (
    <Spinner className={cl("mx-auto my-auto text-base-content", className)} />
  );
}

export default LoadingComponent;
