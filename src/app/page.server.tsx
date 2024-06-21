import React from 'react';
import axios from 'axios';
import { WeatherData } from '@/interfaces/weather';
import Home from './page.client';

type ServerProps = {
  initialData: WeatherData;
  initialCity: string;
};

export default async function PageServer() {
  const city = 'Mexico City';

  try {
    const response = await axios.get(
      `http://localhost:3000/api/weather?city=${city}`
    );
    const initialData = response.data;
    return <Home initialData={initialData} initialCity={city} />;
  } catch (error) {
    console.error('Failed to fetch data on server side:', error);
    return <div>Failed to load weather data</div>;
  }
}
