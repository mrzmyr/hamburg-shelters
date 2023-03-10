import { ITag } from "@/types";
import { X } from "lucide-react";

export const Tag = ({
  tag,
  onRemove,
}: {
  tag: ITag;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center justify-center rounded-full px-2 py-1 text-sm text-black dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 mt-1 mr-1">
      {tag.label}
      <X
        size={14}
        className="ml-1.5 cursor-pointer"
        onClick={() => {
          onRemove();
        }}
      />
    </div>
  );
};
