import React from 'react';

export default class ItemRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lotName: ''
        }
    }

    componentDidMount() {
        this.determineLotName()
    }

    determineLotName() {
        this.props.lots.forEach(lot => {
            if (this.props.item.lotID === lot.lotID) {
                this.setState({lotName: lot.lotName});
            }
        })
    }

    render() {
        return <tr>
            <td>{this.props.item.itemID}</td>
            <td>{this.props.item.itemName}</td>
            <td>${this.props.item.itemPrice}</td>
            <td>{this.props.item.boxID}</td>
    <td>{this.state.lotName}</td>
            <td>{this.props.item.itemFragile}</td>
        </tr>
    }
}