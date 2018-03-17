import dispatcher from '../dispatcher'

const bookActions = {
  types: {
    GET_ALL: 'GET_ALL_BOOKS',
    GENRE_SEARCH: 'SEARCH_BY_GENRE',
    NAME_SEARCH: 'SEARCH_BY_NAME',
    BOOK_DETAILS: 'GET_BOOK_DETAILS'
  },
  getAll () {
    dispatcher.dispatch({
      type: this.types.GET_ALL
    })
  },
  searchByGenre (searchedString) {
    dispatcher.dispatch({
      type: this.types.GENRE_SEARCH,
      searchedString
    })
  },
  searchByName (searchedString) {
    dispatcher.dispatch({
      type: this.types.NAME_SEARCH,
      searchedString
    })
  },
  getDetails (id) {
    dispatcher.dispatch({
      type: this.types.BOOK_DETAILS,
      id
    })
  }
}

export default bookActions
