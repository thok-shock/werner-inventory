import React from 'react'
import ReactDOM from 'react-dom'
import ItemOverview from './Components/ItemOverview'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
import BoxOverview from './Components/BoxOverview'
import LotOverview from './Components/LotOverview'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Overview from './Components/highLevel/Overview'
import New from './Components/Reusable/New'
import WISNavbar from './Components/highLevel/WISNavbar'
import AllBoxLabels from './Components/highLevel/AllBoxLabels'
import Box from './Components/highLevel/Box'
import BoxRoutes from './Components/highLevel/BoxRoutes'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    

    render() {
        return <div>
            <WISNavbar />
        <Switch>
            <Route path='/overview'>
                <Overview />
            </Route>
            <Route path='/box'>
                <BoxRoutes />
            </Route>
            <Route path='/new'>
                <New />
            </Route>
            <Route path='/allBoxes'>
                <AllBoxLabels />
            </Route>
            <Route path='/'>
                <Overview />
            </Route>
        </Switch>
            </div>
    }
}

const wrapper = document.getElementById('root')
wrapper ? ReactDOM.render(<Router><Main /></Router>, wrapper) : console.log('Unable to locate root')
