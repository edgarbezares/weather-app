import React from 'react';
import axios from 'axios';
import Home from './page.client';

export default async function PageServer() {
  const city = 'Mexico City';
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await axios.get(
      `${baseUrl}/api/weather?city=${city}`
    );
    const initialData = response.data;
    return <Home initialData={initialData} initialCity={city} />;
  } catch (error) {
    console.error('Failed to fetch data on server side:', error);
    return <div>Failed to load weather data</div>;
  }
}
