import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


function determineItem(itemID, items) {
    
}

export default function Item(props) {
    const {thisItem, updateThisItem} = useState()
    return <Container>
        <Row>
            <Col md={12}>
<h2>{`Item ${props.match.params.itemID} - `}</h2>
            </Col>
        </Row>
    </Container>
}