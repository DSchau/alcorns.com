import React, { useEffect, useState } from 'react'

import AuthenticatedRoute from './authenticated-route'

export const AuthenticationContext = React.createContext({
  authenticated: false,
})

const LS_KEY = `__authenticated_status__`
const LS_PASSWORD_KEY = `__authenticated_pw__`
const LS_PASSWORD = process.env.GATSBY_PASSWORD

const getAuthStatus = userPassword => {
  const [pw, status] = [LS_PASSWORD_KEY, LS_KEY].map(key => {
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (e) {
      // we're good
    }
    return value
  })

  return status === true && pw === userPassword
}

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    setAuthenticated(getAuthStatus(LS_PASSWORD))
  }, [])

  const setAuthenticationWithLocalStorage = (status = true, password) => {
    if (password === LS_PASSWORD) {
      window.localStorage.setItem(LS_KEY, status)
      window.localStorage.setItem(LS_PASSWORD_KEY, password)
      setAuthenticated(status)
      return status
    }
    setAuthenticated(false)
    return false
  }
  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        setAuthenticated: setAuthenticationWithLocalStorage,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

const useAuth = () => React.useContext(AuthenticationContext)
export { AuthProvider, useAuth, AuthenticatedRoute }
