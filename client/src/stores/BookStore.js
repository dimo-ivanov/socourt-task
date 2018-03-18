import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import bookActions from '../actions/BookActions'
import BooksData from '../data/BooksData'

class BookStore extends EventEmitter {
  getAll () {
    BooksData
      .getAll()
      .then(data => this.emit(this.eventTypes.BOOKS_ALL, data))
  }

  searchByGenre (searchedString) {
    BooksData
      .searchByGenre(searchedString)
      .then(data => this.emit(this.eventTypes.BOOKS_ALL, data))
  }

  searchByName (searchedString) {
    BooksData
      .searchByName(searchedString)
      .then(data => this.emit(this.eventTypes.BOOKS_ALL, data))
  }

  getBookDetails (id) {
    BooksData
      .getBookDetails(id)
      .then(data => this.emit(this.eventTypes.BOOK_FETCHED, data))
  }

  createBook (book) {
    BooksData
      .createBook(book)
      .then(data => this.emit(this.eventTypes.BOOK_CREATED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case bookActions.types.GET_ALL: {
        this.getAll()
        break
      }
      case bookActions.types.GENRE_SEARCH: {
        this.searchByGenre(action.searchedString)
        break
      }
      case bookActions.types.NAME_SEARCH: {
        this.searchByName(action.searchedString)
        break
      }
      case bookActions.types.BOOK_DETAILS: {
        this.getBookDetails(action.id)
        break
      }
      case bookActions.types.CREATE: {
        this.createBook(action.book)
        break
      }
      default: break
    }
  }
}

let bookStore = new BookStore()

bookStore.eventTypes = {
  BOOKS_ALL: 'got_all_books',
  BOOK_FETCHED: 'book_details_fetched',
  BOOK_CREATED: 'book_created'
}

dispatcher.register(bookStore.handleAction.bind(bookStore))

export default bookStore
