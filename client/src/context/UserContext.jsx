/* eslint-disable react/prop-types */
import { React, createContext, useContext, useState, useEffect } from 'react';
import { createUser, updateUser, deleteUser, getUsersPaginated } from '../services/UserService';
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
            const userWithId = { ...user, id: uuidv4() };
            const newUser = await createUser(userWithId);
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (error) {
            console.error('Error creando usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (id, updateData) => {
        try {
            setLoading(true);
            const updated = await updateUser(id, updateData);
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === id ? updated : user))
            );
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async (id) => {
        try {
            setLoading(true);
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error al borrar el usuario:', error);
        } finally {
            setLoading(false);
        }
    }

    const setFilterAndReload = (newFilters) => {
        setFilters(newFilters);
        setPagination(prevPagination => ({ ...prevPagination, offset: 0 }));
    }

    const setPage = (newOffset) => {
        setPagination(prevPagination => ({ ...prevPagination, offset: newOffset }));
    }

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
                setFilterAndReload,
                setPage,
                pagination,
                filters
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);