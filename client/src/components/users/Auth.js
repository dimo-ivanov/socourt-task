class Auth {
  // static saveUser (user) {
  //   window.localStorage.setItem('user', JSON.stringify(user))
  // }

  // static removeUser () {
  //   window.localStorage.removeItem('user')
  // }

  static authenticateUser (token, user) {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  static isUserAuthenticated () {
    return window.localStorage.getItem('token') !== null
  }

  static deauthenticateUser () {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
  }

  static getToken () {
    return window.localStorage.getItem('token')
  }

  static getUser () {
    const userJson = window.localStorage.getItem('user')
    if (userJson) {
      return JSON.parse(userJson)
    }

    return {}
  }
}

export default Auth
