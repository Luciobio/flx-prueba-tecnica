import React from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import UserCRUD from './components/UserCRUD/UserCRUD';
import './App.css';

const App = () => (
  <MainLayout>
    <UserCRUD />
  </MainLayout>
);

export default App;
