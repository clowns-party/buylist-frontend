import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import useMark, { Mark } from "entities/hooks/useMark";
import { LngLatLike, Map as MapBox, NavigationControl } from "mapbox-gl";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  mapRef?: React.MutableRefObject<MapBox | null>;
  withGeoCoder?: boolean;
  withControl?: boolean;
  center?: LngLatLike;
  marks?: Mark[];
};
const Map: FC<Props> = ({
  mapRef,
  withControl = true,
  withGeoCoder,
  center,
  marks,
}) => {
  const [map, setMap] = useState<MapBox | null>(null);
  useEffect(() => {
    if (!map) {
      const currentMap = new MapBox({
        container: "element_map",
        style: "mapbox://styles/mapbox/streets-v11",
        center,
        zoom: 9,
        accessToken: process.env.MAPBOX_ACCESS,
      });
      if (withControl) {
        currentMap.addControl(new NavigationControl());
      }
      if (withGeoCoder) {
        currentMap.addControl(
          new MapboxGeocoder({
            accessToken: process.env.MAPBOX_ACCESS as string,
          })
        );
      }

      setMap(currentMap);
      if (mapRef) {
        mapRef.current = currentMap;
      }
    }
  }, []);
  useMark(map, marks);
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.5.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Container id="element_map"></Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 279px;
  display: block;
`;

export default Map;
