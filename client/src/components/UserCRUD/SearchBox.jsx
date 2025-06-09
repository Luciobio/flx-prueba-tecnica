/* eslint-disable react/prop-types */
import { React, useState, useEffect, useRef } from 'react';
import { Input } from 'antd';

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

const SearchBox = ({ value, onChange }) => {
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const debounceRef = useRef(
        debounce((query) => {
            onChange(query);
        }, 500)
    );

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        debounceRef.current(newValue);
    };

    return (
        <Search
            placeholder="Buscar Usuarios"
            value={inputValue}
            onChange={handleChange}
            allowClear
            style={{
                width: 300,
            }}
        />
    )
};
export default SearchBox;
