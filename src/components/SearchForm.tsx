import React from "react";
import { IoSearch } from "react-icons/io5";

type Props= {};

export default function SearchForm({}:Props){
    return (
        <form className="flex relative items-center justify-center h-10">
            <input type="text" placeholder="Enter any city" 
            className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md
            focus:outline-none focus:border-blue-500 h-full"
            style={{ backgroundColor: 'rgb(0,31,63)', color: 'white' }}
            ></input>
            <button  className='px-4 py-[9px] bg-gray-500
            text-white focus:outline-none
            hover:bg-gray-600 h-full rounded-r-md'>
                <IoSearch className="text-white "></IoSearch>
            </button>
        </form>
    )
}
