import React, { Component } from 'react'
import Auth from './Auth'
import FormHelpers from '../../utilities/FormHelpers'
import LoginForm from './LoginForm'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'

class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        email: 'test@test.com',
        password: '123456'
      }
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleUserForm = this.handleUserForm.bind(this)
    this.handleUserLogin = this.handleUserLogin.bind(this)

    userStore.on(
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin
    )
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin
    )
  }

  handleUserChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleUserForm (event) {
    event.preventDefault()
    if (!this.validateUser()) {
      return
    }
    userActions.login(this.state.user)
  }

  handleUserLogin (data) {
    if (!data.success) {
      toastr.error(data.message)
    } else {
      Auth.authenticateUser(data.token, data.user)
      // Auth.saveUser(data.user)
      toastr.success(data.message)
      this.props.history.push('/')
    }
  }

  validateUser () {
    const user = this.state.user
    let formIsValid = true
    let error = ''

    if (user.password.length < 4) {
      error = 'Invalid credentials. '
      formIsValid = false
    }

    if (error) {
      toastr.error(error)
    }

    return formIsValid
  }

  render () {
    return (
      <div>
        <h1>Login Into Your Account</h1>
        <LoginForm
          user={this.state.user}
          onChange={this.handleUserChange}
          onSave={this.handleUserForm} />
      </div>
    )
  }
}

export default LoginPage
