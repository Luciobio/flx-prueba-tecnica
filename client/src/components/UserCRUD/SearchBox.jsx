/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback'; // Asegúrate de que esta ruta sea correcta
const { Search } = Input;

const SearchBox = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const debouncedOnChange = useDebouncedCallback(onChange, 500);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <Search
      placeholder="Buscar Usuarios"
      value={inputValue}
      onChange={handleChange}
      allowClear
      style={{ width: 300 }}
    />
  );
};

export default SearchBox;
