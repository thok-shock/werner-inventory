import React from 'react';
import BoxItem from './BoxItem';
import { Table, Form, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default class BoxOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    renderBoxes() {
        if(this.props && this.props.boxes && this.props.boxes.length > 0) {
            return this.props.boxes.map(box => {
                return <BoxItem key={box.boxID} box={box} items={this.props.items} lots={this.props.lots} />
            })
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect push to='/new?type=box' />
        } else {
            return <div> </div>
        }
    }

    render() {
        return (
            <div>
            <h2>Boxes</h2>
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
                        <td>Fragile</td>
                        <td>Lot</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderBoxes()}
                </tbody>
            </Table>
            {this.renderRedirect()}
            </div>
        )
    }
}