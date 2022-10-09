import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import cl from "clsx";

interface EditorProps {
  input: string;
  language: string;
  className?: string;
}

const CodeHighlighter = ({ input, language, className }: EditorProps) => {
  return (
    <div className={cl("card", className)} data-testid="code-highlight">
      <div className={cl("card-body p-0", className)}>
        <SyntaxHighlighter
          showLineNumbers
          language={language}
          style={dracula}
          customStyle={{ backgroundColor: "transparent" }}
          codeTagProps={{
            style: { fontSize: "inherit", fontStyle: "inherit" },
          }}
          className="h-full font-sans"
          useInlineStyles
        >
          {input}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeHighlighter;
