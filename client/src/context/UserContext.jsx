/* eslint-disable react/prop-types */
import { React, createContext, useContext, useState, useEffect } from 'react';
import { createUser, updateUser, deleteUser, getUsersPaginated, isUserDuplicate, isUserDuplicateOnEdit } from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
    const [filters, setFilters] = useState({ name: '', status: '' });

    const loadUsers = async () => {
        setLoading(true);
        try {
            const { data, total } = await getUsersPaginated({
                limit: pagination.limit,
                offset: pagination.offset,
                name: filters.name,
                status: filters.status,
            });
            setUsers(data);
            setTotalUsers(total);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async (user) => {
        try {
            setLoading(true);

            // Validacion de duplicados
            const { usernameExists, emailExists } = await isUserDuplicate(user.username, user.email);

            if (usernameExists || emailExists) {
                const duplicateMsg = [
                    usernameExists ? 'nombre de usuario' : '',
                    emailExists ? 'correo electrónico' : ''
                ].filter(Boolean).join(' y ');
                throw new Error(`${duplicateMsg.charAt(0).toUpperCase() + duplicateMsg.slice(1)} ya en uso.`);
            }

            const userWithId = { ...user, id: uuidv4() };
            await createUser(userWithId);
            await loadUsers();
        } catch (error) {
            console.error('Error creando usuario:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (id, updateData) => {
        try {
            setLoading(true);

            // Validacion de duplicados
            const { usernameExists, emailExists } = await isUserDuplicateOnEdit(id, updateData.username, updateData.email);

            if (usernameExists || emailExists) {
                const duplicateMsg = [
                    usernameExists ? 'nombre de usuario' : '',
                    emailExists ? 'correo electrónico' : ''
                ].filter(Boolean).join(' y ');
                throw new Error(`${duplicateMsg.charAt(0).toUpperCase() + duplicateMsg.slice(1)} ya en uso.`);
            }

            const updated = await updateUser(id, updateData);
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === id ? updated : user))
            );
        } catch (error) {
            console.error('Error editando usuario:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async (id) => {
        try {
            setLoading(true);
            await deleteUser(id);
            await loadUsers();
        } catch (error) {
            console.error('Error al borrar el usuario:', error);
        } finally {
            setLoading(false);
        }
    }

    const setPage = (newOffset) => {
        setPagination(prevPagination => ({ ...prevPagination, offset: newOffset }));
    }

    const updateNameFilter = (name) => {
        setFilters(prev => ({ ...prev, name }));
        setPagination(prev => ({ ...prev, offset: 0 }));
    };

    const updateStatusFilter = (status) => {
        setFilters(prev => ({ ...prev, status }));
        setPagination(prev => ({ ...prev, offset: 0 }));
    };

    useEffect(() => {
        loadUsers();
    }, [pagination, filters]);

    return (
        <UserContext.Provider
            value={{
                users,
                totalUsers,
                loading,
                addUser,
                editUser,
                removeUser,
                setPage,
                pagination,
                filters,
                updateNameFilter,
                updateStatusFilter
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);