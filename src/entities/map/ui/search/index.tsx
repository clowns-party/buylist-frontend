import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { geocoderAPI } from "entities/map/model";
import { FC, useEffect, useRef, useState } from "react";
import { Input } from "shared/ui";
import styled from "styled-components";
import { Maybe } from "types/types.generated";

type Props = {
  changeGeo?: (value: string[]) => void;
  coordinate?: Maybe<string[]> | undefined;
};
const SearchGeo: FC<Props> = ({ changeGeo, coordinate }) => {
  const input = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapboxGeocoder | null>(null);

  useEffect(() => {
    if (!map && input?.current?.id) {
      const geocoder = new MapboxGeocoder({
        accessToken: process.env.MAPBOX_ACCESS as string,
        // types: "country,region,place,postcode,locality,neighborhood",
      });

      geocoder?.addTo(`#${input.current.id}`);

      // Add geocoder result to container.
      geocoder?.on("result", (event) => {
        const position = event.result.center?.map(
          (geo: number) => `${geo}`
        ) as string[];
        changeGeo?.(position);
      });

      // Clear results container when search is cleared.
      geocoder?.on("clear", () => {
        // ?
      });

      // Customize original input
      const searchElement = document.getElementsByClassName(
        "mapboxgl-ctrl-geocoder--input"
      )[0];
      searchElement.className = Input.VariantClasses.Base;

      setMap(geocoder);

      (async () => {
        if (coordinate?.length) {
          const result = await geocoderAPI.getByCoordinates(coordinate);
          geocoder.setInput(result);
        }
      })();
    }
  }, []);

  return (
    <Container>
      <div id="geocoder_input" ref={input}></div>
    </Container>
  );
};

const Container = styled.div`
  svg {
    display: none;
  }
  .mapboxgl-ctrl-geocoder {
    min-width: 100%;
  }
`;

export default SearchGeo;
