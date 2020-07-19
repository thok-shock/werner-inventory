import React from "react";

export default class BoxItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      lotName: "",
      fragile: 'No'
    };
  }

  componentDidMount() {
    this.determineBoxValue();
  }

  determineBoxValue() {
    let value = 0;
    this.props.items.forEach((item) => {
      //console.log(item.itemPrice);
      if (item.boxID === this.props.box.boxID) {
        value += item.itemPrice;
      }
    });
    this.setState({ value: value }, this.determineLotName());
  }

  determineLotName() {
    this.props.lots.forEach((lot) => {
      if (lot.lotID === this.props.box.lotID) {
        this.setState({lotName: lot.lotName },
            this.determineFragile());
      }
    });
  }

  determineFragile() {
      let fragile = false;
      this.props.items.forEach((item) => {
          if (item.boxID === this.props.box.boxID) {
              if (item.itemFragile) {
                fragile = true;
              }
          }
      })
      if (fragile) {
          this.setState({fragile: 'Yes'})
      }
  }

  render() {
    return (
      <tr>
        <td>{this.props.box.boxID}</td>
        <td>{this.props.box.boxName}</td>
        <td>${this.state.value}</td>
    <td>{this.state.fragile}</td>
        <td>{this.state.lotName}</td>
        <td>{this.props.box.boxStatus}</td>
      </tr>
    );
  }
}
