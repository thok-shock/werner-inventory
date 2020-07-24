import React from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider'
import {loadItems, loadBoxes, loadLots} from '../loadFunctions'
import { addItem } from '../addFunctions'
import { Redirect } from 'react-router-dom'

export default class New extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            boxes: [],
            lots: [],
            type: '',
            success: false
        }

        this.updateState = this.updateState.bind(this)
        this.determineActive = this.determineActive.bind(this)
        this.determineBoxes = this.determineBoxes.bind(this)
        this.determineLots = this.determineLots.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        Promise.all([loadItems(), loadBoxes(), loadLots()]).then(reso => {
            this.setState({items: reso[0], boxes: reso[1], lots: reso[2]})
        })
    }

    updateState(e) {
        //console.log(e)
        this.setState({...this.state, [e.target.id]: e.target.value})
    }

    determineLots() {
        if (this.state.lots && this.state.lots.length > 0) {
            return this.state.lots.map(lot => {
                return <option key={lot.lotID} value={lot.lotID}>{lot.lotName}</option>
            })
        } else {
            return <option>Loading...</option>
        }
    }

    determineBoxes() {
        if (this.state.boxes && this.state.boxes.length > 0) {
            return this.state.boxes.map(box => {
            return <option key={box.boxID} value={box.boxID}>{box.boxID} - {box.boxName}</option>
            })
        } else {
            return <option>Loading...</option>
        }
    }

    renderSpecifics() {
        if (this.state.type === '') {
            return <div>Please select type.</div>
        } else if (this.state.type === 'lot') {
            return <div>
                <Form.Group controlId='name'>
                    <Form.Label>Lot Name</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
            </div>
        } else if (this.state.type === 'box') {
            return <div>
                <Form.Group controlId='name'>
                    <Form.Label>Box Name</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
                <Form.Group controlId='lot'>
                    <Form.Label>Lot</Form.Label>
                    <Form.Control as='select'>
                        {this.determineLots()}
                    </Form.Control>
                </Form.Group>
            </div>
        } else if (this.state.type === 'item') {
            return <div>
                <Form.Group controlId='name'>
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea'></Form.Control>
                </Form.Group>
                <Form.Group controlId='box'>
                    <Form.Label>Box</Form.Label>
                    <Form.Control as='select'>
                        {this.determineBoxes()}
                    </Form.Control>
                </Form.Group>
                <Row>
                <Form.Group as={Col} controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number'></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='quantity'>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type='number'></Form.Control>
                </Form.Group>
                </Row>
                
                <Form.Group controlId='fragile'>
                    <Form.Label>Fragile</Form.Label>
                    <Form.Control as='select'>
                        <option value='1'>Yes</option>
                        <option value='0'>No</option>
                    </Form.Control>
                </Form.Group>
            </div>
        }
    }

    determineActive() {
        if (this.state.type === '') {
            return true
        } else {
            return false
        }
    }

    handleSubmit() {
        let jsonData = {}
        let url = ''
        if (this.state.type === 'lot') {
            jsonData = {
                lotName: document.getElementById('name').value
            }
            url = '/new/lot'
        } else if (this.state.type === 'box') {
            jsonData = {
                boxName: document.getElementById('name').value,
                boxDescription: document.getElementById('description').value,
                lotID: parseInt(document.getElementById('lot').value)
            }
            url ='/new/box'
        } else if (this.state.type === 'item') {
            jsonData = {
                itemName: document.getElementById('name').value,
                itemDescription: document.getElementById('description').value,
                itemPrice: parseInt(document.getElementById('price').value),
                itemQuantity: parseInt(document.getElementById('quantity').value),
                itemFragile: parseInt(document.getElementById('fragile').value),
                boxID: parseInt(document.getElementById('box').value)
            }
            url ='/new/item'
        }
        addItem(jsonData, url).then(res => {
            this.setState({success: true})
        })
        .catch(err => {
            console.log(err)
            alert('something went wrong')
        })
    }

    renderRedirect() {
        if (this.state.success) {
            return <Redirect to='/overview' />
        }
    }

    render() {
        return <div>
            <Container>
                <Row>
                    <Col md='8'  className='mb-3'>
                    <h2>Add To Inventory</h2>
                 <p>This page will allow you to add an item, box, or lot to the inventory system.</p>
                <Form id='new'>
                <Form.Group controlId='type'>
                    <Form.Label>Type</Form.Label>
                <Form.Control as='select' onChange={this.updateState}>
                    <option value=''>- Select -</option>
                    <option value='lot'>Lot</option>
                    <option value='box'>Box</option>
                    <option value='item'>Item</option>
                </Form.Control>
                </Form.Group>
                <hr />
                <h4>Specifics</h4>
                {this.renderSpecifics()}
                <hr />
                <Button disabled={this.determineActive()} onClick={this.handleSubmit}>Submit</Button>
            </Form>
                    </Col>
                    <Col md='4'>
                        <h2>Information</h2>
                    </Col>
                </Row>
            </Container>
            {this.renderRedirect()}
            
        </div>
    }
}