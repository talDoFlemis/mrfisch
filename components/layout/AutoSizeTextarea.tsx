import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";
import cl from "clsx";

interface AutoSizeTextareaProps {
  setText: Dispatch<SetStateAction<string>>;
  text: string;
  className?: string;
}

const AutoSizeTextarea = ({
  setText,
  text,
  className,
}: AutoSizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTab = (e: any) => {
    if (e.key === "Tab" && !e.shiftKey) {
      document.execCommand("insertText", false, "\t");
      e.preventDefault();
      return false;
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [text]);

  return (
    <div className={cl("flex flex-col items-center", className)}>
      <textarea
        ref={textareaRef}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleTab(e)}
        className="textarea textarea-primary  block w-full resize-none overflow-hidden bg-transparent"
        value={text}
      />
    </div>
  );
};

export default AutoSizeTextarea;
