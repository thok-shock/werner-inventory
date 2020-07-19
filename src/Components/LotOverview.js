import React from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import LotItem from './LotItem'

export default class LotOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    renderLots() {
        if(this.props && this.props.lots && this.props.lots.length > 0) {
            return this.props.lots.map(lot => {
                return <LotItem key={lot.lotID} lot={lot} />
            })
        }
    }

    render() {
        return <div>
            <h2>Lots</h2>
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
            <Table striped hover bordered>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Lot Name</td>
                    <td>Lot Status</td>
                </tr>
            </thead>
            <tbody>
                {this.renderLots()}
            </tbody>
        </Table>
            </div>
    }
}