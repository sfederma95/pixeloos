import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Homepage from '../components/Homepage'
import AdoptPage from '../components/AdoptPage'
import UserPage from '../components/UserPage'
import Shop from '../components/Shop'
import Inventory from '../components/Inventory'
import NewUserForm from '../users/NewUserForm'
import UpdateUserForm from '../users/UpdateUserForm'
import Private from './Private'
import LoginForm from '../users/LoginForm'
import Game from '../components/Game'
import InteractWindow from '../components/InteractWindow'

function Routes({login, register}){
    return(
        <div>
            <Switch>
                <Route exact path='/'>
                    <Homepage />
                </Route>
                <Route exact path='/register'>
                    <NewUserForm register={register} />
                </Route>
                <Route exact path='/login'>
                    <LoginForm login={login} />
                </Route>
                <Private exact path='/:id/game'>
                    <Game />
                </Private>
                <Private exact path='/:id/:pet_id/feed'>
                    <InteractWindow action="Feed" />
                </Private>
                <Private exact path='/:id/:pet_id/play'>
                    <InteractWindow action='Play' />
                </Private>
                <Private exact path='/:id/update'>
                    <UpdateUserForm />
                </Private>
                <Private exact path='/:id/adopt'>
                    <AdoptPage />
                </Private>
                <Private exact path='/users/:id'>
                    <UserPage  />
                </Private>
                <Private exact path='/:id/shop'>
                    <Shop />
                </Private>
                <Private exact path='/:id/inventory'>
                    <Inventory />
                </Private>
                <Redirect to='/' />
            </Switch>
        </div>
    )
}

export default Routes; 