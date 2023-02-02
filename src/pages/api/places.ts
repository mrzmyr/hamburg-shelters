import fetch from 'node-fetch';

import { PLACES_URL } from '@/config/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = {
    limit: '1000',
    f: 'json',
  }

  const url = new URL(PLACES_URL)
  url.search = new URLSearchParams(query).toString()

  const response = await fetch(url.toString())
  const data = await response.json()

  res.status(200).json(data)
}
