// src/app/page.server.tsx
import React from 'react';
import axios from 'axios';
import { WeatherData } from '@/interfaces/weather';
import Home from './page.client';

type ServerProps = {
  initialData: WeatherData;
  initialCity: string;
};

export default async function PageServer() {
  const apiKEY = process.env.NEXT_PUBLIC_API_KEY;
  const city = 'Monterrey';
  const urlAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKEY}&cnt=12`;

  const response = await axios.get(urlAPI);
  const initialData = response.data;

  return <Home initialData={initialData} initialCity={city} />;
}
