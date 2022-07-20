import React from "react";
import Spinner from "@svgs/trailSpinner.svg";
import cl from "clsx";

function LoadingComponent({ className }: { className?: string }) {
  return <Spinner className={cl("mx-auto my-auto", className)} />;
}

export default LoadingComponent;
