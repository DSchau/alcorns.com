import Home from './home'

const lookup = {
  '/': Home,
}

export default path => {
  const existing = lookup[path]
  return existing || null
}
