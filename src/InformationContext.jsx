import { createContext } from "react";
import builderImage from "./assets/builder.svg";
import dogImage from "./assets/dog.svg";
import landscapeImage from "./assets/landscape.svg";
import measureImage from "./assets/measure.svg";
import programmingImage from "./assets/programming.svg";
import serverImage from "./assets/server.svg";
import solarImage from "./assets/solar-panel.svg";

const DOORS = [
  {
    iconImage: dogImage,
    icon: "WE",
    name: "Technik weterynarii",
    url: "/weterynaria",
    color: "#80DE9C",
    videoId: "wHblUPGnFoM",
    fortuneWheel: {
      entries: [
        ...Array(20)
          .keys()
          .map((v) => v + 1),
      ],
    },
  },
  {
    iconImage: programmingImage,
    icon: "I/P",
    name: "Technik programista",
    videoId: "EgngOOEy2Ho",
    url: "/programista",
    color: "#07BFD7",
  },
  {
    iconImage: serverImage,
    icon: "I/P",
    name: "Technik informatyk",
    url: "/informatyk",
    videoId: "5icGbGvVXLY",
    color: "#07BFD7",
  },
  {
    icon: "E/G",
    iconImage: measureImage,
    name: "Technik geodeta",
    videoId: "m7PO-9VADg8",
    secondaryVideoId: "fOLgjGQcOQk",
    url: "/geodeta",
    color: "#FDE54B",
  },
  {
    iconImage: builderImage,
    icon: "BB",
    name: "Technik budownictwa",
    url: "/budownictwa",
    secondaryVideoId: "vYeMbntW8IU",
    videoId: "ujteXRw6ZnI",
    color: "#F9B051",
  },
  {
    icon: "AA",
    iconImage: landscapeImage,
    name: "Technik architektury krajobrazu",
    url: "/architektura",
    videoId: "3FGq5XcDTVw",
    color: "#FDE54B",
  },
  {
    iconImage: solarImage,
    icon: "E/G",
    name: "Technik urządzeń i systemów energetyki odnawialnej",
    videoId: "pmgA7vUgkRc",
    url: "/energia",
    color: "#80DE9C",
  },
]
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

const getByUrl = (target) => {
  return DOORS.filter((value) => value.url === `/${target}`)[0];
};

const contextValue = { DOORS, getByUrl };
export const InformationContext = createContext(contextValue);
export default function InformationContextProvider({ children }) {
  return (
    <InformationContext.Provider value={contextValue}>
      {children}
    </InformationContext.Provider>
  );
}
