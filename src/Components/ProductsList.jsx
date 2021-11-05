import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../Redux/actions/fetchProducts';
import { Container, Row } from 'react-bootstrap';
import LoadingBlock from './LoadingBlock';
import ProductCard from './ProductCard'

const ProductsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    const productsData = useSelector( state => state.productsData);

    return (
        <div>
            <Container>
                <Row>
                    {productsData.isLoading ? (<LoadingBlock/>):
                        !!productsData.error ? (<h1>{productsData.error}</h1>):
                        productsData.products.map(product => {
                            return (
                                    <ProductCard product={product} key={product.id}/>
                            )
                        })}
                </Row>
            </Container>
        </div>
    )
}

export default ProductsList