import { React, useState } from "react";
import { Button, Space, message } from 'antd';
import { useUserContext } from "../../context/UserContext";
import styles from "./UserCRUD.module.css";
import SearchBox from "./SearchBox";
import Selector from "./Selector";
import UserTable from "./UserTable";
import UserFormModal from "./modals/UserFormModal";

const UserCRUD = () => {
  const { addUser } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateUser = async (formData) => {
    try {
      await addUser(formData);
      message.success("Usuario creado con éxito");
      handleCloseModal();
    } catch (error) {
      message.error("Hubo un error al crear el usuario");
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <div>
      <Space direction="horizontal" size="middle" className={styles.toolbar}>
        <Space direction="horizontal" size="middle" className="filters">
          <SearchBox />
          <Selector />
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