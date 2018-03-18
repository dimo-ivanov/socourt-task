import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ListBooksPage from '../../items/ListBooksPage'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'
import BookDetails from '../../items/BookDetails'
import BookAddForm from '../../items/BookAddForm'

const Routes = () => (
  <Switch>
    <PrivateRoute path='/' exact component={ListBooksPage} />
    <Route path='/users/register' component={RegisterPage} />
    <Route path='/users/login' component={LoginPage} />
    <PrivateRoute path='/users/logout' component={LogoutPage} />
    <Route path='/book/:id' component={BookDetails} />
    <PrivateRoute path='/books/add' component={BookAddForm} />
  </Switch>
)

export default Routes
