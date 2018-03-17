import React, { Component } from 'react'
import Input from '../common/forms/Input'
import bookActions from '../../actions/BookActions'

class NameSearchForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      search: ''
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  handleUserChange (event) {
    this.setState({ search: event.target.value })
  }

  handleSearch (event) {
    event.preventDefault()
    bookActions.searchByName(this.state)
  }

  render () {
    return (
      <form>
        <h4>Search by Name</h4>
        <Input
          onChange={this.handleUserChange} />
        <input
          type='submit'
          value='GO'
          onClick={this.handleSearch} />
      </form>
    )
  }
}

export default NameSearchForm
