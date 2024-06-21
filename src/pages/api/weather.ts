// pages/api/weather.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city, lat, lon } = req.query;
  const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

  let urlAPI = '';

  if (lat && lon) {
    urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}`;
  } else if (city) {
    urlAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKEY}&cnt=12`;
  } else {
    res.status(400).json({ error: 'City or latitude and longitude are required' });
    return;
  }

  try {
    const response = await axios.get(urlAPI);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
