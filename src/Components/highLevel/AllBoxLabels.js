import React from "react";
import { loadBoxes, loadItems } from "../loadFunctions";
import QRCode from "qrcode.react";
import { Container, Row } from "react-bootstrap";


function filterTags(boxes, selectedBoxes) {
  const intBox = selectedBoxes.map(select => {
    return parseInt(select)
  })
  //console.log(intBox)
  return boxes.filter(box => intBox.includes(box.boxID))
}

export default class AllBoxLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [],
      items: [],
      filteredBoxes: []
    };
  }

  componentDidMount() {
    Promise.all([loadBoxes(), loadItems()]).then((reso) => {
      this.setState({ boxes: reso[0], items: reso[1] }, function() {
        const params = new URLSearchParams(window.location.search)
        if (params.has('boxID')) {
          const newArray = params.get('boxID').split(',')
        //console.log(newArray)
      const filteredBoxes = filterTags(this.state.boxes, newArray)
      //console.log(filteredBoxes)
      this.setState({filteredBoxes: filteredBoxes})
        } else {
          this.setState({filteredBoxes: this.state.boxes})
        }
      
      });
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
      return (
        <h1 className="text-danger">
          <strong>FRAGILE</strong>
        </h1>
      );
    }
    return null;
  }

  determineIfRow(num) {
    if (num % 2 === 0) {
      return true
    }
  }

  determineCodes(boxPair) {
    console.log(boxPair)
      return boxPair.map((box, count) => {
          //console.log(box)
          if (box) {
        return (
            <td
              className="inline-block"
              style={{ pageBreakInside: "avoid", pageBreakAfter: "auto" }}
              key={box.boxID}
            >
              <div
                className="mx-5  mb-1 text-center d-flex flex-column"
              >
                <img
                  src="/img/WIS (1).png"
                  width="280px;"
                  className="m-auto mb-5"
                ></img>
                <QRCode
                  size="256"
                  value={"https://wis.rswerner.com/box/" + box.boxID}
                ></QRCode>
                <h3>BOX {box.boxID}</h3>
                {this.determineToPrintFragile(box)}
              </div>
            </td>
        );} else {
          return <td key={count}></td>
        }
      });
  }

  printCode(box) {
    return (
        <td
          className="inline-block"
          style={{ pageBreakInside: "avoid", pageBreakAfter: "auto" }}
        >
          <div
            key={box.boxID}
            className="m-5 text-center d-flex flex-column"
          >
            <img
              src="/img/WIS (1).png"
              width="280px"
              className="m-auto mb-5"
            ></img>
            <QRCode
              size={256}
              value={"https://wis.rswerner.com/box/" + box.boxID}
            ></QRCode>
            <h3>BOX {box.boxID}</h3>
            {this.determineToPrintFragile(box)}
          </div>
        </td>
    );
  }

  renderTable() {
    if (this.state.filteredBoxes && this.state.filteredBoxes.length > 0) {
        let pairArray = []
        let num = 0

        let boxes = JSON.parse(JSON.stringify(this.state.filteredBoxes))
        //console.log(boxes)
        
        for (var i = 0; i < boxes.length; i+=2) {
            var smallArray = []
            smallArray[0] = boxes[i]
            smallArray[1] = boxes[i+1]
            pairArray.push(smallArray) 
            //console.log(pairArray)
        }
        return <table>
            <tbody>
            {this.determineData(pairArray)}
            </tbody>
        </table>
    } else {
        return <div>Loading...</div>
    }
  }

  determineData(boxPairs) {
      let num = 0;
      return boxPairs.map((box, index) => {
        //console.log(box)
            return <tr key={index} style={{verticalAlign: 'top'}}>
                {this.determineCodes(box)}
            </tr>
      })
          

  }

  render() {
    return (
      <Container>
        <div className="d-table">{this.renderTable()}</div>
      </Container>
    );
  }
}
