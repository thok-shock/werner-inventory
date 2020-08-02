import { Switch, useLocation, useRouteMatch, Redirect, Route } from "react-router-dom";
import React from 'react'
import Item from "../lowLevel/Item";


export default function ItemRoutes(props) {
    let { path, url } = useRouteMatch()

    return <Switch>
        <Route exact path={`${path}`}>
            <Redirect push to='/overview' />
        </Route>
        <Route path={`${path}/:itemID`} render={(routeDetails) => {
            return <Item {...props} {...routeDetails}  />
        }}>

        </Route>
        
    </Switch>
}