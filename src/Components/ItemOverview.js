import React from 'react';
import { Table, Navbar, Form, Col, Button } from 'react-bootstrap';
import ItemRow from './ItemRow';
import { useHistory, Redirect } from 'react-router-dom';
import Fuse from 'fuse.js'

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: {},
            redirect: null,
            sortedItems: [],
            searchString: ''
        } //will need to load data at some point
        this.updateState = this.updateState.bind(this)
        this.sortItems = this.sortItems.bind(this)
    }

    componentDidMount() {
        console.log(this.props.items)
        this.sortItems(this.props.items, this.state.searchString)
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.items !== prevProps.items) {
            this.sortItems(this.props.items, this.state.searchString);
        }
      }

renderItems() {
    if(this.state && this.state.sortedItems && this.state.sortedItems.length > 0) {
        return this.state.sortedItems.map(item => {
            return <ItemRow key={item.itemID} item={item} lots={this.props.lots} />
        })
    } else {
        return <tr><td>No items met search criteria.</td></tr>
    }
}

renderRedirect() {
    if (this.state.redirect) {
        return <Redirect push to='/new?type=item' />
    } else {
        return <div> </div>
    }
}

sortItems(items, searchString) {
    const options = {
        includeScore: true,
        keys: ['itemName']
      }
      if (searchString === '') {
          //console.log('showing all')
          //console.log(boxes)
          this.setState({sortedItems: items})
      } else {
          //console.log(items)
          //console.log(searchString)
        const fuse = new Fuse(items, options)

      const result = fuse.search(searchString)
      //console.log(result)
      let boxArray = result.item
        if (result.length > 0) {
            boxArray = result.map(box => {
                return box.item
            })
        }          
        //console.log(boxArray)
      this.setState({sortedItems: boxArray})
      }
      
}

updateState(e) {

    this.setState({...this.state, [e.target.id]: e.target.value}, () => {
        this.sortItems(this.props.items, this.state.searchString)
    })
}


render() {
    return <div>
        <h2>Items</h2>
        <Form>
                <Form.Row>
                    <Col xs={7}>
                    <Form.Group>
                    
                    <Form.Control className='searchBox' id='searchString' value={this.state.sortString} onChange={this.updateState} ></Form.Control>
                </Form.Group>
                    </Col>
                <Col xs={5}>
                <Button className='mr-2'>Search</Button>
                <Button className='mr-2' variant='success' onClick={e => {this.setState({redirect: true})}}><span className="oi oi-plus m-auto"></span> New</Button></Col>
                </Form.Row>
                
            </Form>
        <Table bordered hover striped>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Value</td>
                    <td>Box (#)</td>
                    <td>Lot</td>
                    <td>Fragile</td>
                </tr>
            </thead>
            <tbody>
                {this.renderItems()}
            </tbody>
        </Table>
        {this.renderRedirect()}
    </div>
}

}