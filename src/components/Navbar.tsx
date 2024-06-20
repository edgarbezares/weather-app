import React from 'react';
import { RiUserLocationFill } from 'react-icons/ri';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import SearchForm from './SearchForm';
import { format, parseISO } from 'date-fns';
import { WeatherDetail } from '@/interfaces/weather';

type Props = {
  infoData: WeatherDetail | undefined;
};

export default function Navbar({ infoData }: Props) {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-[rgb(0,31,63)]'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex-1'>
          {infoData && (
            <h2 className='flex gap-1 items-end'>
              <p className='text-white'>
                {format(parseISO(infoData.dt_txt), 'EEEE')}
              </p>
              <p className='text-white'>
                - {format(parseISO(infoData.dt_txt), 'dd.MM.yy')}
              </p>
            </h2>
          )}
        </div>
        
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-white text-3xl'>Weather Project</h2>
          <TiWeatherPartlySunny className='text-white text-4xl mt-1' />
        </div>
        
        <div className='flex-1 flex justify-end'>
          <section className='flex gap-2 items-center text-white text-2xl hover:opacity-50 cursor-pointer'>
            <RiUserLocationFill />
          </section>
        </div>
        <div>
          <SearchForm></SearchForm>
        </div>
      </div>
    </nav>
  );
}
