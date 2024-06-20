import React from 'react';
import { RiUserLocationFill } from 'react-icons/ri';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import SearchForm from './SearchForm';
import { format, parseISO } from 'date-fns';
import { WeatherDetail } from '@/interfaces/weather';

type NavbarProps = {
        city: string;
        onInputChange: (value: string) => void;
        onSubmitSearch: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Navbar({ city, onInputChange, onSubmitSearch }: NavbarProps) {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-[rgb(0,31,63)]'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
      <h2 className='flex gap-1 items-end'>
        <div className='flex-1 flex justify-end'>
          <section className='flex gap-2 items-center text-white text-2xl hover:opacity-50 cursor-pointer'>
            <RiUserLocationFill />
          </section>
        </div>
        <div>
        <SearchForm value={city} onChange={(e) => onInputChange(e.target.value)} onSubmit={onSubmitSearch} />
        </div>
        </h2>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-white text-3xl'>Weather React App</h2>
          <TiWeatherPartlySunny className='text-white text-4xl mt-1' />
        </div>
      </div>
    </nav>
  );
}
