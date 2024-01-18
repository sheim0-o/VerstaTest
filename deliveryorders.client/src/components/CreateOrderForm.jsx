import React, { useState } from 'react'
import { Modal, Button, Form, Row  } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createDeliveryOrder } from '../utils/apiUtils';

export default function CreateOrderForm({show, onClose, onCreateOrder}) {
    const [newOrder, setNewOrder] = useState({});

    const handleCloseForm = () => {
        setNewOrder({});
        onClose();
    }
    
    const handleChange = (e) => {
        setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    };


    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const senderCity = form.querySelector('#senderCity').value;
        const senderAddress = form.querySelector('#senderAddress').value;
        const recipientCity = form.querySelector('#recipientCity').value;
        const recipientAddress = form.querySelector('#recipientAddress').value;
        const cargoWeight = form.querySelector('#cargoWeight').value;
        const pickupDate = form.querySelector('#pickupDate').value;

        const newOrder = {
            senderCity: senderCity,
            senderAddress: senderAddress,
            recipientCity: recipientCity,
            recipientAddress: recipientAddress,
            cargoWeight: parseInt(cargoWeight),
            pickupDate: new Date(pickupDate)
        }

        createDeliveryOrder(newOrder)
            .then((data)=>successfulOrderAddition(data))
            .catch(e => toast(e.message, {type:"error"}));
    };

    const successfulOrderAddition = (newOrder) => {
        toast("Заказ был добавлен!", {type:"success"});
        onCreateOrder(newOrder);
        setValidated(false);
        handleCloseForm();
    }

    
    const orderFields = [
        { label: 'Город отправителя', name: 'senderCity', initialValue: '', type: 'text' },
        { label: 'Адрес отправителя', name: 'senderAddress', initialValue: '', type: 'text' },
        { label: 'Город получателя', name: 'recipientCity', initialValue: '', type: 'text' },
        { label: 'Адрес получателя', name: 'recipientAddress', initialValue: '', type: 'text' },
        { label: 'Вес груза', name: 'cargoWeight', type: 'number', initialValue: 0, min: 1 },
        { label: 'Дата забора груза', name: 'pickupDate', initialValue: new Date().toLocaleString(), type: 'datetime-local' },
    ];
    
    return (
        <Modal show={show} onHide={handleCloseForm}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание нового заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ width: '70%', margin: '0 auto' }}>
                    {orderFields.map((field) => (
                        <Form.Group as={Row} key={field.name} controlId={field.name} className='mt-2' >
                            <Form.Label sm="8">
                                {field.label}
                            </Form.Label>
                            <Row sm="8" className='center'>
                                <Form.Control
                                    required
                                    type={field.type}
                                    name={field.name}
                                    value={newOrder[field.name] || field.initialValue}
                                    onChange={handleChange}
                                    {...(field.min !== undefined && { min: field.min })}
                                />
                            </Row>
                        </Form.Group>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type='submit'>
                        Создать
                    </Button>
                </Modal.Footer>
            </Form>
            <ToastContainer />
        </Modal>
    )
}