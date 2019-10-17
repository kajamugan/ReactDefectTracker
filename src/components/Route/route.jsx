import React, { Component } from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Project from '../Pages/Forms/project'
import Defect from '../Pages/Forms/defect'
export default class route extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path='/project' component={Project}/>
                        <Route path='/defect' component={Defect}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
