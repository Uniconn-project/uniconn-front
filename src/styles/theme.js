import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f00'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#121214'
    },
    text: {
      main: '#fff'
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        color: '#fff'
      },
      input: {
        color: '#fff'
      }
    }
  }
})

export default theme
