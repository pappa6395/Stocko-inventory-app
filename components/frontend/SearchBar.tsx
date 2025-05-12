import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import SubmitButton from '../global/FormInputs/SubmitButton';



const SearchBar = () => {

    const [query, setQuery] = React.useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    function handleSearch (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            router.push(`/search?query=${query}`)
            setQuery("")
            setIsLoading(false);
        } catch (err) {
            console.error("Failed to search:", err);
            setIsLoading(false);
            return;
        }
        
    }

  return (

    <div className='hidden sm:block w-full'>
        <form onSubmit={handleSearch} >
            <div className='relative'>
                <div className="flex flex-1 items-center">
                    <input 
                        type="search" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search here...' 
                        required 
                        className="block w-full rounded-md bg-white px-3 ps-10 
                        py-1.5 text-base text-gray-900 outline outline-1 
                        -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                        focus:outline focus:outline-2 focus:-outline-offset-2 
                        focus:outline-indigo-600 sm:text-sm/6" 
                    />
                    <Search className="absolute inset-x-2 top-1.5
                        w-6 h-6 text-gray-500 dark:text-gray-400"/>
                    <SubmitButton
                        title='Search' 
                        loading={isLoading}
                        loadingTitle={isLoading ? 'Loading...' : 'Search'}
                        variant="shop"
                        size={"sm"}
                        className='absolute end-0.5 top-0.5'
                    />
                </div>
            </div>
        </form>
    </div>
    

  )
}

export default SearchBar