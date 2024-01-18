import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { deleteDeliveryPost } from '../utils/apiUtils';

export default function DetailedOrderForm({order, onClose, onDeleteOrder}) {
    const handleDeleteOrder = () => {
        deleteDeliveryPost(order.id)
            .then(()=>onDeleteOrder(order.id))
            .catch(e => toast(e.message, {type:"error"}));
        onClose();
    }

    return (
        <Modal show={order} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Детали заказа #{order?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Номер заказа: {order?.id}</p>
                <p>Город отправителя: {order?.senderCity}</p>
                <p>Адрес отправителя: {order?.senderAddress}</p>
                <p>Город получателя: {order?.recipientCity}</p>
                <p>Адрес отправителя: {order?.recipientAddress}</p>
                <p>Вес груза: {order?.cargoWeight}</p>
                <p>Дата забора груза: {order?.pickupDate.replace('T', ' ').split('.')[0]}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteOrder}>
                    Удалить заказ
                </Button>
            </Modal.Footer>
        </Modal>
    );
}