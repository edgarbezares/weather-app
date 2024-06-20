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

    console.log("data",data)
  
  if (!data) return 'Loading...';

  if (error) return 'An error has occurred';

  return (
    <div className="flex flex-col gap-4 bg-[rgb(43,74,99)] min-h-screen">
      <Navbar infoData={infoData}/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section>
        <div className="space-y-2">  
          <div>
          <h2 className="text-4xl  flex-1 py-3">
            <p className="text-white text-center">{data?.city.name}</p>
          </h2>
          
          <div className="flex items-center justify-between py-1">
            <span className="text-6xl text-white">
              {convertDegrees(infoData?.main.temp ?? undefinedTemp)}° C
            </span>
            {infoData?.weather[0].icon && (
              <WeatherIcon 
                iconName={infoData.weather[0].icon}
                style={{ width: "10rem", height: "10rem", marginRight: "8rem"}} />
              )}
          </div>
            
            <div className="flex flex-col text-white space-y-1">
              <p className="">Feels like {  convertDegrees(infoData?.main.feels_like ?? 0)}° C
              </p>

              <p className="text-xl capitalize ">
                <span>{infoData?.weather[0].description}</span>
              </p>

                <div className="flex items-center justify-between py-7">
                  <div className="flex space-x-4 text-sm">
                    <p><span>Min: </span>
                    <span>{convertDegrees(infoData?.main.temp_min ?? 0)}°</span>
                    </p>
                    <p>
                      <span>Max: </span>
                      <span>{convertDegrees(infoData?.main.temp_max ?? 0)}°</span>
                      </p>
                      </div>
                      <div className="flex space-x-2" style={{marginRight:"8rem"}}>
                        <p>{format(parseISO(infoData?.dt_txt ?? ''), 'EEEE')}</p>
                        <p className="text-lg">- {format(parseISO(infoData?.dt_txt ?? ''), 'dd.MM.yy')}</p>
                        </div>
                      </div>
                    </div>
              </div>
              <Container className="gap-10 px-6 items-center border rounded-xl py-2">
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((d,i)=>(
                <div 
                key={i} 
                className={`flex flex-col justify-between gap-4 items-center text-xs font-semibold min-w-[100px] border-r border-gray-300 ${i === data.list.length - 1 ? 'border-r-0' : ''}`}
              >
                  <p className="whitespace-nowrap text-white">{format(parseISO(d.dt_txt), "h:mm a")}</p>
                  <WeatherIcon iconName={d.weather[0].icon}className="w-16 h-16"/>
                  <p className="text-white text-xl">{convertDegrees(d?.main.temp ?? 0)}°</p>
                </div>
              ))}
            </div>
            </Container>
          </div>
          
          {/* <div className="flex gap-4 mt-4">
          <Container className="w-fit justify-center flex-col px-10 items-center">
            <p className="capitalize text-center text-white">{infoData?.weather[0].description}</p>
            <WeatherIcon iconName={infoData?.weather[0].icon ?? ""}/>
          </Container>
        </div> */}
        </section>
      </main>
    </div>
  );
}
