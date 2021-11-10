import React, {useEffect} from 'react';
import { Card, ListGroup, ListGroupItem, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../Redux/actions/fetchProducts';
import EditProductBlock from './EditProductBlock';
import LoadingBlock from './LoadingBlock'

const SingleProductCard = ({productId}) => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchProductById(productId))
    },[])

    const productsData = useSelector( state => state.productsData)

    return (
        <div>
            {productsData.isLoading ? (<LoadingBlock/>):
                !!productsData.errors.getByIdError ? (<h2>{productsData.errors.getByIdError}</h2>):
                    <Card style={{ width: '23rem' }}>
                        <Card.Img variant="top" src={productsData.singleProduct.imageUrl} />
                        <Card.Body>
                            <Card.Title>{productsData.singleProduct.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem >
                                <div style={{display:'flex'}}>
                                    <div style={{padding:'0px 3.5rem 0px 0px'}}>
                                        <span style={{fontSize: "0.9rem", fontWeight:'200'}}>width: </span>  
                                        <span style={{fontWeight:'500'}}>{productsData.singleProduct.size.width}mm</span>
                                    </div>
                                    <div>
                                        <span style={{fontSize: "0.9rem", fontWeight:'200'}}>height: </span>  
                                        <span style={{fontWeight:'500'}}>{productsData.singleProduct.size.height}mm</span>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <span style={{fontSize: "0.9rem", fontWeight:'200'}}>weight: </span>  
                                <span style={{fontWeight:'500', padding:'0px 30px 0px 0px'}}>{productsData.singleProduct.weight}g</span>
                            </ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <EditProductBlock />
                        </Card.Body>
                    </Card>
            }
        </div>
    )
}

export default SingleProductCard
