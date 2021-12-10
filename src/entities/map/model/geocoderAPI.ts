import { Maybe } from "types/types.generated";

const baseEndpoint = "https://api.mapbox.com/geocoding/v5/";
const placesEndpoint = "mapbox.places/";
const access_token = `?access_token=${process.env.MAPBOX_ACCESS}`;

export const geocoderAPI = {
  getByCoordinates: async (coordinate: Maybe<string[]>) => {
    if (coordinate && coordinate?.length >= 2) {
      const query = `${coordinate[0]},${coordinate[1]}.json`;
      const url = `${baseEndpoint}${placesEndpoint}${query}${access_token}`;

      const response = await fetch(url);
      const result = await response.json();
      const place = result?.features[0].place_name as string;

      return place;
    }
    return "";
  },
};
