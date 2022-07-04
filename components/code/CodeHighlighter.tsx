import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface EditorProps {
  input: string;
  language: string;
  theme: string;
}

const CodeHighlighter = ({ input, language, theme }: EditorProps) => {
  return (
    <div className="card bg-[#1c1f37] text-sm lg:w-3/4">
      <div className="card-body p-0">
        <SyntaxHighlighter
          showLineNumbers
          language={language}
          style={dracula}
          customStyle={{ backgroundColor: "transparent" }}
          className=""
          wrapLongLines
        >
          {input}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeHighlighter;
