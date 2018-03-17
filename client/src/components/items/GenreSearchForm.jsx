import React, { Component } from 'react'
import Input from '../common/forms/Input'
import bookActions from '../../actions/BookActions'

class GenreSearchForm extends Component {
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
    bookActions.searchByGenre(this.state)
  }

  render () {
    return (
      <form>
        <h4>Search by Genre</h4>
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

export default GenreSearchForm
