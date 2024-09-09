import React from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);
  const position = [51.505, -0.09];
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[29.7604, -95.3698]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy;{" "}
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
        contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {rooms?.map((location, index) => (
          <Marker
            key={index}
            position={[location?.latitude, location?.longitude]}
          >
            <Popup>
              <b>{location?.title}</b>
              <br />
              {location?.subtitle}
            </Popup>
          </Marker>
        ))} */}
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default Map;
