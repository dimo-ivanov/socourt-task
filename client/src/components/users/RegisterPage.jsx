import React, { Component } from 'react'
import FormHelpers from '../../utilities/FormHelpers'
import RegisterForm from './RegisterForm'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'
import toastr from 'toastr'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456'
      }
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleUserForm = this.handleUserForm.bind(this)
    this.handleUserRegistration = this.handleUserRegistration.bind(this)

    userStore.on(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  handleUserForm (event) {
    event.preventDefault()
    if (!this.validateUser()) {
      return
    }
    userActions.register(this.state.user)
  }

  handleUserRegistration (data) {
    if (!data.success) {
      let firstError = data.message
      if (data.errors) {
        firstError = Object.keys(data.errors).map(k => data.errors[k])[0]
      }

      toastr.error(firstError)
    } else {
      toastr.success(data.message)
      this.props.history.push('/users/login')
    }
  }

  validateUser () {
    const user = this.state.user
    let formIsValid = true
    let error = ''

    if (user.password !== user.confirmPassword) {
      error = 'Password and confirmation password do not match.'
      formIsValid = false
    }

    if (error) {
      toastr.error(error)
    }

    return formIsValid
  }

  handleUserChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  render () {
    return (
      <div>
        <h1>Register User</h1>
        <RegisterForm
          user={this.state.user}
          onChange={this.handleUserChange}
          onSave={this.handleUserForm} />
      </div>
    )
  }
}

export default RegisterPage
