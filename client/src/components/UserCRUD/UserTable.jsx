/* eslint-disable no-useless-catch */
import { React, useState } from 'react';
import { Space, Table, Tag, message } from 'antd';
import UserFormModal from './modals/UserFormModal';
import UserDeleteModal from './modals/UserDeleteModal';
import { useUserContext } from '../../context/UserContext';

const UserTable = () => {
  const { users, totalUsers, loading, pagination, setPage, editUser, removeUser, } = useUserContext();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete?.id) {
      await removeUser(userToDelete.id);
      setUserToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (formData) => {
  if (!editingUser?.id) return;
  try {
    await editUser(editingUser.id, formData);
    message.success("Usuario actualizado con éxito");
  } catch (error) {
    throw error;
  }
};


  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
      width: '23%',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: '23%',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      width: '23%',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === 'active' ? 'green' : 'red';
        const label = status === 'active' ? 'Activo' : 'Inactivo';
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Editar</a>
          <a onClick={() => handleDeleteClick(record)}>Eliminar</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.offset / pagination.limit + 1,
          pageSize: pagination.limit,
          total: totalUsers,
          showSizeChanger: false,
          position: ['bottomRight'],
          onChange: (page) => {
            const newOffset = (page - 1) * pagination.limit;
            setPage(newOffset);
          },
        }}
        locale={{
          emptyText: loading ? 'Cargando usuarios...' : 'No hay usuarios para mostrar',
        }}
      />

      <UserFormModal
        open={isEditModalOpen}
        title={'Editar Usuario'}
        confirmTxt={'Editar Usuario'}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialValues={editingUser}
        isEdit
      />

      <UserDeleteModal
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        user={userToDelete}
      />
    </>
  );
};

export default UserTable;

