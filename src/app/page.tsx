"use client";

import { useMemo, useRef, useState } from "react";
import { MapRef } from "react-map-gl";

import { IPlace } from "@/types";

import { Map } from "@/components/Map";
import { usePlaces } from "@/hooks/usePlaces";
import { Error } from "@/components/Error";
import { Credits } from "@/components/Credits";
import { Loading } from "@/components/Loading";

import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  const {
    isLoading,
    isValidating,
    data: places,
    error,
    mutate,
    toggleTag,
    toggleCheckIn,
  } = usePlaces()

  const origin = useMemo(() => ({
    longitude: 10.00604510984813,
    latitude: 53.553049693783514
  }), []);

  const mapRef = useRef<MapRef>(null);

  const [activeItem, setActiveItem] = useState<IPlace | null>(null);
  const [selectedItem, setSelectedItem] = useState<IPlace | null>(null);

  const checkIn = (item: IPlace) => {
    toggleCheckIn(item.id);
  };

  return (
    <div
      className="relative h-screen"
    >
      <div
        className="absolute right-4 top-4 z-50 flex flex-col flex-wrap items-end space-y-2"
      >
        <Credits />
        {error && !isLoading && (
          <Error
            onClick={() => {
              console.log("mutate");
              mutate();
            }}
          />
        )}
        <Loading isLoading={isValidating || isLoading} />
      </div>
      <Map
        ref={mapRef}
        origin={origin}
        places={places?.features}
        isLoading={isLoading}
        onPinClick={(item) => {
          setSelectedItem(item);
        }}
        onCheckIn={(item) => {
          checkIn(item);
        }}
        onPinMouseEnter={(item) => {
          setActiveItem(item);
        }}
        onPinMouseLeave={() => {
          setActiveItem(null);
        }}
        onPopupClose={() => {
          console.log("close");
          setSelectedItem(null);
          setActiveItem(null);
        }}
        selectedItem={selectedItem}
        activeItem={activeItem}
        onTagAdd={(item, tagId) => {
          toggleTag(item.id, tagId);
        }}
        onTagRemove={(item, tagId) => {
          toggleTag(item.id, tagId);
        }}
      />
    </div>
  );
}
