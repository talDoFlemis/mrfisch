import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface EditorProps {
  input: string;
  language: string;
  theme: string;
}

const CodeHighlighter = ({ input, language, theme }: EditorProps) => {
  return (
    <div className="card mx-auto mt-8 w-4/5 bg-neutral">
      <div className="card-body">
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
