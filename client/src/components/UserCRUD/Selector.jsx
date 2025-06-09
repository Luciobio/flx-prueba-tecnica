/* eslint-disable react/prop-types */
import React from 'react';
import { Select } from 'antd';

const Selector = ({ value, onChange }) => {

    return (
        <Select
            style={{
                width: 180,
            }}
            placeholder="Filtrar por estado"
            value={value || undefined}
            onChange={onChange}
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
