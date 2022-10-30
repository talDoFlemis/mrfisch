export const getCodeFileFormat = (name: string, lang: string) => {
  const dict: { [id: string]: string } = {
    c: "c",
    cpp: "cpp",
    rust: "rust",
    python: "py",
    ruby: "rb",
    typescript: "ts",
    javascript: "js",
    yaml: "yaml",
    css: "cs",
    bash: "sh",
  };
  if (lang === "makefile") return "makefile";
  const str = name.replaceAll(" ", "-");
  return `${str}.${dict[lang]}`;
};

export default getCodeFileFormat;
