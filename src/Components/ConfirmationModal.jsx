import React from 'react';
import { Container, Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { hideConfirmationModal } from '../Redux/actions/confModal';

const ConfirmationModal = () => {
    const dispatch = useDispatch();
    
    const confModalData = useSelector( state => state.confModal);

    const handleClose = () => {
        dispatch(hideConfirmationModal())
    }

    return (
        <Container>
            <Modal show={confModalData.showConfModal} onHide={handleClose}>
                <Modal.Body>{confModalData.confModalText}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
      </Container>
    )
}

export default ConfirmationModal
