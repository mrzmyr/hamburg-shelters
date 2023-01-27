"use client";

import { Map } from "@/components/Map";
import { usePlaces } from "@/hooks/usePlaces";
import { ApiPlace } from "@/pages/api/places";
import { Github } from "lucide-react";
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
      <div
        className="absolute right-4 top-4 z-50 flex flex-col flex-wrap items-end space-y-2"
      >
        <div
          role="banner"
          className="bg-white rounded-lg shadow px-3 py-2"
        >
          {/* Credits */}
          <div className="text-md text-gray-800">
            <a
              href="https://github.com/mrzmyr/hamburg-shelters"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-800 hover:text-gray-900"
            >
              <Github size={17} className="mr-1" />
              GitHub
            </a>
          </div>
        </div>
        {error && (
          <div className="bg-red-100 border-red-400 text-red-700 px-3 py-2 mt-2 rounded max-w-md" role="alert">
            <strong className="font-bold">Something went wrong while fetching the places. Please reload the page. 🙏</strong>
          </div>
        )}
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
