import React from 'react';
import BoxItem from './BoxItem';
import { Table, Form, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Fuse from 'fuse.js'

export default class BoxOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            sortedBoxes: [],
            sortString: ''
        }

        this.updateState = this.updateState.bind(this)
    }

    componentDidMount() {
        console.log(this.props.boxes)
        this.sortBoxes(this.props.boxes, this.state.sortString)
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.boxes !== prevProps.boxes) {
            this.sortBoxes(this.props.boxes, this.state.sortString);
        }
      }

    renderBoxes() {
        if(this.state && this.state.sortedBoxes && this.state.sortedBoxes.length > 0) {
            return this.state.sortedBoxes.map(box => {
                return <BoxItem key={box.boxID} box={box} items={this.props.items} lots={this.props.lots} />
            })
        }
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect push to='/new?type=box' />
        } else {
            return <div> </div>
        }
    }

    sortBoxes(boxes, searchString) {
        const options = {
            includeScore: true,
            keys: ['boxName']
          }
          if (searchString === '') {
              //console.log('showing all')
              //console.log(boxes)
              this.setState({sortedBoxes: boxes})
          } else {
              console.log(boxes)
              console.log(searchString)
            const fuse = new Fuse(boxes, options)

          const result = fuse.search(searchString)
          //console.log(result)
          let boxArray = result.item
            if (result.length > 0) {
                boxArray = result.map(box => {
                    return box.item
                })
            }          
            //console.log(boxArray)
          this.setState({sortedBoxes: boxArray})
          }
          
    }

    updateState(e) {

        this.setState({...this.state, [e.target.id]: e.target.value}, () => {
            this.sortBoxes(this.props.boxes, this.state.sortString)
        })
    }

    render() {
        return (
            <div>
            <h2>Boxes</h2>
            <Form>
                <Form.Row>
                    <Col xs={7}>
                    <Form.Group>
                    
                    <Form.Control className='searchBox' id='sortString' onChange={this.updateState} value={this.state.sortString} ></Form.Control>
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
                        <td>Fragile</td>
                        <td>Lot</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderBoxes()}
                </tbody>
            </Table>
            {this.renderRedirect()}
            </div>
        )
    }
}