import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchFilter() {
  return (
    <div className="md:flex gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2">
        <AiOutlineSearch className="w-6 h-6" />
        <input
          type="search"
          placeholder="음식점 검색"
          className="block w-full p-3 text-sm text-gray-300 rounded-lg bg-gray-50 outline-none border focus:border-blue-500"
        />
      </div>
      <select className="bg-gray-50 border text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-blue-500 outline-none block w-full p-3">
        <option>지역 선택</option>
      </select>
    </div>
  );
}