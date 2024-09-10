import React from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Meta from '../../components/Helmet/Meta';
import './FarmerStyle.css';

const FarmerScreen = () => {
    return (
        <div>
            <Meta title="Agroic | Farmers" />
            <Container className='farmerContainer'>
                <h1 className='title'>FARMER</h1>
                <h4 className="farmer-title">
                    If you are a farmer then you are at the perfect platform where you can order all of your farming-related products and sell your production as well.
                </h4>
                <Row className="justify-content-center">
                    <Col md={4} className="mb-4">
                        <Card border="primary" className="h-100">
                            <Card.Body>
                                <Card.Title className="card-title">Purchase Seeds, Pesticides & Fertilizer</Card.Title>
                                <LinkContainer to="/farmers/purchaseSeeds">
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card border="primary" className="h-100">
                            <Card.Body>
                                <Card.Title className="card-title">Sell Your Producing Material through Us</Card.Title>
                                <LinkContainer to={{pathname:'/login' , search:'?redirect=supplier'}}>
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card border="primary" className="h-100">
                            <Card.Body>
                                <Card.Title className="card-title">Lend All of Heavy Machines and Tractors</Card.Title>
                                <LinkContainer to="/farmers/lendMachines">
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FarmerScreen;
