import React, { Component } from 'react'
import bookActions from '../../actions/BookActions'
import bookStore from '../../stores/BookStore'
import SideMenu from './SideMenu'
import Book from './Book'

class ListBooksPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      books: []
    }

    this.handleBooks = this.handleBooks.bind(this)

    bookStore.on(
      bookStore.eventTypes.BOOKS_ALL,
      this.handleBooks
    )
  }

  componentWillMount () {
    bookActions.getAll()
  }

  componentWillUnmount () {
    bookStore.removeListener(
      bookStore.eventTypes.BOOKS_ALL,
      this.handleBooks
    )
  }

  handleBooks (data) {
    if (data.error) {
      console.log(data.error)
    } else {
      this.setState({
        books: data
      })
    }
  }

  getBookDetails (id) {
    this.props.history.push(`/book/${id}`)
  }

  render () {
    const { books } = this.state

    return (
      <div>
        <h2>LIST PAGE</h2>
        <SideMenu />

        <h3>Books</h3>
        {books.length > 0
          ? (books.map(book => (
            <Book
              onClick={() => this.getBookDetails(book._id)}
              {...book}
              key={book._id} />
          )))
          : (<div>
            <span>No books in database</span>
          </div>)
        }
      </div>
    )
  }
}

export default ListBooksPage
