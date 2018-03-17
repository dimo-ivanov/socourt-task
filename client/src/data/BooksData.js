import Data from './Data'

const baseUrl = '/api'

class BooksData {
  static getAll () {
    return Data.get(`${baseUrl}/books`)
  }

  static searchByGenre (searchedString) {
    return Data.post(`${baseUrl}/genres/search`, searchedString)
  }

  static searchByName (searchedString) {
    return Data.post(`${baseUrl}/books/search`, searchedString)
  }

  static getBookDetails (id) {
    return Data.get(`${baseUrl}/books/details/${id}`)
  }
}

export default BooksData
