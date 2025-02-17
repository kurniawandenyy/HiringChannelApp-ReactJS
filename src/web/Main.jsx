import React from 'react';
import { Switch, Route } from 'react-router-dom'

//import component
import Card from './components/Card'
import Login from './components/Login'
import Register from './components/Register'
import EngineerProfile from './components/EngineerProfile'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'

function Main(){
    return(
        <Switch>
            <Route exact path='/' component={Card}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/engineerprofile/:id" component={EngineerProfile} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/edit/:id" component={EditProfile} />
        </Switch>
    )
}

export default Main