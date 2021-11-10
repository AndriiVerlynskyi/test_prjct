import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { Modal, InputGroup, FormControl, Container, Button} from 'react-bootstrap';
import { editProduct, fetchProductById } from '../Redux/actions/fetchProducts';


const EditProductBlock = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, reset, formState:{ errors, isDitry }} = useForm({
        mode:'onChange'
    })

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        reset()
    }

    const product = useSelector( state => state.productsData.singleProduct)

    const onSubmit = (inputsData) => {
        const clearInputData = (obj) => {
            for (const propName in obj) {
                if (typeof obj[propName] !== 'object'){
                    if (
                    obj[propName] === '' ||
                    obj[propName] === null ||
                    obj[propName] === undefined
                ) {
                    delete obj[propName];
                }}
            }
            return obj;
        }
        const editedFields = clearInputData(inputsData);

        const editedProduct = {
            ...product,
            ...editedFields
        }
        dispatch(editProduct(product, editedProduct))
    }


    return (
        <Container style={{textAlign: 'right'}}>
            <Container style={{textAlign: 'right'}}>
                <Button variant='outline-warning' onClick={handleShow}>Edit</Button>
            </Container>
            <Modal show={show} onHide={handleClose} >
                <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Image URL</InputGroup.Text>
                        <FormControl
                            aria-label="imageUrl"
                            aria-describedby="basic-addon1"
                            name="imageUrl"
                            {...register('imageUrl')}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">name</InputGroup.Text>
                        <FormControl
                            aria-label="name"
                            aria-describedby="basic-addon1"
                            name="name"
                            {...register('name')}
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
                            {...register('size.width')}
                        />
                        <FormControl 
                            type="number"
                            min="0"
                            placeholder="50mm" 
                            aria-label="height"
                            name="height"
                            {...register('size.height')}
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
                            {...register('weight')}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button
                        variant="primary"
                        disabled={isDitry}
                        type="submit"
                    >Save</Button>
                </Modal.Footer>
            </form>
            </Modal>
        </Container>
    )
}

export default EditProductBlock
