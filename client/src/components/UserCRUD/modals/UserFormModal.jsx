/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Col, Row, Divider, Button } from 'antd';

const UserFormModal = ({ open, onClose, onSubmit, initialValues = {}, isEdit = false }) => {
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                setLoading(true);
                onSubmit(values).finally(() => {
                    setLoading(false);
                    form.resetFields();
                });
            });
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={isEdit ? 'Editar Usuario' : 'Agregar Usuario'}
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    {isEdit ? 'Editar Usuario' : 'Agregar Usuario'}
                </Button>
            ]}
        >
            <Divider style={{ margin: '12px 0' }} />
            <Form
                form={form}
                layout="vertical"
                initialValues={initialValues}
                requiredMark={false}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Usuario"
                            rules={[{ required: true, message: 'Ingrese un nombre de usuario' }]}
                        >
                            <Input placeholder="johndoe" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Ingrese un email' },
                                { type: 'email', message: 'Ingrese un email válido' }
                            ]}
                        >
                            <Input placeholder="johndoe@domain.com" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Nombre"
                            rules={[{ required: true, message: 'Ingrese el nombre' }]}
                        >
                            <Input placeholder="John" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="lastname"
                            label="Apellido"
                            rules={[{ required: true, message: 'Ingrese el apellido' }]}
                        >
                            <Input placeholder="Doe" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="status"
                            label="Estado"
                            rules={[{ required: true, message: 'Seleccione un estado' }]}
                        >
                            <Select
                                placeholder="Seleccionar estado"
                                options={[
                                    { value: 'active', label: 'Activo' },
                                    { value: 'inactive', label: 'Inactivo' }
                                ]}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="age"
                            label="Edad"
                            rules={[{ required: true, message: 'Ingrese la edad' }]}
                        >
                            <InputNumber placeholder="43" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Divider style={{ margin: '12px 0' }} />
        </Modal>
    );
};

export default UserFormModal;