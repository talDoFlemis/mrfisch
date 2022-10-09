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
      <label htmlFor="language">Code Language</label>
      <small className="label-text" id="language-help">
        Pick the language of the code
      </small>{" "}
      <select
        className="select select-primary bg-neutral"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        id="language"
        aria-describedby="language-help"
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
