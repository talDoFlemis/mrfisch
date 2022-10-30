import { Languages } from "@prisma/client";
interface LanguageSelectorProps {
  onChange: any;
  value: string;
}

//TODO: Change this to use prisma langs

const LanguageSelector = ({ onChange, value }: LanguageSelectorProps) => {
  const languages = Object.keys(Languages).map((lang) => lang);
  return (
    <div className="form-control">
      <label className="label-text" htmlFor="language">
        Pick the language of the code
      </label>{" "}
      <select
        className="mt-2 select select-primary bg-neutral"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        id="language"
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
