import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ItemOverview from '../ItemOverview';
import BoxOverview from '../BoxOverview';
import LotOverview from '../LotOverview';
import {loadItems, loadBoxes, loadLots} from '../loadFunctions'

export default class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: {},
            boxes: {},
            lots: {}
        }
    }

    componentDidMount() {
        Promise.all([loadItems(), loadBoxes(), loadLots()]).then(reso => {
            this.setState({items: reso[0], boxes: reso[1], lots: reso[2]})
        })
    }

    

    render() {
        return <Container>
        <Row>
            <Col md={12}>
            <LotOverview lots={this.state.lots} />
                
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
                <ItemOverview items={this.state.items} lots={this.state.lots} />
            </Col>
        </Row>
    </Container>
    }
}