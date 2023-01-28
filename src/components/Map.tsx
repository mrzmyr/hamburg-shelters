import { MAPBOX_API_KEY } from '@/config/api';
import { IPlace } from '@/types';
import { forwardRef, RefObject, useMemo } from 'react';
import MapboxMap, { FullscreenControl, GeolocateControl, MapRef, Marker, NavigationControl } from 'react-map-gl';
import { useDarkMode } from 'usehooks-ts';
import Pin from './Pin';

export const Map = forwardRef(function Map({
  places,
  onPinClick,
  onPinMouseEnter,
  onPinMouseLeave,
  activeItem,
  origin,
  selectedItem,
  onCheckIn,
  onTagAdd,
  onTagRemove,
}: {
  places: IPlace[];
  isLoading: boolean;
  onPinClick: (item: IPlace) => void;
  onPinMouseEnter: (item: IPlace) => void;
  onPinMouseLeave: (item: IPlace) => void;
  selectedItem: IPlace;
  activeItem: IPlace;
  origin: {
    longitude: number;
    latitude: number;
  };
  onPopupClose: () => void;
  onCheckIn: (item: IPlace) => void;
  onTagAdd: (item: IPlace, tagId: string) => void;
  onTagRemove: (item: IPlace, tagId: string) => void;
}, ref: RefObject<MapRef>) {

  const { isDarkMode } = useDarkMode()

  const pins = useMemo(() => places?.map((place, index) => (
    <Marker
      key={`marker-${index}`}
      longitude={place.geometry.coordinates[0]}
      latitude={place.geometry.coordinates[1]}
      style={{
        zIndex: (
          activeItem?.id === place.id ||
          selectedItem?.id === place.id
        ) ? 999 : 0,
      }}
      anchor="bottom"
      onClick={e => {
        // If we let the click event propagates to the map, it will immediately close the popup
        // with `closeOnClick: true`
        e.originalEvent.stopPropagation();
      }}
    >
      <Pin
        item={place}
        onClick={() => {
          onPinClick(place);
        }}
        onMouseEnter={() => {
          onPinMouseEnter(place);
        }}
        onMouseLeave={() => {
          onPinMouseLeave(place);
        }}
        onCheckIn={() => {
          onCheckIn(place);
        }}
        isActive={activeItem?.id === place.id}
        isSelected={selectedItem?.id === place.id}
        onTagAdd={(tagId) => {
          onTagAdd(place, tagId);
        }}
        onTagRemove={(tagId) => {
          onTagRemove(place, tagId);
        }}
      />
    </Marker>
  )), [
    places,
    activeItem,
    selectedItem,
    onPinClick,
    onPinMouseEnter,
    onPinMouseLeave,
    onCheckIn,
    onTagAdd,
    onTagRemove
  ]);

  const initialViewState = useMemo(() => ({
    zoom: 10,
    latitude: origin.latitude,
    longitude: origin.longitude,
  }), [origin]);

  return (
    <div className="w-full relative h-screen">
      <div
        className='absolute top-0 left-0 w-full h-full z-0'
      >
        <MapboxMap
          ref={ref}
          mapboxAccessToken={MAPBOX_API_KEY}
          mapStyle={`mapbox://styles/mapbox/${isDarkMode ? 'dark' : 'streets'}-v9`}
          initialViewState={initialViewState}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          {pins}
        </MapboxMap>
      </div>
    </div>
  );
});