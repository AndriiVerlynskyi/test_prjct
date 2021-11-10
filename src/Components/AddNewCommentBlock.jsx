import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { addCommentToProduct } from '../Redux/actions/fetchComments';

const AddNewCommentBlock = ({productId}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState:{isSubmitSuccessful, isValid}} = useForm({ 
        mode:'onChange',
        defaultValues: {
          description:'',
          date:'',
          productId:''
        }
      })

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
        reset()
    }, [isSubmitSuccessful])

  const onSubmit = (data) => {
    const comment = {
      ...data,
      date: new Date().toLocaleString() + "",
      productId: productId
    }
    dispatch(addCommentToProduct(productId, comment));
    setShow(false)
  }

  return (
    <>
      <Button style={{margin:"0px 0px 0px 1.5rem"}} variant="outline-primary" onClick={handleShow}>
        Add comment
      </Button>
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
            <Modal.Title>New comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" >description</InputGroup.Text>
                        <FormControl 
                        aria-label="imageUrl"
                        aria-describedby="basic-addon1"
                        name="description"
                        label="Comment description"
                        id="description"
                        {...register('description', { required: 'Required' })}
                        />
                    </InputGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" disabled={!isValid} type="submit">
                Add
            </Button>
            </Modal.Footer>
            
        </form>
      </Modal>
    </>
  )
}

export default AddNewCommentBlock
