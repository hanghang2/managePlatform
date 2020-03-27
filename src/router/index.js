import React, {Component, Fragment} from 'react'
import {HashRouter,BrowserRouter, Switch, Route,Redirect} from 'react-router-dom'

import ContainerView from '../containers/ContainerView'

class RouteConfig extends Component {
    render() {
        return (
            <Fragment>
                <HashRouter>
                    <Switch>
                        <ContainerView></ContainerView>
                    </Switch>
                </HashRouter>
            </Fragment>
        )
    }
}

export default RouteConfig;
