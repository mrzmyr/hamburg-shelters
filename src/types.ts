export type ITag = {
  id: string
  label: string
}

export interface IPlaces {
  type: string;
  features: IPlace[];
  links: ILink[];
}

export interface IPlace {
  type: string;
  id: string;
  geometry: IGeometry;
  properties: IProperties;
  srsName: string;
}

interface IGeometry {
  type: string;
  coordinates: number[];
}

interface IProperties {
  strasse: string;
  plaetze: number;
  traeger: string;
  art: number;
  ort: string;
  haus_nr: string;
  checkedIn?: boolean;
  tags?: ITag[];
}

interface ILink {
  href: string;
  rel: string;
  type: string;
  title: string;
}