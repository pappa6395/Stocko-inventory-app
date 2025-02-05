
import { Products } from "@prisma/client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
 
export default function SearchItems({
  allProducts,
  onSearch
}: {
  allProducts: Products[];
  onSearch: any;
}) {
  const [searchTerm, setSearchTerm] = useState("");
 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filteredData = allProducts.filter((item: any) =>
      Object.values(item).some(
        (value: any) =>
          value &&
          value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    onSearch(filteredData);
  }
    
  
  return (

      <div className="">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="text-slate-300 w-4 h-4" />
          </div>
          <input
            id="search"
            name="search"
            type="text"
            autoComplete="search"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-8"
          />
        </div>
      </div>

  );
}
