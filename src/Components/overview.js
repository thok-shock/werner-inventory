import React from 'react';
import { Table } from 'react-bootstrap';

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: {}
        } //will need to load data at some point
    }


componentDidMount() {
    this.loadInventory()
    .then(res => {
        this.setState({inventory: res})
    })
    .catch(err => {
        alert('Something went wrong')
        console.log(err)
    })
}

//do something with this once we have an API
loadInventory() {
    return new Promise((resolve, reject) => {
        return true;
    })
}

render() {
    return <div>
        <Table>
            <thead>
                <tr>
                    <td>#</td>
                </tr>
            </thead>
        </Table>
    </div>
}

}