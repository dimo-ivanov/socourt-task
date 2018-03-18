import React, { Component } from 'react'
import FormHelpers from '../../utilities/FormHelpers'
import bookActions from '../../actions/BookActions'
import bookStore from '../../stores/BookStore'
import Input from '../common/forms/Input'
import toastr from 'toastr'

class BookAddForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {
        name: '',
        author: '',
        genre: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBookForm = this.handleBookForm.bind(this)
    this.handleBookCreation = this.handleBookCreation.bind(this)

    bookStore.on(
      bookStore.eventTypes.BOOK_CREATED,
      this.handleBookCreation
    )
  }

  componentWillUnmount () {
    bookStore.removeListener(
      bookStore.eventTypes.BOOK_CREATED,
      this.handleBookCreation
    )
  }

  handleChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'book')
  }

  handleBookForm (event) {
    event.preventDefault()
    if (!this.validateBook()) {
      return
    }

    bookActions.create(this.state.book)
  }

  handleBookCreation (data) {
    if (!data.success) {
      toastr.error(data.message)
    } else {
      this.setState({ book: {
        name: '',
        author: '',
        genre: ''
      } })
      toastr.success(data.message)
    }
  }

  validateBook () {
    const book = this.state.book
    let formIsValid = true
    let error = ''

    if (!book.name || !book.author || !book.genre) {
      error = 'Please fill in all fields.'
      formIsValid = false
    }

    if (error) {
      toastr.error(error)
    }

    return formIsValid
  }

  render () {
    return (
      <form>
        <h3>Add Book</h3>

        <Input
          name='name'
          type='text'
          placeholder='Name '
          value={this.state.book.name}
          onChange={this.handleChange} />

        <br />

        <Input
          name='author'
          type='text'
          placeholder='Author '
          value={this.state.book.author}
          onChange={this.handleChange} />

        <br />

        <Input
          name='genre'
          type='text'
          placeholder='Genre '
          value={this.state.book.genre}
          onChange={this.handleChange} />

        <br />

        <input type='submit' onClick={this.handleBookForm} />

      </form>
    )
  }
}

export default BookAddForm
