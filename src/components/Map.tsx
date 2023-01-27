import { MAPBOX_API_KEY } from '@/config/api';
import { ApiPlace } from '@/pages/api/places';
import { forwardRef, RefObject, useMemo } from 'react';
import MapboxMap, { FullscreenControl, GeolocateControl, MapRef, Marker, NavigationControl } from 'react-map-gl';
import { LoadingIndicator } from './LoadingIndicator';
import Pin from './Pin';

export const Map = forwardRef(function Map({
  places,
  isLoading,
  onPinClick,
  onPinMouseEnter,
  onPinMouseLeave,
  activeItem,
  origin,
  selectedItem,
  onPopupClose,
  onCheckIn,
  onTagClick,
}: {
  places: ApiPlace[];
  isLoading: boolean;
  onPinClick: (item: ApiPlace) => void;
  onPinMouseEnter: (item: ApiPlace) => void;
  onPinMouseLeave: (item: ApiPlace) => void;
  selectedItem: ApiPlace;
  activeItem: ApiPlace;
  origin: {
    longitude: number;
    latitude: number;
  };
  onPopupClose: () => void;
  onCheckIn: (item: ApiPlace) => void;
  onTagClick: (item: ApiPlace, tagId: string) => void;
}, ref: RefObject<MapRef>) {

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
        onClose={() => {
          onPopupClose();
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
        onTagClick={(tagId) => {
          onTagClick(place, tagId);
        }}
      />
    </Marker>
  )),
    [places, activeItem, selectedItem, onPinClick, onPinMouseEnter, onPinMouseLeave, onPopupClose, onCheckIn, onTagClick]
  );

  const initialViewState = useMemo(() => ({
    zoom: 10,
    latitude: origin.latitude,
    longitude: origin.longitude,
  }), [origin]);

  return (
    <div className="w-full relative h-screen rounded-lg shadow overflow-hidden">
      <div className={`flex items-center justify-center h-full absolute bg-white/70 top-0 left-0 w-full z-10 pointer-events-none transition-all ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <LoadingIndicator />
      </div>
      <div
        className='absolute top-0 left-0 w-full h-full z-0'
      >
        <MapboxMap
          ref={ref}
          mapboxAccessToken={MAPBOX_API_KEY}
          mapStyle="mapbox://styles/mapbox/streets-v9"
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