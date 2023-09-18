import React, {useEffect} from "react";

import useDebounce from "../../hooks/useDebounce.js";


import {Input} from 'antd';

const {Search} = Input;

const SearchField = ({placeholder, onSearch, className = ''}) => {
    const [query, setQuery] = React.useState('');
    const debouncedQuery = useDebounce(query, 300)

    useEffect(() => {
        onSearch(debouncedQuery)
    }, [debouncedQuery, onSearch])


    return <div className={className}>
        <Search
            placeholder={placeholder}
            size="large"
            allowClear
            onSearch={(value) => {
                setQuery(value)
            }}
            onChange={(e) => {
                setQuery(e.target.value);
            }}
            value={query}

        />
    </div>
}

export default SearchField;