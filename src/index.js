import React from "react";
import ReactDOM from "react-dom";
import ItemOverview from "./Components/ItemOverview";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import BoxOverview from "./Components/BoxOverview";
import LotOverview from "./Components/LotOverview";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Overview from "./Components/highLevel/Overview";
import New from "./Components/Reusable/New";
import WISNavbar from "./Components/highLevel/WISNavbar";
import AllBoxLabels from "./Components/highLevel/AllBoxLabels";
import Box from "./Components/highLevel/Box";
import BoxRoutes from "./Components/highLevel/BoxRoutes";
import Footer from "./Components/highLevel/Footer";
import Tags from "./Components/highLevel/Tags";
import { loadItems, loadBoxes, loadLots } from './Components/loadFunctions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLot: 1,
      items: [],
      boxes: [],
      lots: [],
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(e) {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }

  componentDidMount() {
    Promise.all([loadItems(), loadBoxes(), loadLots()]).then((reso) => {
      this.setState({ items: reso[0], boxes: reso[1], lots: reso[2] });
    });
  }

  render() {
    return (
      <div>
        <WISNavbar />
        <Switch>
          <Route path="/overview">
            <Overview
              selectedLot={this.state.selectedLot}
              updateState={this.updateState}
              items={this.state.items}
              boxes={this.state.boxes}
              lots={this.state.lots}
            />
          </Route>
          <Route path="/box">
            <BoxRoutes />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/allBoxes">
            <AllBoxLabels />
          </Route>
          <Route path="/tags">
            <Tags selectedLot={this.state.selectedLot} lots={this.state.lots} boxes={this.state.boxes} items={this.state.items} />
          </Route>
          <Route path="/">
            <Redirect push to="/overview" />
          </Route>
        </Switch>
        <br />
        <Footer />
      </div>
    );
  }
}

const wrapper = document.getElementById("root");
wrapper
  ? ReactDOM.render(
      <Router>
        <Main />
      </Router>,
      wrapper
    )
  : console.log("Unable to locate root");
