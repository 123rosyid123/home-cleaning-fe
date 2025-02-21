'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Libraries } from '@react-google-maps/api';

const libraries: Libraries = ['places'];

interface AddressMapProps {
  address: string;
  className?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '200px',
};

const defaultCenter = {
  lat: 0,
  lng: 0,
};

export default function AddressMap({ address, className = '' }: AddressMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!address || !isLoaded) return;

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const { lat, lng } = results[0].geometry.location.toJSON();
        setLocation({ lat, lng });
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  }, [address, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`w-full h-[200px] rounded-lg overflow-hidden ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={location || defaultCenter}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </div>
  );
}