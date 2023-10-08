import { FormEvent } from 'react'

interface SearchFormProps {
    handleSearchCity: (event: FormEvent) => void,
    searchValue: string,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * Search bar where city name must be given as an input by the user
 */

export default function SearchForm({ handleSearchCity, searchValue, handleInputChange }: SearchFormProps) {
    return <>
    <form className="flex rounded-md bg-[var(--slate-100-50)] backdrop-blur-md h-fit" onSubmit={(event) => handleSearchCity(event)}>
            <input 
            type="search" 
            className="text-lg text-[var(--slate-700)] placeholder:text-[var(--slate-600)] bg-transparent m-0 font-normal py-2 px-4 w-full focus:outline-input"
            placeholder="Search city..."
            value={searchValue}
            onChange={handleInputChange}
            />
            <button className="flex items-center p-2" type="submit" ><span className="material-symbols-outlined text-[var(--slate-700)] text-3xl" >search</span></button>
        </form>
    </>
}