import React from 'react'
import { BrowserRouter, Switch, Route, useRouteMatch } from 'react-router-dom'
import Box from './Box'
import { Button } from 'react-bootstrap';

export default function BoxRoutes() {
    let { path, url } = useRouteMatch();
     return <div>

     <Switch>
         <Route exact path={path}>
            <p>hi</p>
         </Route>
         <Route exact path={path + '/test'}>
            <div>test</div>
         </Route>
         <Route path={`${path}/:boxID`} component={Box}>
             
         </Route>
         
     </Switch>

     </div>
}