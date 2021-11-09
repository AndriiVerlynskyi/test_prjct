import React from 'react';
import { Card, Container } from 'react-bootstrap'
import DeleteProductBlock from './DeleteProductBlock';

const ProductCard = ({product}) => {

    return (
        <Card 
        className="card-container" 
        style={{ width: '20rem', margin: "0px 0px 10px 0px" }}
        >
            <Card.Img variant="top" src={product.imageUrl} style={{ height: '300px' }}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <div style={{display: 'flex', alignItems: 'baseline'}}>
                    <Card.Text>{product.weight}</Card.Text>
                    <Container style={{textAlign: 'right'}}>
                        <DeleteProductBlock id={product.id} name={product.name}/>
                    </Container>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard
