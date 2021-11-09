import React, { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux'
import { saveProduct } from '../Redux/actions/fetchProducts'
import { 
  Container, 
  Modal, 
  Button, 
  InputGroup,
  FormControl
  } from 'react-bootstrap';
import ConfirmationModal from './ConfirmationModal';

const AddNewProductBlock = () => {

  const dispatch = useDispatch();

  const initialProductValue = {
    imageUrl: "",
    name: "",
    size:{
      width: "",
      height: ""
    },
    weight:""
  }

  const [product, setProduct] = useState(initialProductValue);

  const handleChangeFirstLevelObjProp = e => {
    setProduct({
      ...product,
      [e.target.name] : e.target.value
    })
  }

  const handleChangeSecondLevelObjPropSize = e => {
    setProduct({
      ...product,
      size: {
        ...product.size,
        [e.target.name]: e.target.value
      }
    })
    console.log(product)
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setProduct(initialProductValue)
  };
  const handleShow = () => setShow(true);
  const handleSave = () => {
    dispatch(saveProduct(product));
    setShow(false)
  }

  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  useEffect(() => {
    if (!!product.productUrl && !!product.productName && !!product.size.productWidth && !!product.size.productHeight && !!product.productWeight){
      setAddButtonDisabled(false)
    }
  }, [product]);

  return (
    
    <Container className="text-left" style={{ margin: '0px 0px 20px 0px'}}>
          <Button variant="outline-primary" size="md" onClick={handleShow}>
            Add new product
          </Button>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Image URL</InputGroup.Text>
              <FormControl 
                aria-label="imageUrl"
                aria-describedby="basic-addon1"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChangeFirstLevelObjProp}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">name</InputGroup.Text>
              <FormControl
                aria-label="name"
                aria-describedby="basic-addon1"
                name="name"
                value={product.name}
                onChange={handleChangeFirstLevelObjProp}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>width and height</InputGroup.Text>
              <FormControl 
                type="number"
                min="0"
                placeholder="110mm" 
                aria-label="width"
                name="width"
                value={product.size.width}
                onChange={handleChangeSecondLevelObjPropSize}
              />
              <FormControl 
                type="number"
                min="0"
                placeholder="50mm" 
                aria-label="height"
                name="height"
                value={product.size.height}
                onChange={handleChangeSecondLevelObjPropSize}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">weight</InputGroup.Text>
              <FormControl
                type="number"
                min="0"
                placeholder="230g"
                aria-label="weight"
                aria-describedby="basic-addon1"
                name="weight"
                value={product.weight}
                onChange={handleChangeFirstLevelObjProp} 
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" disabled={addButtonDisabled} onClick={handleSave}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <ConfirmationModal/>
      </Container>
  )
}

export default AddNewProductBlock
