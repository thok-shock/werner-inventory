import React from "react";
import { Redirect } from "react-router-dom";

export default class BoxItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      lotName: "",
      fragile: 'No',
      redirect: false
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
    this.setState({ value: value });
  }

  determineLotName(box) {
    return this.props.lots.map((lot) => {
      if (lot.lotID === box.lotID) {
      return <div key={lot.lotID}>{lot.lotName}</div>
      } else {
        return null
      }
    });
  }

  determineFragile(box) {
      let fragile = false;
      this.props.items.forEach((item) => {
          if (item.boxID === box.boxID) {
              if (item.itemFragile) {
                fragile = true;
              }
          }
      })
      if (fragile) {
        return <div className='text-danger'><strong>Yes</strong></div>
      } else {
        return <div className='text-muted'>No</div>
      }
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect push to={`/box/${this.props.box.boxID}`} />
    }
  }

  render() {
    return (
      <tr onClick={e => {
        this.setState({redirect: true})
      }} style={{cursor: 'pointer'}}>
        <td>{this.props.box.boxID}</td>
        <td>{this.props.box.boxName}</td>
        <td>${this.state.value}</td>
    <td>{this.determineFragile(this.props.box)}</td>
        <td>{this.determineLotName(this.props.box)}</td>
        <td>{this.props.box.boxStatus}</td>
        {this.renderRedirect()}
      </tr>
      
    );
  }
}
