"use client";

import { Map } from "@/components/Map";
import { usePlaces } from "@/hooks/usePlaces";
import { ApiPlace } from "@/pages/api/places";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useRef, useState } from "react";
import { MapRef } from "react-map-gl";

export default function Home() {
  const {
    isLoading,
    data: places,
    error,
    toggleTag,
    toggleCheckIn,
  } = usePlaces()

  const origin = useMemo(() => ({
    longitude: 10.00604510984813,
    latitude: 53.553049693783514
  }), []);

  const mapRef = useRef<MapRef>(null);

  const [activeItem, setActiveItem] = useState<ApiPlace | null>(null);
  const [selectedItem, setSelectedItem] = useState<ApiPlace | null>(null);

  const checkIn = (item: ApiPlace) => {
    toggleCheckIn(item.id);
  };

  return (
    <div
      className="relative h-screen"
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute right-4 top-4 z-50" role="alert">
          <strong className="font-bold">Something went wrong while fetching the places!</strong>
          <pre className="block sm:inline">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
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
          // setActiveItem(null)
        }}
        onPopupClose={() => {
          console.log("close");
          setSelectedItem(null);
          setActiveItem(null);
        }}
        selectedItem={selectedItem}
        activeItem={activeItem}
        onTagAdd={(item, tagId) => {
          console.log("tag click", item, tagId);
          toggleTag(item.id, tagId);
        }}
        onTagRemove={(item, tagId) => {
          console.log("tag click", item, tagId);
          toggleTag(item.id, tagId);
        }}
      />
    </div>
  );
}
