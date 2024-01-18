import React from 'react'
import { Card, Button } from 'react-bootstrap';

export default function OrderElement({order, onClick}) {
    return (
        <Card className="mb-3 shadow-sm bg-white rounded card-hover" onClick={onClick}>
            <Card.Body>
                <Card.Title>Заказ номер №{order.id}</Card.Title>
            </Card.Body>
        </Card>
    );
}