import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

function Map({ fromLatitude, fromLongitude, toLatitude, toLongitude }) {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("mapId").setView([fromLatitude, fromLongitude], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );
      mapRef.current = map;
    }

    const map = mapRef.current;

    if (fromLatitude && fromLongitude && toLatitude && toLongitude) {
      const from = L.latLng(fromLatitude, fromLongitude);
      const to = L.latLng(toLatitude, toLongitude);

      // Create a routing control only if it doesn't exist
      if (!routingControlRef.current) {
        routingControlRef.current = L.Routing.control({
          waypoints: [from, to],
          routeWhileDragging: true,
          createMarker: function (i, wp) {
            const iconUrl = i === 0 ? "/from.png" : "/to.png";
            const icon = L.icon({
              iconUrl: iconUrl,
              iconSize: [32, 32], // Customize the size if needed
              iconAnchor: [16, 32], // Customize the anchor point if needed
            });
            return L.marker(wp.latLng, {
              icon: icon,
            });
          },
        }).addTo(map);
      } else {
        // If the routing control already exists, simply set the new waypoints
        routingControlRef.current.setWaypoints([from, to]);
      }

      // Fit the map to the bounds of the markers and route
      const bounds = L.latLngBounds(from, to);
      map.fitBounds(bounds);
    }
  }, [fromLatitude, fromLongitude, toLatitude, toLongitude]);

  return (
    <div id="mapId" style={{ height: "500px", width: "100%" }}>
      {/* You can add additional CSS classes here if needed */}
      <style>{`
        #mapId {
          width: 100%;
          height: 100%;
        }
        
        /* Change text color to black */
        .leaflet-routing-container {
          color: black;
        }
      `}</style>
    </div>
  );
}

export default Map;
