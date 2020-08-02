import React from 'react'
import BetterItemRow from '../lowLevel/BetterItemRow'
import { Spinner, Form, Col, Row, Container, Table, Button } from 'react-bootstrap'

/**
 * Converts JSON Array of Items into Table Rows that contain table data
 * @param {Array} items Array of JSON items, will return a spinner if none provided
 * @param {Array} lots The lots to search through
 */
function renderItems(items, lots) {
    if (items && items.length > 0 && lots && lots.length > 0) {
        return items.map((item) => {
            //console.log(item)
            return (<BetterItemRow key={item.itemID} item={item} lotName={determineLotForItem(item.lotID, lots)} />)
        })
    } else {
        return (<div>
            <Spinner />
        </div>)
    }
}

/**
 * Returns a React-Router Redirect if given a true value
 * @param {boolean} redirect whether or not the page should redirect
 */
function renderRedirect(redirect) {
    return redirect ? <Redirect push to='/new?type=item' /> : <br />
}

/**
 * Will take a JSON representation of an item and will search through the given lots to determine which lot it is a part of
 * @param {int} itemID
 * @param {Array} lots 
 */
function determineLotForItem(itemID, lots) {
    var lotName = ''
        lots.forEach(lot => {
            if (itemID === lot.lotID) {
                lotName = lot.lotName
            }
        })
    return lotName
}

export default class BetterItemOverview extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    render() {
        return <div>
        <h2>Items</h2>
        <Form>
                <Form.Row>
                    <Col xs={7}>
                    <Form.Group>
                    
                    <Form.Control className='searchBox' id='searchString'></Form.Control>
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
                {renderItems(this.props.items, this.props.lots)}
            </tbody>
        </Table>
        {renderRedirect(this.state.redirect)}
    </div>
    }
}