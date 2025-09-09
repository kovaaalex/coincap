import { useState } from "react";
import styles from './InputSearch.module.css';
import type { SearchInputProps } from "../../types/search.types";

const SearchInput: React.FC<SearchInputProps> = ({
    onSearch, 
    placeholder, 
    isLoading = false, 
}) => {
    const [inputValue, setInputValue] = useState("");
    const handleSearch = () => {
        onSearch(inputValue.trim());
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    return (
        <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={styles.searchInput}
                    disabled={isLoading}
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className={styles.searchButton}
                    disabled={isLoading}
                    aria-label="Search"
                >
                    Search
                </button>
        </div>
    );
};

export default SearchInput;