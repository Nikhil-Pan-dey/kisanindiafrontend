// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
// import {
//     Container,
//     Row,
//     Col,
//     ListGroup,
//     Image,
//     Card,
//     Button
// } from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from './../../components/Loader/Loader';
// import Message from '../../components/Message/Message';
// import { getOrderDetails, payOrder, deliverOrder } from './../../actions/orderAction';
// import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from './../../constants/orderConstant';
// import Meta from '../../components/Helmet/Meta';

// const OrderScreen = () => {
//     const {id}=useParams()
//     const orderId = id;
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const orderDetails = useSelector(state => state.orderDetails);
//     const { order, loading, error } = orderDetails;

//     const orderPay = useSelector(state => state.orderPay);
//     const { success: successPay, loading: loadingPay } = orderPay;

//     const userLogin = useSelector(state => state.userLogin);
//     const { userInfo } = userLogin;

//     const orderDeliver = useSelector(state => state.orderDeliver);
//     const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

//     useEffect(() => {
//         if (!userInfo) {
//             navigate('/login');
//         }

//         if (!order || successPay || successDeliver) {
//             dispatch({ type: ORDER_PAY_RESET });
//             dispatch({ type: ORDER_DELIVER_RESET });
//             dispatch(getOrderDetails(orderId));
//         }
//     }, [dispatch, orderId, successPay, successDeliver, navigate, userInfo, order]);

//     const onSuccessPaymentHandler = (paymentResult) => {
//         dispatch(payOrder(orderId, paymentResult));
//     };

//     const deliverHandler = () => {
//         dispatch(deliverOrder(order));
//     };

//     const itemsPrice = order?.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

//     return (
//         <div>
//             <Meta title="Agroic | Order" />
//             {loading ? (
//                 <Loader />
//             ) : error ? (
//                 <Message variant="danger">{error}</Message>
//             ) : (
//                 <Container style={{ marginTop: '120px' }}>
//                     <h2>Order {order._id}</h2>
//                     <Row>
//                         <Col md={8}>
//                             <ListGroup variant='flush' className="mb-3">
//                                 <ListGroup.Item>
//                                     <h1>Shipping</h1>
//                                     <p><strong>Name: </strong>{order.user.name}</p>
//                                     <p>
//                                         <strong>Email / NIC: </strong>
//                                         <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//                                     </p>
//                                     <p>
//                                         <strong>Address: </strong>
//                                         {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
//                                         {order.shippingAddress.postalCode}, {order.shippingAddress.country}
//                                     </p>
//                                     {order.isDelivered
//                                         ? <Message variant="success">Delivered on {order.deliveredAt}</Message>
//                                         : <Message variant="danger">Not Delivered</Message>
//                                     }
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <h2>Payment Method</h2>
//                                     <p><strong>Method: </strong>{order.paymentMethod}</p>
//                                     {order.isPaid
//                                         ? <Message variant="success">Paid on {order.paidAt}</Message>
//                                         : <Message variant="danger">Not Paid</Message>
//                                     }
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <h2>Order Items</h2>
//                                     {order.orderItems.length === 0
//                                         ? <Message>Order is empty</Message>
//                                         : (
//                                             <ListGroup variant="flush">
//                                                 {order.orderItems.map((item, index) => (
//                                                     <ListGroup.Item key={index}>
//                                                         <Row>
//                                                             <Col md={1}>
//                                                                 <Image src={item.image} alt={item.name} fluid rounded />
//                                                             </Col>
//                                                             <Col>{item.name}</Col>
//                                                             <Col md={4}>
//                                                                 {`${item.qty} x RS. ${item.price} = RS. ${item.qty * item.price}`}
//                                                             </Col>
//                                                         </Row>
//                                                     </ListGroup.Item>
//                                                 ))}
//                                             </ListGroup>
//                                         )
//                                     }
//                                 </ListGroup.Item>
//                             </ListGroup>
//                         </Col>
//                         <Col md={4}>
//                             <Card>
//                                 <ListGroup variant="flush">
//                                     <ListGroup.Item>
//                                         <h2>Order Summary</h2>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Total Price</Col>
//                                             <Col>{`RS. ${itemsPrice}`}</Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Shipping</Col>
//                                             <Col>{`RS. ${order.shippingPrice}`}</Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Tax</Col>
//                                             <Col>{`RS. ${order.taxPrice}`}</Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Total</Col>
//                                             <Col>{`RS. ${order.totalPrice}`}</Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     {!order.isPaid && (
//                                         <ListGroup.Item>
//                                             {loadingPay && <Loader />}
//                                             <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
//                                                 <PayPalButtons
//                                                     amount={order.totalPrice}
//                                                     onSuccess={onSuccessPaymentHandler}
//                                                 />
//                                             </PayPalScriptProvider>
//                                         </ListGroup.Item>
//                                     )}
//                                     {loadingDeliver && <Loader />}
//                                     {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
//                                         <ListGroup.Item>
//                                             <Button
//                                                 type='button'
//                                                 className='btn btn-block'
//                                                 onClick={deliverHandler}
//                                             > Mark as Delivered </Button>
//                                         </ListGroup.Item>
//                                     )}
//                                 </ListGroup>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             )}
//         </div>
//     );
// };

// export default OrderScreen;


import React, { useEffect } from 'react';
import axios from 'axios';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import {
    Container,
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    Button
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { getOrderDetails, payOrder, deliverOrder } from './../../actions/orderAction';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from './../../constants/orderConstant';
import Meta from '../../components/Helmet/Meta';

const OrderScreen = () => {
    const { id } = useParams();
    const orderId = id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { success: successPay, loading: loadingPay } = orderPay;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId, successPay, successDeliver, navigate, userInfo, order]);

    const onSuccessPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return (
        <div>
            <Meta title="Agroic | Order" />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Container style={{ marginTop: '120px' }}>
                    <h2>Order {order._id}</h2>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush' className="mb-3">
                                <ListGroup.Item>
                                    <h1>Shipping</h1>
                                    <p><strong>Name: </strong>{order.user.name}</p>
                                    <p>
                                        <strong>Email / NIC: </strong>
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered
                                        ? <Message variant="success">Delivered on {order.deliveredAt}</Message>
                                        : <Message variant="danger">Not Delivered</Message>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p><strong>Method: </strong>{order.paymentMethod}</p>
                                    {order.isPaid
                                        ? <Message variant="success">Paid on {order.paidAt}</Message>
                                        : <Message variant="danger">Not Paid</Message>
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0
                                        ? <Message>Order is empty</Message>
                                        : (
                                            <ListGroup variant="flush">
                                                {order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Col>
                                                            <Col>{item.name}</Col>
                                                            <Col md={4}>
                                                                {`${item.qty} x RS. ${item.price} = RS. ${item.qty * item.price}`}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>{`RS. ${order.itemsPrice}`}</Col> {/* Use order.itemsPrice */}
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>{`RS. ${order.shippingPrice}`}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>{`RS. ${order.taxPrice}`}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>{`RS. ${order.totalPrice}`}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                                                <PayPalButtons
                                                    amount={order.totalPrice}
                                                    onSuccess={onSuccessPaymentHandler}
                                                />
                                            </PayPalScriptProvider>
                                        </ListGroup.Item>
                                    )}
                                    {loadingDeliver && <Loader />}
                                    {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Button
                                                type='button'
                                                className='btn btn-block'
                                                onClick={deliverHandler}
                                            > Mark as Delivered </Button>
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default OrderScreen;
