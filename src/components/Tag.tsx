import { ITag } from "@/config/tags";

export const Tag = ({
  tag
}: {
  tag: ITag;
}) => {
  return (
    <div className="flex items-center justify-center rounded-full px-2 py-1 text-sm text-black dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 mt-1 mr-1">
      {tag.label}
    </div>
  );
};
