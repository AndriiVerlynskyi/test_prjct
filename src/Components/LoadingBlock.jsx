import React from 'react';
import { Col, Spinner } from 'react-bootstrap'

const LoadingBlock = () => {
    return (
        <div>
            <Col>
                <Spinner animation="border" />
            </Col>
        </div>
    )
}

export default LoadingBlock
