'use client';
import Navbar from "@/components/Navbar";
import axios from "axios";
import useSWR from 'swr';
import { WeatherData } from "@/interfaces/weather";
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Home() {
  const urlAPI: string = `https://api.openweathermap.org/data/2.5/forecast?q=merida,mx&appid=4dd5497406e30458fdedc2f90303b052`;

  const { data, error } = useSWR<WeatherData>(urlAPI, fetcher);

  console.log("data",data);
  
  if (!data) return 'Loading...';

  if (error) return 'An error has occurred';

  return (
    <div className="flex-flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
    </div>
  );
}
