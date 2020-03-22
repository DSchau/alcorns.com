/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'

import { useAuth } from './authentication'

const Login = ({ children }) => {
  const { setAuthenticated } = useAuth()
  const [password, setPassword] = React.useState(``)
  const [invalid, setInvalid] = React.useState(false)
  const inputEl = React.useRef(null)
  return (
    <Styled.div>
      <Styled.div
        sx={{
          position: `fixed`,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: `rgba(255, 255, 255, 0.95)`,
          zIndex: 99,
        }}
      >
        <form
          onSubmit={ev => {
            ev.preventDefault()
            const success = setAuthenticated(true, password)
            if (success === false) {
              setInvalid(true)
              inputEl.current.focus()
            }
          }}
          sx={{
            height: `100%`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            justifyContent: `center`,
            overflow: `hidden`,
            width: [`100%`, `50%`, `25%`],
            padding: 2,
            margin: `0 auto`,
          }}
        >
          <label htmlFor="password" sx={{ fontWeight: `bold`, width: `100%` }}>
            Password:
            <input
              ref={inputEl}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={ev => {
                setPassword(ev.target.value)
              }}
              sx={{
                display: `block`,
                width: `100%`,
                mt: 1,
                mb: 1,
                padding: 2,
              }}
            />
            {invalid && (
              <p sx={{ color: `accent`, padding: 0, margin: 0 }}>
                Password is invalid
              </p>
            )}
          </label>
          <button
            type="submit"
            sx={{
              padding: 3,
              mt: 2,
              display: `inline-block`,
              backgroundColor: `text`,
              color: `background`,
              width: `100%`,
            }}
          >
            Login
          </button>
        </form>
      </Styled.div>
      {children}
    </Styled.div>
  )
}

function AuthenticatedRoute({ children }) {
  const { authenticated } = useAuth()
  console.log(authenticated)
  if (authenticated === undefined) {
    return null
  }
  const Wrapper = authenticated === true ? React.Fragment : Login
  return <Wrapper>{children}</Wrapper>
}

export default AuthenticatedRoute
