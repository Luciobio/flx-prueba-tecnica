import React from 'react';
import { Select } from 'antd';
import { useUserContext } from '../../context/UserContext';

const Selector = () => {
    const { setFilterAndReload, filters } = useUserContext();

    const handleChange = (value) => {
        setFilterAndReload({
            ...filters,
            status: value,
        });
    };

    return (
        <Select
            style={{
                width: 180,
            }}
            placeholder="Filtrar por estado"
            onChange={handleChange}
            allowClear
            options={[
                {
                    value: 'active',
                    label: 'Activo',
                },
                {
                    value: 'inactive',
                    label: 'Inactivo',
                },
            ]}
        />
    );
};

export default Selector;
