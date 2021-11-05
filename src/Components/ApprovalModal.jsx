import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';

const ApprovalModal = () => {
    const isSaved = useSelector( state => state.productsData.isSaved)  

    const [show, setShow] = useState(false);

    useEffect(( ) => {
        setShow(isSaved)
    }, [isSaved])

    const handleClose = () => setShow(false)


    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Product successfully added</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ApprovalModal