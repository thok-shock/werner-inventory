import React from 'react';
import { Table, Navbar, Form, Col, Button } from 'react-bootstrap';
import ItemRow from './ItemRow';
import { useHistory, Redirect } from 'react-router-dom';

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: {},
            redirect: null
        } //will need to load data at some point

    }

renderItems() {
    if(this.props && this.props.items && this.props.items.length > 0) {
        return this.props.items.map(item => {
            return <ItemRow key={item.itemID} item={item} lots={this.props.lots} />
        })
    }
}

renderRedirect() {
    if (this.state.redirect) {
        return <Redirect push to='/new?type=item' />
    } else {
        return <div> </div>
    }
}


render() {
    return <div>
        <h2>Items</h2>
        <Form>
                <Form.Row>
                    <Col xs={7}>
                    <Form.Group>
                    
                    <Form.Control className='searchBox' ></Form.Control>
                </Form.Group>
                    </Col>
                <Col xs={5}>
                <Button className='mr-2'>Search</Button>
                <Button className='mr-2' variant='success' onClick={e => {this.setState({redirect: true})}}><span className="oi oi-plus m-auto"></span> New</Button></Col>
                </Form.Row>
                
            </Form>
        <Table bordered hover striped>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Value</td>
                    <td>Box (#)</td>
                    <td>Lot</td>
                    <td>Fragile</td>
                </tr>
            </thead>
            <tbody>
                {this.renderItems()}
            </tbody>
        </Table>
        {this.renderRedirect()}
    </div>
}

}