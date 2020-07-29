import React from 'react'
import { Form, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function renderBoxesIntoPrintRows(boxes, toggle) {
    
    if (boxes.length > 0) {
        return boxes.map((box) => {
            return <tr key={box.boxID}>
        <td><Form><Form.Control type='checkbox' onClick={e => {
            toggle(box.boxID)
        }}></Form.Control></Form></td>
        <td>{box.boxID}</td>
        <td>{box.boxName}</td>
    </tr>
        })
    }
    
}


export default class PrintList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            redirect: false
        }
        this.toggleSelected = this.toggleSelected.bind(this)
    }



    toggleSelected(id) {
        if (this.state.selected.includes(id)) {
            const newArray = JSON.parse(JSON.stringify(this.state.selected.filter(num => num != id
        )))
        this.setState({selected: newArray})
        } else {
            const newArray = JSON.parse(JSON.stringify(this.state.selected))
            newArray.push(id)
            this.setState({selected: newArray})
        }
    }

    render() {
        return <div><Table>
            <thead>
                <tr>
                    <td>
                        Print?
                    </td>
                    <td>#</td>
                    <td>Name</td>
                </tr>
            </thead>
            <tbody>
                {renderBoxesIntoPrintRows(this.props.boxes, this.toggleSelected)}
            </tbody>
            
        </Table>
        <Link to={'/allBoxes?boxID=' + this.state.selected} component={Button}>Test</Link>
        </div>
    }
}