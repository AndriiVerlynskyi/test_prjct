import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, Toast } from 'react-bootstrap';
import LoadingBlock from './LoadingBlock';
import ConfirmationModal from './ConfirmationModal';
import AddNewCommentBlock from './AddNewCommentBlock';
import { fetchComments, deleteComment } from '../Redux/actions/fetchComments';

const ProductCommentsSection = ({productId}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchComments());
    },[dispatch])

    const [show, setShow] = useState(true)

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(productId, commentId))
        setShow(false)
    }

    const commentsData = useSelector( state => state.commentsData);

    const [comments, setComments] = useState([])

    useEffect(() => {
        setComments (commentsData.comments.filter((comment) => {
            if (comment.productId.toString() === productId) {
                return comment
            }
        }))
    },[commentsData.comments])
    
    return (
        <>
        <AddNewCommentBlock productId={productId}/>
        <ConfirmationModal/>
        {commentsData.isLoading ? (<LoadingBlock/>):
            !comments.length ? (
            <h5 style={{color:'grey'}}>No comments for this product yet</h5>
            ):
            <ToastContainer className="p-4">
                {comments.map(comment => {
                    return (
                            <Toast key={comment.id} show={show} onClose={() => {
                                    handleDeleteComment(comment.id)
                                }}>
                                <Toast.Header>
                                    <strong className="me-auto">{comment.id}</strong>
                                    <small className="text-muted">{comment.date}</small>
                                </Toast.Header>
                                <Toast.Body>{comment.description}</Toast.Body>
                            </Toast>
                    )
                })}
            </ToastContainer>
        }
        </>
    )
}

export default ProductCommentsSection
