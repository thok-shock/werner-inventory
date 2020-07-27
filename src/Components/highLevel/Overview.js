import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ItemOverview from "../ItemOverview";
import BoxOverview from "../BoxOverview";
import LotOverview from "../LotOverview";
import { loadItems, loadBoxes, loadLots } from "../loadFunctions";

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      boxes: {},
      lots: [],
      filteredItems: [],
      filteredBoxes: [],
    };
  }

  componentDidMount() {
    Promise.all([loadItems(), loadBoxes(), loadLots()]).then((reso) => {
      this.setState(
        { items: reso[0], boxes: reso[1], lots: reso[2] },
        function () {
          this.filterByLot(this.props.selectedLot);
        }
      );
    });
  }

  updateFilter(e) {
      this.props.updateState(e);
      this.filterByLot(e.target.value)
  }

  filterByLot(filter) {
    var filteredItems = JSON.parse(JSON.stringify(this.state.items));
    var filteredBoxes = JSON.parse(JSON.stringify(this.state.boxes));
    //console.log("here");
    filteredItems = filteredItems.filter((item) => {
        //console.log(item.lotID + ' ' + filter)
      if (item.lotID == filter) {
          //console.log('match')
        return true;
      } else {
          //console.log('returning false')
        return false;
      }
    });
    filteredBoxes = filteredBoxes.filter((box) => {
      if (box.lotID == filter) {
        return true;
      } else {
        return false;
      }
    });
    this.setState({filteredItems: filteredItems, filteredBoxes: filteredBoxes})
  }

  determineLots(lots) {
    if (lots && lots.length > 0) {
      return lots.map((lot) => {
        return (
          <option key={lot.lotID} value={lot.lotID}>
            {lot.lotName}
          </option>
        );
      });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <Container className="p-0">
              <Row>
                <Col md={8}>
                  <h2>Werner Inventory System</h2>
                </Col>
                <Col md={4}>
                  <Form className="d-flex flex-row">
                    <div className="m-2" style={{ whiteSpace: "nowrap" }}>
                      Viewing Lot:
                    </div>
                    <Form.Control
                      as="select"
                      id="selectedLot"
                      value={this.props.selectedLot}
                      onChange={(e) => {
                        this.updateFilter(e);
                      }}
                    >
                      {this.determineLots(this.state.lots)}
                    </Form.Control>
                  </Form>
                </Col>
              </Row>
            </Container>

            <p>
              Welcome Back. Here's an overview of your lot.
            </p>
          </Col>
        </Row>
        {/*<Row>
          <Col md={12}>
            <LotOverview lots={this.state.lots} />
          </Col>
        </Row>*/}
        <Row>
          <Col md={12}>
            <hr />
            <BoxOverview
              boxes={this.state.filteredBoxes}
              items={this.state.items}
              lots={this.state.lots}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <hr />
            <ItemOverview items={this.state.filteredItems} lots={this.state.lots} />
          </Col>
        </Row>
      </Container>
    );
  }
}
