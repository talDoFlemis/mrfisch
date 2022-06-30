import React, { useState } from "react";
import CodeHighlighter from "../components/code/CodeHighlighter";

const Home = () => {
  const [theme, setTheme] = useState("dracula");
  const [input, setInput] = useState("import React from 'react';");
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <main>
        <CodeHighlighter theme={theme} language="javascript" input={input} />
      </main>
    </div>
  );
};

export default Home;
