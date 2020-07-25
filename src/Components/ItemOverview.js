import React from 'react';
import { Table, Navbar, Form, Col, Button } from 'react-bootstrap';
import ItemRow from './ItemRow';

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: {}
        } //will need to load data at some point
    }

renderItems() {
    if(this.props && this.props.items && this.props.items.length > 0) {
        return this.props.items.map(item => {
            return <ItemRow key={item.itemID} item={item} lots={this.props.lots} />
        })
    }
}


render() {
    return <div>
        <h2>Items</h2>
        <Form>
                <Form.Row>
                    <Col xs={8}>
                    <Form.Group>
                    
                    <Form.Control className='searchBox' ></Form.Control>
                </Form.Group>
                    </Col>
                <Col xs={4}>
                <Button>Search</Button></Col>
                </Form.Row>
                
            </Form>
        <Table bordered hover striped>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Value</td>
                    <td>Box</td>
                    <td>Lot</td>
                    <td>Fragile</td>
                </tr>
            </thead>
            <tbody>
                {this.renderItems()}
            </tbody>
        </Table>
    </div>
}

}