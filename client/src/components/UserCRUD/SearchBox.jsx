import React from 'react';
import { Input } from 'antd';
import { useUserContext } from '../../context/UserContext';

const { Search } = Input;

const SearchBox = () => {
    const { setFilterAndReload, filters } = useUserContext();

    const onSearch = (query) => {
        setFilterAndReload({
            ...filters,
            name: query,
        });
    };

    return (
        <Search
            placeholder="Buscar Usuarios"
            onSearch={onSearch}
            allowClear
            style={{
                width: 300,
            }}
        />
    )
};
export default SearchBox;
