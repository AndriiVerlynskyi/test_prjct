import React from 'react';
import { Card, Button, Col } from 'react-bootstrap'

const ProductCard = ({product}) => {

    return (
        <Col sm={12} md={6} lg={4}>
            <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src={product.imageUrl} style={{ height: '300px' }}/>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Button variant="danger" size="md" className="pull-right">Delete</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductCard
