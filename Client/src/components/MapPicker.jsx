import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

const MapPicker = ({ onSelect }) => {
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onSelect({ lat, lng });
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "300px", borderRadius: "12px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;