import React, { useEffect, useState } from 'react'

export const AuthenticationContext = React.createContext({
  authenticated: false,
})

const LS_KEY = `__authenticated_status__`

const getAuthStatus = () => {
  try {
    return JSON.parse(window.localStorage.getItem(LS_KEY))
  } catch (e) {
    return false
  }
}

function Authentication({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    setAuthenticated(getAuthStatus())
  }, [])

  const setAuthenticationWithLocalStorage = (status = true) => {
    setAuthenticated(status)
    window.localStorage.setItem(LS_KEY, status)
  }
  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        setAuthenticated: setAuthenticationWithLocalStorage,
      }}
    >
      <AuthenticationContext.Consumer>
        {children}
      </AuthenticationContext.Consumer>
    </AuthenticationContext.Provider>
  )
}

export default Authentication
