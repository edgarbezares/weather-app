'use client';
import Navbar from "@/components/Navbar";
import axios from "axios";
import useSWR from 'swr';
import { WeatherData } from "@/interfaces/weather";
import { format,parseISO } from "date-fns";
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Home() {
  const urlAPI: string = `https://api.openweathermap.org/data/2.5/forecast?q=merida,mx&appid=4dd5497406e30458fdedc2f90303b052`;

  const { data, error } = useSWR<WeatherData>(urlAPI, fetcher);

  const infoData=data?.list[0];

  
  if (!data) return 'Loading...';

  if (error) return 'An error has occurred';

  return (
    <div className="flex-flex-col gap-4 bg-[rgb(43,74,99)] min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p className="text-white">{format(parseISO(infoData?.dt_txt ?? ""), "EEEE")}</p>
              <p className=" text-white">- {format(parseISO(infoData?.dt_txt ?? ''), 'dd.MM.yy')}</p>
            </h2>
            <div></div>
          </div>
        </section>
      </main>
    </div>
  );
}
