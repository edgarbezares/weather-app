'use client';
import Navbar from "@/components/Navbar";
import axios from "axios";
import useSWR from 'swr';
import { WeatherData } from "@/interfaces/weather";
import { format,parseISO } from "date-fns";
import Container from "@/containers/Container";
import WeatherIcon from "@/utils/WeatherIcons";
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Home() {
  const urlAPI: string = `https://api.openweathermap.org/data/2.5/forecast?q=merida,mx&appid=4dd5497406e30458fdedc2f90303b052&cnt=12`;

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
          <h2 className="text-4xl text-center flex-1 py-3">
            <p className="text-white">{data?.city.name}</p>
          </h2>
          
          <span className="flex text-6xl text-white justify-center py-3">
            {convertDegrees(infoData?.main.temp ?? undefinedTemp)}°
            </span>
            
            <div className="flex flex-col items-center text-white space-y-2">
              <p className="text-base capitalize text-center">
                <span>{infoData?.weather[0].description}</span>
                </p>
              <div className="flex justify-center space-x-4 text-sm py-2">
                <p>
                  <span>Min: </span>
                  <span>{convertDegrees(infoData?.main.temp_min ?? 0)}°</span>
                  </p>
                  <p>
                    <span>Max: </span>
                    <span>{convertDegrees(infoData?.main.temp_max ?? 0)}°</span>
                    </p>
                </div>
              </div>

            <Container className="gap-10 px-6 items-center">
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {data?.list.map((d,i)=>(
                <div key={i} className="flex flex-col justify-between gap-4
                 items-center text-xs font-semibold min-w-[100px]">
                  <p className="whitespace-nowrap text-white">{format(parseISO(d.dt_txt), "h:mm a")}</p>
                  <WeatherIcon iconName={d.weather[0].icon}className="w-16 h-16"/>
                  <p className="text-white text-xl">{convertDegrees(d?.main.temp ?? 0)}°</p>
                </div>
              ))}
            </div>
            </Container>
          </div>
        </section>
      </main>
    </div>
  );
}
