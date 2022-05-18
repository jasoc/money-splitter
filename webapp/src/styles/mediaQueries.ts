import { MediaQuery } from "../types";

const defaultMediaQueries: MediaQuery[] = [
  {
    name: "mobile",
    minWidth: 900,
  },
  {
    name: "desktop",
    minWidth: 3000,
  },
  {
    name: "wide",
    minWidth: 4000,
  },
];

export { defaultMediaQueries };
