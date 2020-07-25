import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { loadBoxes, loadItems, loadBox, loadItemsOfBox, loadLots } from "../loadFunctions";
import ItemOverview from "../ItemOverview"


export default class Box extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            boxes: [],
            items: [],
            thisBox: [],
            thisBoxItems: [],
            lots: []
        }
    }

    componentDidMount() {
        Promise.all([loadBox(this.props.match.params.boxID), loadItemsOfBox(this.props.match.params.boxID), loadLots()]).then((reso) => {
          this.setState({ thisBox: reso[0], thisBoxItems: reso[1], lots: reso[2] }, () => {
          });
        })
        .catch(err => {
            console.log(err)
        })
      }

    render() {
        if(this.state.thisBox && this.state.thisBox.length > 0 && this.state.thisBoxItems && this.state.thisBoxItems.length > 0 && this.state.lots && this.state.lots.length > 0) {
            return <Container>
            <Row>
                <Col md={12}>
    <h2>Box {this.state.thisBox[0].boxID} - {this.state.thisBox[0].boxName}</h2>
    <p>{this.state.thisBox[0].boxDescription}</p>
    <ItemOverview items={this.state.thisBoxItems} lots={this.state.lots} />
                </Col>
            </Row>
        </Container>
        } else {
            return <Container>
                <Row>
                    <Col>
                    <p>Loading...</p>
                    </Col></Row></Container>
        }
       
    }
}