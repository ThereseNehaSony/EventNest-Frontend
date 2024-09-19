// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const defaultCenter = {
//   lat: 37.7749, // Default latitude (e.g., San Francisco)
//   lng: -122.4194 // Default longitude
// };

// const MapComponent: React.FC = () => {
//   const [selectedPosition, setSelectedPosition] = useState<google.maps.LatLngLiteral | null>(null);

//   // Handle map click to set the marker
//   const onMapClick = (event: google.maps.MapMouseEvent) => {
//     if (event.latLng) {
//       setSelectedPosition({
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       });
//     }
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyCsoVmBF71fkwMGprznArIEA6YuKsRxxsw">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={defaultCenter}
//         zoom={10}
//         onClick={onMapClick}
//       >
//         {selectedPosition && (
//           <Marker
//             position={selectedPosition}
//           />
//         )}
//       </GoogleMap>

//       {selectedPosition && (
//         <div>
//           <p>Latitude: {selectedPosition.lat}</p>
//           <p>Longitude: {selectedPosition.lng}</p>
//         </div>
//       )}
//     </LoadScript>
//   );
// };

// export default MapComponent;

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
