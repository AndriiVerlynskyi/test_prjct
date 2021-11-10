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
        // const clearInputData = (obj) => {
        //     const checkIfObject = (object) => {
        //         for (const propName in object) {
        //         if (typeof object[propName] !== 'object'){
        //             if (
        //             object[propName] === '' ||
        //             object[propName] === null ||
        //             object[propName] === undefined
        //         ) {
        //             delete object[propName];
        //         }} else {
        //             checkIfObject(object[propName])
        //         }
        //     }}
        //     checkIfObject(obj)
        //     return obj;
        // }
        // const editedProductData = clearInputData(inputsData);

        const combineObjects = (obj1, obj2) => {
            const checkIfObject = (object1, object2) => {
                for (let propName in object1){
                    if(typeof object2[propName] !== 'object'){
                        if (
                        object2[propName] === '' ||
                        object2[propName] === null ||
                        object2[propName] === undefined
                        ){
                            if (
                            object1[propName] !== '' ||
                            object1[propName] !== null ||
                            object1[propName] !== undefined
                            ){
                                const fulfilledProp = object1[propName]
                                object2[propName] = fulfilledProp
                            } else {
                                delete object2[propName]
                            }
                        }
                    } else {
                        checkIfObject(object1[propName], object2[propName])
                    }
            }}
            checkIfObject(obj1, obj2);
            return obj2
        }

        const cleanedObj = combineObjects(product, inputsData)

        const editedProduct = {
            ...cleanedObj
        }
        console.log(editedProduct)
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
