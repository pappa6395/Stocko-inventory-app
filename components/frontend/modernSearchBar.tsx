import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchProduct } from "@/type/types";

export default function ModernSearchBar({
  products,
}: {
  products: SearchProduct[];
}) {
    
    const router = useRouter();
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
    const searchProducts = searchResults.filter((item) => item.type === "prod");
    const searchCategories = searchResults.filter((item) => item.type === "cate");
    const searchBrands = searchResults.filter((item) => item.type === "brand");
    const [query, setQuery] = useState("");
  
    function onSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchResults([]);
        const searchTerm = e.target.value.toLowerCase();
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }
        const filteredData = products.filter((item) =>
            Object.values(item).some(
            (value: any) =>
                value &&
                value.toString().toLowerCase().includes(e.target.value.toLowerCase())
            )
        );

        setSearchResults(filteredData);
        setQuery(searchTerm);
    }

    const handleButtonClick = async () => {
        console.log(query);
        if (!query) {
            return;
        }
        startTransition(() => {
            router.push(`/search?query=${query}`);
            setQuery(""); // Clear input manually
            setSearchResults([]);
            setShowSuggestion(false);
        });
        
    }

    const handleReset = () => {
        setQuery("");
        setShowSuggestion(false);
        setSearchResults([]);
    }

  return (
    <div>
      <div className="relative w-full z-50 group">
        <div className="relative w-full">
          <input
            onChange={onSearch}
            value={query}
            type="search"
            id="location-search"
            className="peer block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm 
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
            focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 p-2.5  
            z-20 text-sm  bg-gray-50 rounded-e-lg   border-gray-300   
            dark:bg-gray-700 dark:border-s-gray-700 focus:shadow-lg  
            dark:placeholder-gray-400 dark:text-white "
            placeholder="Search for products..."
            required
          />
          <button
            onClick={handleButtonClick}
            type="button"
            className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white 
            rounded-e-lg border border-sky-500 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-sky-600 
            dark:hover:bg-sky-700 dark:focus:ring-sky-800 bg-gradient-to-r from-sky-500 to-white
            active:scale-90  hover:bg-accent hover:text-accent-foreground"
          >
            <Search className="w-4 h-4" />

            <span className="sr-only">Search</span>
          </button>
        </div>
        {searchResults && searchResults.length > 0 && (
          <div className="absolute mt-2 w-full overflow-hidden rounded-md bg-white border shadow-lg  ">
            {/* <h2 className="py-2 bg-slate-100 px-3 uppercase font-semibold">
              Suggestions
            </h2>
            <div className="py-2 space-y-1 flex flex-col px-3 text-sm">
              <Link href={"#"}>Laptop</Link>
              <Link href={"#"}>Laptop Power</Link>
              <Link href={"#"}>Laptop Table</Link>
            </div> */}
            {searchProducts && searchProducts.length > 0 && (
              <div className="">
                <h2 className="py-2 bg-slate-100 px-3 uppercase font-semibold">
                  Products
                </h2>
                {searchProducts.map((product) => {
                  return (
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => handleReset()}
                      key={product.slug}
                      className="cursor-pointer py-2 px-3 hover:bg-slate-100 flex items-center"
                    >
                      <Image
                        src={product.productThumbnail}
                        width={300}
                        height={300}
                        alt="watch"
                        className="w-10 h-10 rounded-lg"
                      />
                      <p className="text-sm text-gray-600 pl-2">{product.name}</p>
                    </Link>
                  );
                })}
              </div>
            )}
            {searchCategories && searchCategories.length > 0 && (
              <div className="">
                <h2 className="py-2 bg-slate-100 px-3 uppercase font-semibold">
                  Categories
                </h2>
                {searchCategories.map((product) => {
                  return (
                    <Link
                      href={`/categories/${product.slug}?type=cat`}
                      onClick={() => handleReset()}
                      key={product.slug}
                      className="cursor-pointer py-2 px-3 hover:bg-slate-100 flex items-center"
                    >
                      <Image
                        src={product.productThumbnail}
                        width={300}
                        height={300}
                        alt="watch"
                        className="w-10 h-10 rounded-lg"
                      />
                      <p className="text-sm text-gray-600 pl-2">{product.name}</p>
                    </Link>
                  );
                })}
              </div>
            )}
            {searchBrands && searchBrands.length > 0 && (
              <div className="">
                <h2 className="py-2 bg-slate-100 px-3 uppercase font-semibold">
                  Brands
                </h2>
                {searchBrands.map((product) => {
                  return (
                    <Link
                      href={`/brands/${product.slug}?id=${product?.id}`}
                      onClick={() => handleReset()}
                      key={product.slug}
                      className="cursor-pointer py-2 px-3 hover:bg-slate-100 flex items-center"
                    >
                      <Image
                        src={product.productThumbnail}
                        width={300}
                        height={300}
                        alt="watch"
                        className="w-10 h-10 rounded-lg object-contain"
                      />
                      <p className="text-sm text-gray-600 pl-2">{product.name}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
