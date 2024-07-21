import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SupermarketMap = () => {
  const supermarketLocation = [33.88103101630364, 35.55426121946282]; // Replace with actual coordinates

  return (
    <MapContainer
      center={supermarketLocation}
      zoom={18}
      className="w-full h-96 ml-10 mt-8 mb-8 flex items-center"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default SupermarketMap;
