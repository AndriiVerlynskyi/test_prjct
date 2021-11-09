import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Redux/actions/fetchProducts';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingBlock from './LoadingBlock';
import ProductCard from './ProductCard'

const ProductsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    const productsData = useSelector( state => state.productsData);

    return (
        <div>
            <Container>
                <Row>
                    {productsData.isLoading ? (<LoadingBlock/>):
                        !!productsData.errors.getError ? (<h1>{productsData.errors.getError}</h1>):
                        productsData.products.map(product => {
                            return (
                                <Col sm={12} md={6} lg={4}  key={product.id}>
                                    <Link to={'/products/'+product.id} style={{ textDecoration: "none", color: "#484848"}}>
                                        <ProductCard product={product}/>
                                    </Link>
                                </Col>
                            )
                        })}
                </Row>
            </Container>
        </div>
    )
}

export default ProductsList