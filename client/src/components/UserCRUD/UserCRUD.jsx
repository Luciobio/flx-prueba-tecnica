/* eslint-disable no-useless-catch */
import { React, useState } from "react";
import { Button, Space, message } from 'antd';
import { useUserContext } from "../../context/UserContext";
import styles from "./UserCRUD.module.css";
import SearchBox from "./SearchBox";
import Selector from "./Selector";
import UserTable from "./UserTable";
import UserFormModal from "./modals/UserFormModal";
import { getUsersPaginated } from "../../services/UserService";

const UserCRUD = () => {
  const { addUser, pagination, setPage, updateNameFilter, updateStatusFilter } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const resetAllFilters = async () => {
    setSearchValue('');
    setStatusValue('');
    updateNameFilter('');
    updateStatusFilter('');
  };

  const handleCreateUser = async (formData) => {
    try {
      await addUser(formData);
      message.success("Usuario creado con éxito");

      resetAllFilters();

      // Obtenemos el total de usuarios sin filtrar
      const { total } = await getUsersPaginated({
        limit: pagination.limit,
        offset: 0,
        name: '',
        status: '',
      });

      // Muestra la ultima página después de crear un usuario para visualizarlo
      const lastPageOffset = Math.floor((total + 1) / pagination.limit) * pagination.limit;
      setPage(lastPageOffset);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Space direction="horizontal" size="middle" className={styles.toolbar}>
        <Space direction="horizontal" size="middle" className="filters">
          <SearchBox
            value={searchValue}
            onChange={(val) => {
              setSearchValue(val);
              updateNameFilter(val);
            }}
          />
          <Selector
            value={statusValue}
            onChange={(val) => {
              setStatusValue(val);
              updateStatusFilter(val);
            }}
          />
        </Space>
        <Button type="primary" className={styles.button} onClick={handleOpenModal}>
          Agregar Usuario
        </Button>
      </Space>
      <UserTable />

      <UserFormModal
        open={isModalOpen}
        title={'Agregar Usuario'}
        confirmTxt={'Agregar Usuario'}
        onClose={handleCloseModal}
        onSubmit={handleCreateUser}
        isEdit={false}
      />
    </div>
  );
}

export default UserCRUD;