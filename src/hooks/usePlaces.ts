import { TAGS } from './../config/tags';
import { useLocalStorage } from 'usehooks-ts';
import useSWR from "swr";
import { IPlaces } from '@/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePlaces = () => {
  const [tags, setTags] = useLocalStorage("tags", {})
  const [checkIns, setCheckIns] = useLocalStorage("checkIns", {})

  const { data, error, isLoading, isValidating, mutate } = useSWR<IPlaces>(
    "/api/places",
    fetcher
  );

  const _getTags = (placeId: string) => {
    return (tags[placeId] || []).map((tagId) => ({
      ...TAGS.find((t) => t.id === tagId),
    }));
  };



  const addTag = (placeId: string, tagId: string) => {
    setTags({
      ...tags,
      [placeId]: [...(tags[placeId] || []), tagId],
    });
  };

  const removeTag = (placeId: string, tagId: string) => {
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

  return {
    data: _data,
    error,
    mutate,
    isLoading,
    isValidating,
    toggleTag,
    toggleCheckIn
  };
}
