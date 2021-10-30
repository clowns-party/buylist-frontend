import { useEffect, useState } from "react";
import { Map as MapBox, NavigationControl } from "mapbox-gl";
import styled from "styled-components";
import Head from "next/head";

const Map = () => {
  const [map, setMap] = useState<MapBox | null>(null);
  useEffect(() => {
    if (!map) {
      const currentMap = new MapBox({
        container: "element_map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40],
        zoom: 9,
        accessToken: process.env.MAPBOX_ACCESS,
      });
      currentMap.addControl(new NavigationControl());
      setMap(currentMap);
    }
  }, []);
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
