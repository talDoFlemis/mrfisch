import { Dispatch, SetStateAction } from "react";

interface LanguageSelectorProps {
  setLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageSelector = ({ setLanguage }: LanguageSelectorProps) => {
  const languages = ["javascript", "python", "css"];

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Pick the language of the code</span>
      </label>{" "}
      <select
        className="select select-primary bg-neutral"
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.sort().map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
