interface LanguageSelectorProps {
  languages: string[];
  onChange: any;
  value: string;
}

const LanguageSelector = ({
  languages,
  onChange,
  value,
}: LanguageSelectorProps) => {
  return (
    <div className="form-control">
      <label className="label-text" id="language">
        Pick the language of the code
      </label>{" "}
      <select
        className="select select-primary bg-neutral"
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
