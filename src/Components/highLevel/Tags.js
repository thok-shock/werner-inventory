import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import BoxOverview from '../BoxOverview'
import PrintList from './PrintList'

function filterByLot(boxes, lot) {
    const filteredBoxes = boxes.filter(box => {
        if (box.lotID == lot) {
            //console.log('true')
            return true
        } else {
            return false;
        }
    })
    console.log(filteredBoxes)
    return filteredBoxes
}

export default function Tags(props) {
    const history = useHistory()
    const [filteredBoxes, updateFilteredBoxes] = useState([])

    useEffect(() => {
        //console.log('filtering')
        //console.log(props.boxes)
        updateFilteredBoxes(filterByLot(props.boxes, props.selectedLot))
        
    }, [props.boxes])

    return <div>
        <Container>
            <Row>
                <Col md={12}>
                    <h2>Tags</h2>
                    <p>Print QR codes to label each of your boxes. Select your boxes and print.</p>
                    <Form><Form.Label>Active Lot</Form.Label>
                    <Form.Control as='select'></Form.Control></Form>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <PrintList boxes={filteredBoxes} />
                </Col>
                
            </Row>
        </Container>
        
    </div>
}