import { makeSourceMark } from "../lib/index";
import { Map as MapBox, Popup } from "mapbox-gl";
import { useEffect, useState } from "react";

export interface Mark {
  position: string[] | undefined | null;
  content?: {
    header: string;
    body: string;
  };
}
const useMark = (map: MapBox | null, marks?: Mark[]) => {
  const [installed, setInstalled] = useState(false);
  const sources = makeSourceMark(marks);

  useEffect(() => {
    if (map && sources && !installed) {
      setInstalled(true);
      map.on("load", () => {
        map.addSource("places", sources);
        // Add a layer showing the places.
        map.addLayer({
          id: "places",
          type: "circle",
          source: "places",
          paint: {
            "circle-color": "#4264fb",
            "circle-radius": 6,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new Popup({
          closeButton: false,
          closeOnClick: false,
        });

        map.on("mouseenter", "places", (e) => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          // Copy coordinates array.
          const coordinates = (
            e?.features?.[0]?.geometry as any
          )?.coordinates.slice();
          const description = e?.features?.[0]?.properties?.description;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on("mouseleave", "places", () => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    }
  }, [map]);
};

export default useMark;
