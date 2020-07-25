import React from "react";
import { loadBoxes, loadItems } from "../loadFunctions";
import QRCode from "qrcode.react";
import { Container, Row } from "react-bootstrap";

export default class AllBoxLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [],
      items: [],
    };
  }

  componentDidMount() {
    Promise.all([loadBoxes(), loadItems()]).then((reso) => {
      this.setState({ boxes: reso[0], items: reso[1] });
    });
  }

  determineFragile(box) {
    let fragile = false;
    if (this.state.items && this.state.items.length > 0) {
      this.state.items.forEach((item) => {
        if (item.boxID === box.boxID) {
          if (item.itemFragile) {
            fragile = true;
          }
        }
      });
    }
    return fragile;
  }

  determineToPrintFragile(box) {
    if (this.determineFragile(box)) {
        return <h1 class='text-danger'><strong>FRAGILE</strong></h1>;
      }
      return null;
  }

  determineCodes() {
    if (this.state.boxes && this.state.boxes.length > 0) {
      return this.state.boxes.map((box) => {
        return (
          <div  key={box.boxID} className="m-5 text-center d-flex flex-column">
              <img src='/img/WIS (1).png' width='280px;' className='m-auto mb-5'></img>
            <QRCode size='205'
              value={"https://wis.rswerner.com/box/" + box.boxID}
            ></QRCode>
            <h3>BOX {box.boxID}</h3>
                {this.determineToPrintFragile(box)}
          </div>
        );
      });
    }
  }

  render() {
    return (
      <Container>
        <Row style={{'alignItems': 'end'}}>{this.determineCodes()}</Row>
      </Container>
    );
  }
}
