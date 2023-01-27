import fetch from 'node-fetch';

import { PLACES_URL } from '@/config/api';
import { ITag } from '@/config/tags';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ApiPlaces {
  type: string;
  features: ApiPlace[];
  links: ApiLink[];
}

export interface ApiPlace {
  type: string;
  id: string;
  geometry: ApiGeometry;
  properties: ApiProperties;
  srsName: string;
}

interface ApiGeometry {
  type: string;
  coordinates: number[];
}

interface ApiProperties {
  strasse: string;
  plaetze: number;
  traeger: string;
  art: number;
  ort: string;
  haus_nr: string;
  checkedIn?: boolean;
  tags?: ITag[];
}

interface ApiLink {
  href: string;
  rel: string;
  type: string;
  title: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = {
    limit: '1000',
  }

  const url = new URL(PLACES_URL)
  url.search = new URLSearchParams(query).toString()

  const response = await fetch(url.toString())
  const data = await response.json()

  res.status(200).json(data)
}
