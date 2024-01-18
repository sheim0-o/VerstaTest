import { useEffect, useState } from 'react';
import './App.css';
import { getAllDeliveryOrders } from './utils/apiUtils';
import CreateOrderForm from './components/CreateOrderForm';
import DetailedOrderForm from './components/DetailedOrderForm';
import OrderElement from './components/OrderElement';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function App() {
    const [deliveryOrders, setDeliveryOrders] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleCreateOrder = (newOrder) => {
        setDeliveryOrders([...deliveryOrders, newOrder]);
    };
    const handleDeleteOrder = (id) => {
        setDeliveryOrders(deliveryOrders.filter(order => order.id !== id))
        toast("Заказ был удален!", {type:"success"});
        selectedOrder(null);
    }

    useEffect(() => {
        getAllDeliveryOrders()
            .then(data => setDeliveryOrders(data))
            .catch(e => toast(e.message, {type:"error"}));
    }, []);

    useEffect(() => {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.add(prefersDarkScheme ? 'bg-dark' : 'bg-light');
    }, []);

    return (
        <Container style={{ maxWidth: '1000px' }}>
           { deliveryOrders
                ?   <div className="container mt-5 d-flex row align-items-center justify-content-center">
                        <Button variant="primary" size="lg" style={{ maxWidth: '300px' }} onClick={() => setShowCreateForm(true)}>
                            Создать новый заказ
                        </Button>
                    
                        { deliveryOrders.length
                            ?<div className='mt-5'>
                                <h2 variant="info">Список заказов</h2>
                                <div className="row p-3 rounded border">
                                    {deliveryOrders.map((order) => (
                                        <OrderElement key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
                                    ))}
                                </div>
                            </div>
                            : <Alert className='mt-5'>Список заказов пуст...</Alert>
                        }

                        <CreateOrderForm show={showCreateForm} onClose={()=>setShowCreateForm(false)} onCreateOrder={handleCreateOrder} />
                        <DetailedOrderForm order={selectedOrder} onClose={() => setSelectedOrder(null)} onDeleteOrder={handleDeleteOrder}/>
                    </div>
                :   <Alert>Загрузка заказов...</Alert>
            }
            <ToastContainer />
        </Container>
    );
}

export default App;