

import React from 'react';
import { GoogleMap, LoadScript, Marker,  } from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


if (!apiKey) {
  throw new Error('Google Maps API key is not defined in the environment variables.');
}
const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

interface MapComponentProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat() ?? 0;
    const lng = event.latLng?.lng() ?? 0;
    onLocationSelect(lat, lng);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        onClick={handleMapClick}
        zoom={10}
        center={{ lat: 0, lng: 0 }} // You can set this to your default location if needed
      >
        {/* Optionally add a Marker or other map components */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
