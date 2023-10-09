import { FormEvent, RefObject } from 'react'

interface SearchFormProps {
    handleSearchCity: (event: FormEvent) => void,
    searchValue: string,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    inputRef: RefObject<HTMLInputElement>
}

/**
 * Search bar where city name must be given as an input by the user
 */

export default function SearchForm({ handleSearchCity, searchValue, handleInputChange, inputRef }: SearchFormProps) {
    return <>
    <form className="flex rounded-md bg-[var(--slate-100-50)] backdrop-blur-md h-fit" onSubmit={(event) => handleSearchCity(event)}>
            <input 
            type="search" 
            className="text-lg text-[var(--slate-700)] placeholder:text-[var(--slate-600)] bg-transparent m-0 font-normal py-2 px-4 w-full focus:outline-input search-form"
            placeholder="Search city..."
            value={searchValue}
            onChange={handleInputChange}
            ref={inputRef}
            />
            <button className="flex items-center p-2" type="submit" ><span className="material-symbols-outlined text-[var(--slate-700)] text-3xl" >search</span></button>
        </form>
    </>
}