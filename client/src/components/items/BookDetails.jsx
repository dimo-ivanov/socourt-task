import React, { Component } from 'react'
import bookActions from '../../actions/BookActions'
import bookStore from '../../stores/BookStore'

class BookDetails extends Component {
  constructor (props) {
    super(props)

    this.state = {
      book: {}
    }

    this.handleBook = this.handleBook.bind(this)

    bookStore.on(
      bookStore.eventTypes.BOOK_FETCHED,
      this.handleBook
    )
  }

  handleBook (data) {
    this.setState({
      book: data
    })
  }

  componentDidMount () {
    bookActions.getDetails(this.props.match.params.id)
  }

  componentWillUnmount () {
    bookStore.removeListener(
      bookStore.eventTypes.BOOK_FETCHED,
      this.handleBook
    )
  }

  render () {
    const { name, author, genre, createdOn, updatedOn } = this.state.book
    return (
      <div>
        <h4>Book Details</h4>
        Name: {name}
        <br />
        Author: {author}
        <br />
        Genre: {genre}
        <br />
        Added: {createdOn}
        <br />
        Updated: {updatedOn}
      </div>
    )
  }
}

export default BookDetails
