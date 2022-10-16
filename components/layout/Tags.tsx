import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { useQuery } from "hooks/useQuery";
import { toast } from "react-toastify";

interface TagsProps {
  initialValues?: string[] | null;
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
  const { data: tags, error } = useQuery<string[]>("/api/codes/tags", false);
  if (error) {
    toast.error("Unable to fetch tags", { theme: "dark" });
  }

  const settings = {
    ...baseTagifySettings,
  };

  return (
    <div className="w-full text-white rounded-md bg-neutral">
      <Tags
        aria-describedby="tags-help"
        name="tags"
        settings={settings}
        defaultValue={initialValues ?? undefined}
        whitelist={tags ?? []}
        onChange={(e) =>
          onChange(e.detail.tagify.value.map((entry) => entry.value))
        }
      />
    </div>
  );
};

export default TagSystem;
