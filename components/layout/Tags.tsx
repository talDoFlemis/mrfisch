import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { useQuery } from "hooks/useQuery";

interface TagsProps {
  initialValues?: string[];
  onChange: any;
}

const baseTagifySettings = {
  maxTags: 5,
  placeholder: "Add a tag",
  dropdown: {
    enabled: 0,
    maxItems: 20,
    classname: "tags-look",
    closeOnSelect: false,
  },
  callbacks: {},
};

const TagSystem = ({ initialValues = [], onChange }: TagsProps) => {
  const { data: tags, error } = useQuery<string[]>("/api/codes/tags");
  if (error) {
    console.log(error);
  }

  const settings = {
    ...baseTagifySettings,
  };

  return (
    <div className="w-full rounded-md bg-neutral text-white">
      <Tags
        settings={settings}
        defaultValue={initialValues}
        whitelist={tags ?? []}
        onChange={(e) =>
          onChange(e.detail.tagify.value.map((entry) => entry.value))
        }
      />
    </div>
  );
};

export default TagSystem;
