import React from 'react';
import { Switch, Route } from 'react-router-dom'

//import component
import Card from './components/Card'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

function Main(){
    return(
        <Switch>
            <Route exact path='/' component={Card} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={Profile} />
        </Switch>
    )
}

export default Main