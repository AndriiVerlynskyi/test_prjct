import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';

const DisapprovalModal = () => {
    const isSaved = useSelector( state => state.productsData.isSaved)    

    const [show, setShow] = useState(false);

    useEffect(( ) => {
        if( isSaved === false ){
            setShow(true)
        } else if ( isSaved === true ){
            setShow(false)
        }
    }, [isSaved])


    const handleClose = () => setShow(false)

    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Denied</Modal.Title>
            </Modal.Header>
            <Modal.Body>Product wasn't added :(</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default DisapprovalModal
