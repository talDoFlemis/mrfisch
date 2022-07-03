import { IconArrowLeft } from "@supabase/ui";
// import { GetServerSideProps } from "next";
import Link from "next/link";
import CodeHighlighter from "../../components/code/CodeHighlighter";
import DashboardLayout from "../../components/layout/DashboardLayout";
// import { supabase } from "../../utils/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// interface CodeViewProps {}
//TODO: Add dynamic data and card to markdown
const CodeView = () => {
  const data = `import React from "react";
import uniquePropHOC from "./lib/unique-prop-hoc";

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

class Expire extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: props.children }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                component: null
            });
        }, this.props.time || this.props.seconds * 1000);
    }
    render() {
        return this.state.component;
    }
}

export default uniquePropHOC(["time", "seconds"])(Expire);`;
  const markdown = `# A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;
  return (
    <main className="flex w-full flex-col p-4 font-raleway">
      <Link href="/codes/">
        <a className="mb-4 flex w-fit cursor-pointer items-center font-bold transition-colors hover:text-red-500">
          <IconArrowLeft className="h-8 w-8" />
          Go back
        </a>
      </Link>
      <div className="flex justify-between gap-x-8">
        <CodeHighlighter input={data} theme="dracula" language="javascript" />
        <div className="card h-fit w-1/4 bg-[#1c1f37]">
          <div className="card-body">
            <h1 className="text-center text-lg font-bold">Code Title</h1>
            <p className="">Desc</p>
            <div className="flex content-between items-center ">
              <p>Language</p>
              <p className="text-right font-bold">js</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Created</p>
              <p className="text-right">aoeu</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Last updated</p>
              <p className="text-right">aoeua</p>
            </div>
          </div>
        </div>
      </div>
      <ReactMarkdown
        children={markdown}
        className="prose"
        remarkPlugins={[remarkGfm]}
      />
    </main>
  );
};

export default CodeView;

CodeView.PageLayout = DashboardLayout;
