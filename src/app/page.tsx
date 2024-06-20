'use client';
import Navbar from "@/components/Navbar";
import axios from "axios";
import useSWR from 'swr';
import { WeatherData } from "@/interfaces/weather";
import { format,parseISO } from "date-fns";
import Container from "@/containers/Container";
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Home() {
  const urlAPI: string = `https://api.openweathermap.org/data/2.5/forecast?q=merida,mx&appid=4dd5497406e30458fdedc2f90303b052`;

  const undefinedTemp:number= 296.37;

  const convertDegrees = (tempKelvin: number): number => {
    const kelvinDegree = 273.15;
    const tempCelsius = tempKelvin - kelvinDegree;
    return Math.floor(tempCelsius);
  };

  const { data, error } = useSWR<WeatherData>(urlAPI, fetcher);

  const infoData=data?.list[0];

  
  if (!data) return 'Loading...';

  if (error) return 'An error has occurred';

  return (
    <div className="flex-flex-col gap-4 bg-[rgb(43,74,99)] min-h-screen">
      <Navbar infoData={infoData}/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section>
          <div>
            
            <h2 className="text-4xl text-center flex-1 py-7">
              <p className=" text-white">{data?.city.name}</p>
            </h2>
          
          <span className="flex text-5xl text-white justify-center ">
              {convertDegrees(infoData?.main.temp ?? undefinedTemp)}°
              </span>
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
              
              </div>
            </Container>
          </div>
        </section>
      </main>
    </div>
  );
}
