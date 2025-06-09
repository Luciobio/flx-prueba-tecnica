import { React, useRef } from 'react';
import { Input } from 'antd';
import { useUserContext } from '../../context/UserContext';

const { Search } = Input;

// Función debounce para evitar múltiples llamadas a la API
    const debounce = (fx, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fx(...args);
            }, delay);
        };
    }; 

const SearchBox = () => {
    const { setFilterAndReload, filters } = useUserContext();

    const debounceRef = useRef(
        debounce((query) => {
            setFilterAndReload({
                ...filters,
                name: query,
            });
        }, 500)
    );
    
    const handleChange = (e) => {
        const query = e.target.value;
        debounceRef.current(query);
    };

    return (
        <Search
            placeholder="Buscar Usuarios"
            onChange={handleChange}
            allowClear
            style={{
                width: 300,
            }}
        />
    )
};
export default SearchBox;
