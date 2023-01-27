import { Building, Check, MapPin } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/Popover";
import { TAGS } from "@/config/tags";
import { ApiPlace } from "@/pages/api/places";
import { Tag } from "./Tag";
import { Button } from "./ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu";

function Pin({
  isActive,
  isSelected,
  item,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onClose,
  onCheckIn,
  onTagAdd,
  onTagRemove,
}: {
  isActive?: boolean;
  isSelected?: boolean;
  item: ApiPlace;
  onClick?: (item: ApiPlace) => void
  onMouseEnter?: (item: ApiPlace) => void
  onMouseLeave?: (item: ApiPlace) => void
  onClose: () => void
  onCheckIn: (item: ApiPlace) => void
  onTagAdd: (tagId: string) => void
  onTagRemove: (tagId: string) => void
}) {
  return (
    <Popover>
      <PopoverTrigger>

        <div
          onMouseEnter={() => onMouseEnter(item)}
          onMouseLeave={() => onMouseLeave(item)}
          onClick={(e) => {
            console.log('click')
            onClick(item)
          }}
          className={`
            relative 
            -top-4 
            rounded-full 
            cursor-pointer 
            shadow-md 
            transition-all 
            ${isActive || isSelected ? 'z-20' : 'scale-100'}
            px-2.5 py-2 shadow-lg
            ${isSelected ? 'scale-105' : ''}
            ${item.properties.checkedIn ? 'bg-green-500 dark:bg-green-600' : 'bg-white dark:bg-blue-600'}
            flex justify-center items-center
          `}
          style={{
            borderRadius: 100,
          }}
        >
          <div
            className={`
            absolute -bottom-[4px]
            w-0 h-0
            border-l-[7px] border-l-solid border-l-transparent
            border-r-[7px] border-r-solid border-r-transparent
            border-t-[5px] border-t-solid ${item.properties.checkedIn ? 'border-t-green-500 dark:border-t-green-600' : 'border-t-white dark:border-t-blue-600'}
          `}
          ></div>
          <span className="text-xl">🏨</span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="-translate-y-[20px]"
      >
        <div
          className="flex justify-between"
        >
          {item.properties.checkedIn && (
            <div className="min-w-min py-1">
              <Check size={20} className="text-green-500 mr-2" />
            </div>
          )}
          <div
            className="font-medium text-lg text-black dark:text-white"
          >{item.properties.traeger}</div>
        </div>
        <div className="text-base flex items-center text-neutral-700 dark:text-neutral-300 mt-2">
          <MapPin size={15} className="mr-1.5 text-neutral-500 dark:text-neutral-400" />
          <span>{item.properties.strasse} {item.properties.haus_nr}</span>
        </div>
        <div className="text-base flex items-center text-neutral-700 dark:text-neutral-300 mt-1">
          <Building size={15} className="mr-1.5 text-neutral-500 dark:text-neutral-400" />
          <span>Plätze {item.properties.plaetze - (item.properties.checkedIn ? 1 : 0)}</span>
        </div>
        <div
          className="flex flex-wrap mt-2"
        >
          {item.properties?.tags?.map((tag) => (
            <Tag
              key={tag.id}
              tag={tag}
              onRemove={() => {
                onTagRemove(tag.id)
              }}
            />
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="w-full"
          >
            <Button
              variant="outline"
              className="mt-3 w-full"
            >
              Information hinzufügen
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {TAGS
              .filter((tag) => !item.properties.tags?.find((t) => t.id === tag.id))
              .map((tag) => (
                <DropdownMenuItem
                  key={tag.id}
                  onClick={() => {
                    onTagAdd(tag.id)
                  }}
                >
                  {tag.label}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={() => {
            onCheckIn(item);
          }}
          className="mt-2.5 w-full"
          variant="outline"
        >
          {item.properties.checkedIn ? 'Check out' : 'Check in'}
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default Pin;