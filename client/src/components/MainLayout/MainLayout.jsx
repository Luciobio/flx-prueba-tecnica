/* eslint-disable react/prop-types */
import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import logo from '../../assets/Logo.png';
import styles from './MainLayout.module.css';

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => (
  <Layout className={styles.layout}>
    <Header className={styles.header}>
      <img className='logo' src={logo} alt='Logo Flexxus' />
    </Header>

    <Content className={styles.content} style={{ padding: '0 96px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
      </Breadcrumb>

      <div className={styles['site-layout-content']}>{children}</div>
    </Content>

    <Footer style={{ textAlign: 'center' }}>
      Flexxus ©2025 Created by Luciano Pardo
    </Footer>
  </Layout>
);

export default MainLayout;
