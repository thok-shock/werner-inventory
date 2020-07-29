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
    if (this.props.items.length > 0) {
      this.props.items.forEach((item) => {
        //console.log(item.itemPrice);
        if (item.boxID === this.props.box.boxID) {
          value += item.itemPrice;
        }
      });
      this.setState({ value: value });
    } else {
      this.setState({value: 'NaN'})
    }
  }

  determineLotName(box) {
    if (this.props.lots.length > 0) {
      return this.props.lots.map((lot) => {
        if (lot.lotID === box.lotID) {
        return <div key={lot.lotID}>{lot.lotName}</div>
        } else {
          return null
        }
      });
    } else {
      return <div>NaN</div>
    }
    
  }

  determineFragile(box) {
      let fragile = false;
      if (this.props.items.length > 0) {
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
      } else {
        return <div>NaN</div>
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
