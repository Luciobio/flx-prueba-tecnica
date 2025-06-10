/* eslint-disable react/prop-types */
import { React, useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber, Select, Col, Row, Divider, Button } from 'antd';

const UserFormModal = ({ open, onClose, onSubmit, title, confirmTxt, initialValues = {}, isEdit = false }) => {
    const [loading, setLoading] = useState(false);
    const hadErrorRef = useRef(false);

    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (hadErrorRef.current) {
                // No resetear el formulario si hubo un error
                hadErrorRef.current = false;
                return;
            }

            // Si es edición, precargar valores
            if (isEdit && initialValues) {
                form.setFieldsValue(initialValues);
            } else {
                // Resetear solo si no hay valores (nuevo usuario sin errores previos)
                form.resetFields();
            }
        }
    }, [open]);


    const handleOk = async () => {
        try {
            const values = await form.validateFields(); // valida y obtiene datos
            setLoading(true);
            await onSubmit(values); // ejecuta la lógica pasada desde el padre
            form.resetFields();
            onClose();
        } catch (error) {
            hadErrorRef.current = true;

            // Si el error viene de validación, no hacemos nada más
            if (error.errorFields) return;

            // Si es otro error (como duplicados), mostrarlo en los campos
            const errorMsg = error.message.toLowerCase();
            const fieldsWithErrors = [];

            if (errorMsg.includes('nombre de usuario') && errorMsg.includes('correo electrónico')) {
                fieldsWithErrors.push(
                    { name: 'username', errors: ['Nombre de usuario ya en uso.'] },
                    { name: 'email', errors: ['Correo electrónico ya en uso.'] }
                );
            } else if (errorMsg.includes('nombre de usuario')) {
                fieldsWithErrors.push({ name: 'username', errors: ['Nombre de usuario ya en uso.'] });
            } else if (errorMsg.includes('correo electrónico') || errorMsg.includes('email')) {
                fieldsWithErrors.push({ name: 'email', errors: ['Correo electrónico ya en uso.'] });
            } else {
                fieldsWithErrors.push({ name: 'username', errors: ['Error desconocido'] });
            }

            form.setFields(fieldsWithErrors);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    {confirmTxt}
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
                            <Input placeholder="luciobio" />
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
                            <Input placeholder="pardobio@gmail.com" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Nombre"
                            rules={[{ required: true, message: 'Ingrese el nombre' }]}
                        >
                            <Input placeholder="Luciano" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="lastname"
                            label="Apellido"
                            rules={[{ required: true, message: 'Ingrese el apellido' }]}
                        >
                            <Input placeholder="Pardo" />
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
                            <InputNumber placeholder="35" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Divider style={{ margin: '12px 0' }} />
        </Modal>
    );
};

export default UserFormModal;