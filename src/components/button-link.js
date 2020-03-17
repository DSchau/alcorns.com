/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

export default props => (
  <Link
    sx={{
      ':hover': {
        borderColor: `text`,
        backgroundColor: `background`,
        color: `text`,
      },
      borderWidth: 4,
      borderColor: `transparent`,
      borderStyle: `solid`,
      display: `inline-block`,
      fontSize: 20,
      textDecoration: `none`,
      backgroundColor: `text`,
      color: `background`,
      pt: 1,
      pb: 1,
      pr: 2,
      pl: 2,
      mt: 2,
      mb: 1,
    }}
    {...props}
  />
)
