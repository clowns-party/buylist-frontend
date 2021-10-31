import { Mark } from "./../hooks/useMark";
import { AnySourceData } from "mapbox-gl";

export const makeSourceMark = (
  marks: Mark[] | undefined
): AnySourceData | undefined => {
  if (!marks?.length) {
    return undefined;
  }
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: marks.map((mark) => makeFeature(mark)) as any,
    },
  };
};

const makeFeature = (mark: Mark) => {
  const header = mark?.content?.body || "";
  const body = mark?.content?.header || "";
  const position = mark?.position
    ? mark.position.map((c) => Number(c) || 0)
    : [0, 0];
  return {
    type: "Feature",
    properties: {
      description: `<strong>${header}</strong><p>${body}</p>`,
    },
    geometry: {
      type: "Point",
      coordinates: position,
    },
  };
};
