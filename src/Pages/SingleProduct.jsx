import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import ProductCommentsSection from '../Components/ProductCommentsSection';
import SingleProductCard from '../Components/SingleProductCard';

const SingleProduct = () => {
    const params = useParams();

    const commentId = params.id

    return (
        <Row className='justify-content-md-center'>
            <Col sm={12} md={10} lg={6} xl={6} xxl={6}>
                <SingleProductCard productId={commentId}/>
            </Col>
            <Col sm={12} md={10} lg={6} xl={4} xxl={4}>
                <ProductCommentsSection productId={commentId}/>
            </Col>
        </Row>
    )
}

export default SingleProduct
