import React, { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux'
import { savePost } from '../Redux/actions/fetchProducts'
import { 
  Container, 
  Modal, 
  Button, 
  InputGroup,
  FormControl
  } from 'react-bootstrap'
import ApprovalModal from './ApprovalModal';
import DisapprovalModal from './DisapprovalModal'

const AddNewProductBlock = () => {

    const dispatch = useDispatch()
  
    const [post, setPost] = useState({});
    const [productUrl, setProductUrl] = useState(null);
    const [productName, setProductName] = useState(null);
    const [productWidth, setProductWidth] = useState(null);
    const [productHeight, setProductHeight] = useState(null);
    const [productWeight, setProductWeight] = useState(null);


    useEffect(() => {
      setPost({
        imageUrl: productUrl,
        name: productName,
        size: {
          width: productWidth,
          height: productHeight
        },
        weigth: productWeight
      })
    }, [productUrl, productName, productWidth, productHeight, productWeight])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {
      dispatch(savePost(post));
      setShow(false);
    }

    const [addButtonDisabled, setAddButtonDisabled] = useState(true);

    useEffect(() => {
      if (!!productUrl && !!productName && !!productWidth && !!productHeight && !!productWeight){
        setAddButtonDisabled(false)
      }
    }, [productUrl, productName, productWidth, productHeight, productWeight])

    return (
      
      <Container className="text-center" style={{ margin: '0px 0px 20px 0px'}}>
            <Button variant="primary" size="lg" onClick={handleShow}>
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
                  onChange={(e) => {
                    setProductUrl(e.target.value)
                }
                }
                  aria-label="imageUrl"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">name</InputGroup.Text>
                <FormControl
                  onChange={(e) => {
                    setProductName(e.target.value)
                  }
                  }
                  aria-label="name"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>width and height</InputGroup.Text>
                <FormControl placeholder="110mm" aria-label="width" onChange={(e) => {
                    setProductWidth(e.target.value)
                  }
                  } />
                <FormControl placeholder="50mm" aria-label="height" onChange={(e) => {
                    setProductHeight(e.target.value)
                  }
                  } />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">weight</InputGroup.Text>
                <FormControl
                  onChange={(e) => {
                    setProductWeight(e.target.value)
                  }
                  } 
                  placeholder="230g"
                  aria-label="weight"
                  aria-describedby="basic-addon1"
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
          <ApprovalModal/>
          <DisapprovalModal/>
        </Container>
    )
}

export default AddNewProductBlock
