import React from "react";
import cl from "clsx";
import TrailSpinner from "@components/svgs/TrailSpinner";

function LoadingComponent({ className }: { className?: string }) {
  return (
    <TrailSpinner
      className={cl("mx-auto my-auto text-base-content", className)}
    />
  );
}

export default LoadingComponent;
