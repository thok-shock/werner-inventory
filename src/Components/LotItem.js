import React from 'React';

export default class LotItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        return <tr>
            <td>{this.props.lot.lotID}</td>
            <td>{this.props.lot.lotName}</td>
            <td>{this.props.lot.lotStatus}</td>
        </tr>
    }
}