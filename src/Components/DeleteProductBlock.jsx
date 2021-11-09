import React, { useState } from 'react';
import {  Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteProduct, fetchProducts } from '../Redux/actions/fetchProducts'

const DeleteProductBlock = ({id, name}) => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        dispatch(deleteProduct(id, name));
        dispatch(fetchProducts())
        setShow(false)
    };
  
    return (
      <>
        <Button variant="outline-danger" onClick={handleShow} size="sm">
          Delete
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
                <span style={{fontWeight:"300"}}>Delete </span>
                {name}
                <span style={{fontWeight:"300"}} >? </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default DeleteProductBlock
