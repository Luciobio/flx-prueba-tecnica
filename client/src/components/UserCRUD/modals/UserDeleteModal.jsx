/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, Button, Divider } from 'antd';

const UserDeleteModal = ({ open, onCancel, onConfirm, user }) => {
  return (
    <Modal
      open={open}
      title="Eliminar Usuario"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Eliminar
        </Button>,
      ]}
    >
      <Divider style={{ margin: '12px 0' }} />
      <p style={{ padding: '1rem' }}>¿Estás seguro que quieres eliminar al usuario <span style={{ color: 'red' }}>@{user?.username}</span>?</p>
      <Divider style={{ margin: '12px 0' }} />
    </Modal>
  );
};

export default UserDeleteModal;