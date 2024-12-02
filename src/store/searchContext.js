import { createContext, useState } from "react"

export const SearchContext = createContext(null);

const ContextSearch = ({ children }) => {
    const [searchVal, setsearch] = useState(null);
    return (
        <SearchContext.Provider value={{ searchVal, setsearch }}>
            {children}
        </SearchContext.Provider>

    )
}

export default ContextSearch