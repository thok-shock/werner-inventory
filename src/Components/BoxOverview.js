import React from 'react';
import BoxItem from './BoxItem';
import { Table, Form, Col, Button } from 'react-bootstrap';

export default class BoxOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderBoxes() {
        if(this.props && this.props.boxes && this.props.boxes.length > 0) {
            return this.props.boxes.map(box => {
                return <BoxItem key={box.boxID} box={box} items={this.props.items} lots={this.props.lots} />
            })
        }
    }



    render() {
        return (
            <div>
            <h2>Boxes</h2>
            <Form>
                <Form.Row>
                    <Col md={8}>
                    <Form.Group>
                    
                    <Form.Control className='searchBox' ></Form.Control>
                </Form.Group>
                    </Col>
                <Col md={4}>
                <Button>Search</Button></Col>
                </Form.Row>
                
            </Form>
            <Table bordered hover striped>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Name</td>
                        <td>Value</td>
                        <td>Fragile</td>
                        <td>Lot</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderBoxes()}
                </tbody>
            </Table>
            </div>
        )
    }
}