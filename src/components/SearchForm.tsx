import React from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchForm(props: Props) {
  return (
    <form onSubmit={props.onSubmit} className="flex relative items-center justify-center h-10">
      <input
        onChange={props.onChange}
        value={props.value}
        type="text"
        placeholder="Enter a location"
        className="px-4 py-2 w-[230px] border border-gray-300 focus:outline-none focus:border-blue-500 h-full"
        style={{ backgroundColor: 'rgb(0,31,63)', color: 'white' }}
      />
      <button type="submit" className="px-4 py-[9px] bg-gray-500 text-white focus:outline-none hover:bg-gray-600 h-full">
        <IoSearch className="text-white " />
      </button>
    </form>
  );
}
