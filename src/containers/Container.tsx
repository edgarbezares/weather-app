import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { ClassValue } from 'clsx';

type Props = {}

export default function Weather(props: React.HTMLProps<HTMLDivElement>) {
    const cn = (...inputs: ClassValue[]) => {
        return twMerge(clsx(...inputs));
    };

    return (
        <div 
            {...props}
            className={cn('w-full bg-[rgb(43,74,99)] border rounded-xl flex py-4 shadow-sm', props.className)}
        >
        </div>
    );
}
