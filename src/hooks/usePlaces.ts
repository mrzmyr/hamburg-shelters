import { TAGS } from './../config/tags';
import { useLocalStorage } from 'usehooks-ts';
import { ApiPlaces } from "@/pages/api/places";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePlaces = () => {
  const [tags, setTags] = useLocalStorage("tags", {})
  const [checkIns, setCheckIns] = useLocalStorage("checkIns", {})

  const { data, error, isLoading } = useSWR<ApiPlaces>(
    "/api/places",
    fetcher
  );

  const _getTags = (placeId: string) => {
    return (tags[placeId] || []).map((tagId) => ({
      ...TAGS.find((t) => t.id === tagId),
    }));
  };

  const addTag = (placeId: string, tagId: string) => {
    // fetch(`/api/places/${placeId}/tags`, {
    //   method: "POST",
    //   body: JSON.stringify({ tag }),
    // });

    setTags({
      ...tags,
      [placeId]: [...(tags[placeId] || []), tagId],
    });
  };

  const removeTag = (placeId: string, tagId: string) => {
    // fetch(`/api/places/${placeId}/tags`, {
    //   method: "DELETE",
    //   body: JSON.stringify({ tag }),
    // });

    setTags({
      ...tags,
      [placeId]: (tags[placeId] || []).filter((t) => t !== tagId),
    });
  };

  const toggleTag = (placeId: string, tagId: string) => {
    if ((tags[placeId] || []).includes(tagId)) {
      removeTag(placeId, tagId);
    } else {
      addTag(placeId, tagId);
    }
  };

  const addCheckIn = (placeId: string) => {
    setCheckIns({
      ...checkIns,
      [placeId]: true,
    });
  };

  const removeCheckIn = (placeId: string) => {
    setCheckIns({
      ...checkIns,
      [placeId]: false,
    });
  };

  const toggleCheckIn = (placeId: string) => {
    if (checkIns[placeId]) {
      removeCheckIn(placeId);
    } else {
      addCheckIn(placeId);
    }
  };

  let _data = data;

  if (data) {
    _data = {
      ...data,
      features: data.features.map((place) => ({
        ...place,
        properties: {
          ...place.properties,
          tags: _getTags(place.id),
          checkedIn: checkIns[place.id],
        },
      })),
    };
  }

  return { data: _data, error, isLoading, addTag, removeTag, toggleTag, toggleCheckIn };
}