'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import { WeatherData } from '@/interfaces/weather';
import { format, parseISO } from 'date-fns';
import Container from '@/containers/Container';
import WeatherIcon from '@/utils/WeatherIcons';
import Notification from '@/components/Notification';

const undefinedTemp = 296.37;

const convertDegrees = (tempKelvin: number): number => {
  const kelvinDegree = 273.15;
  const tempCelsius = tempKelvin - kelvinDegree;
  return Math.floor(tempCelsius);
};

type HomeProps = {
  initialData: WeatherData;
  initialCity: string;
};

export default function Home({ initialData, initialCity }: HomeProps) {
  const [city, setCity] = useState(initialCity);
  const [searchCity, setSearchCity] = useState(initialCity);
  const [error, setError] = useState('');
  const [data, setData] = useState<WeatherData | null>(initialData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (value: string) => {
    setCity(value);
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.length > 0) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/weather?city=${city}`);
        setSearchCity(city);
        setData(response.data);
        setError('');
      } catch (error) {
        setError("Location not found");
        setTimeout(() => {
          setError('');
        }, 1000);  
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter a location");
      setTimeout(() => {
        setError('');
      }, 1000); 
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`/api/weather?lat=${latitude}&lon=${longitude}`);
          const cityName = response.data.name;
          setCity(cityName);
          setSearchCity(cityName);

          const forecastResponse = await axios.get(`/api/weather?city=${cityName}`);
          setData(forecastResponse.data);
          setError('');
        } catch (error) {
          setError("Location not found");
          setTimeout(() => {
            setError('');
          }, 3000);  
        }
      }, () => {
        setError("Unable to retrieve location");
        setTimeout(() => {
          setError('');
        }, 3000);
      });
    } else {
      setError("Geolocation not supported by this browser");
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const infoData = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-[rgb(43,74,99)] min-h-screen">
      <Navbar
        city={city}
        onInputChange={handleInputChange}
        onSubmitSearch={handleSubmitSearch}
        onGetLocation={handleGetLocation}
      />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {error && (
          <Notification message={error} onClose={() => setError('')} />
        )}
        {loading ? (
          'Loading...'
        ) : (
          <section>
            <div className="space-y-2">
              <div>
                <h2 className="text-4xl flex-1 py-3">
                  <p className="text-white text-center">{data?.city.name}</p>
                </h2>

                <div className="flex items-center justify-between py-1">
                  <span className="text-6xl text-white">
                    {convertDegrees(infoData?.main.temp ?? undefinedTemp)}° 
                  </span>
                  {infoData?.weather[0].icon && (
                    <WeatherIcon
                      iconName={infoData.weather[0].icon}
                      style={{ width: "10rem", height: "10rem"}}
                    />
                  )}
                </div>

                <div className="flex flex-col text-white space-y-1">
                  <p className="">Feels like {convertDegrees(infoData?.main.feels_like ?? 0)}° C</p>
                  <p className="text-xl capitalize">
                    <span>{infoData?.weather[0].description}</span>
                  </p>

                  <div className="flex items-center justify-between py-7">
                    <div className="flex space-x-4 text-sm">
                      <p>
                        <span>Min: </span>
                        <span>{convertDegrees(infoData?.main.temp_min ?? 0)}°</span>
                      </p>
                      <p>
                        <span>Max: </span>
                        <span>{convertDegrees(infoData?.main.temp_max ?? 0)}°</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <p>{format(parseISO(infoData?.dt_txt ?? ''), 'EEEE')}</p>
                      <p className="text-lg">- {format(parseISO(infoData?.dt_txt ?? ''), 'dd.MM.yy')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <Container className="gap-10 px-6 items-center border rounded-xl py-2">
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data?.list.map((d, i) => (
                    <div
                      key={i}
                      className={`flex flex-col justify-between gap-4 items-center text-xs font-semibold min-w-[100px] border-r border-gray-300 ${i === data.list.length - 1 ? 'border-r-0' : ''}`}
                    >
                      <p className="whitespace-nowrap text-white">{format(parseISO(d.dt_txt), "h:mm a")}</p>
                      <WeatherIcon iconName={d.weather[0].icon} className="w-16 h-16" />
                      <p className="text-white text-xl">{convertDegrees(d?.main.temp ?? 0)}°</p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}