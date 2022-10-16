import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";
import cl from "clsx";

interface AutoSizeTextareaProps {
  setText: Dispatch<SetStateAction<string>>;
  text: string;
  className?: string;
  id: string;
  describedby?: string;
  errormessage?: string;
  error: boolean;
}

const AutoSizeTextarea = ({
  setText,
  text,
  className,
  id,
  describedby,
  errormessage,
  error,
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
        id={id}
        aria-describedby={describedby ?? undefined}
        aria-errormessage={errormessage ?? undefined}
        aria-invalid={error}
        ref={textareaRef}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleTab(e)}
        className="block overflow-hidden w-full bg-transparent resize-none textarea textarea-primary"
        value={text}
      />
    </div>
  );
};

export default AutoSizeTextarea;
