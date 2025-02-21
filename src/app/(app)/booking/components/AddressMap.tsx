'use client';

import { GoogleMap, Marker, useLoadScript, Libraries } from '@react-google-maps/api';

const libraries: Libraries = ['places'];

interface AddressMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '200px',
};

export default function AddressMap({ latitude, longitude, className = '' }: AddressMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const location = {
    lat: latitude,
    lng: longitude
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`w-full h-[200px] rounded-lg overflow-hidden ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={location}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
}