import React from "react";
import Image from "next/image";
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { ClassValue } from 'clsx';

type Props={}

export default function WeatherIcon (props: React.HTMLProps<HTMLDivElement> & {iconName:string}){
    const cn = (...inputs: ClassValue[]) => {
        return twMerge(clsx(...inputs));
    };
    return (
        <div {...props}className={cn("relative h-20 w-20")}>
            <Image width={100} height={100} alt="weather-icon" className="absolute h-full w-full" 
            src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}/>
        </div>
    )
}