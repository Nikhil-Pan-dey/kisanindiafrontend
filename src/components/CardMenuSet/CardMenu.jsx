import React from 'react';
import {
    Container,
    Row,
    Card,
    CardGroup,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CardMenuStyles.css';

const CardMenu = () => {
    return (
        <Container>
            <Row>
                <CardGroup className='card-deck'>
                    <Card border='primary'>
                        <Card.Body>
                            <Card.Title className='title'>Farmer</Card.Title>
                            <Card.Text className='card-text'>
                                If you are a farmer, then you are at the perfect platform from where you can order all of your farming-related products and you can also sell your production.
                            </Card.Text>
                            <Link to='/farmer'>
                                <Button variant="success" className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    <Card border='primary'>
                        <Card.Body>
                            <Card.Title className='title'>Supplier</Card.Title>
                            <Card.Text className='card-text'>
                                Sell your wide variety of products related to farming through our platform. We have millions of farmers connected from all parts of the country.
                            </Card.Text>
                            <Link to='login?redirect=supplier'>
                                <Button variant="success" className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    <Card border='primary'>
                        <Card.Body>
                            <Card.Title className='title'>Consumer</Card.Title>
                            <Card.Text className='card-text'>
                                No need to visit the field to get grains! Just order here and get all kinds of grains delivered at your doorstep. Why wait? Go and order.
                            </Card.Text>
                            <Link to='/consumer'>
                                <Button variant="success" className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Row>
        </Container>
    );
}

export default CardMenu;
