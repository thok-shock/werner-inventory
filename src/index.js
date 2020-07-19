import React from 'react'
import ReactDOM from 'react-dom'
import ItemOverview from './Components/ItemOverview'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import BoxOverview from './Components/BoxOverview'
import LotOverview from './Components/LotOverview'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: {},
            boxes: {},
            lots: {},
        }
    }

    componentDidMount() {
        Promise.all([this.loadItems(), this.loadBoxes(), this.loadLots()]).then(reso => {
            this.setState({items: reso[0], boxes: reso[1], lots: reso[2]})
        })
    }

    loadItems() {
        return new Promise((resolve, reject) => {
            fetch('/items', {
                method: 'GET'
            })
            .then(res => {
                return res.json()
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                alert('Something went wrong')
                reject(err)
            })
        })
        
    }

    loadBoxes() {
        return new Promise((resolve, reject) => {
            fetch('/boxes', {
                method: 'GET'
            })
            .then(res => {
                return res.json()
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                alert('Something went wrong')
                reject(err)
            })
        })
    }

    loadLots() {
        return new Promise((resolve, reject) => {
            fetch('/lots', {
                method: 'GET'
            })
            .then(res => {
                return res.json()
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                alert('Something went wrong')
                reject(err)
            })
        })
    }

    render() {
        return <div>
            <Navbar>
            <Navbar.Brand>Werner Inventory System (WIS)</Navbar.Brand>
        </Navbar>
            <Container>
                <Row>
                    <Col md={12}>
                        <ItemOverview items={this.state.items} lots={this.state.lots} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <hr />
                        <BoxOverview boxes={this.state.boxes} items={this.state.items} lots={this.state.lots} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <hr />
                        <LotOverview lots={this.state.lots} />
                    </Col>
                </Row>
            </Container>
            </div>
    }
}

const wrapper = document.getElementById('root')
wrapper ? ReactDOM.render(<Main />, wrapper) : console.log('Unable to locate root')
