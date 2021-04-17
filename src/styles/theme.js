import { createMuiTheme } from '@material-ui/core/styles'
import { red, purple, green } from '@material-ui/core/colors'

// Create a theme instance.
const type = 'light'
const palette = {
  type,
  primary: {
    main: purple[500],
    light: purple[400],
    dark: purple[700]
  },
  secondary: {
    main: green.A400
  },
  error: {
    main: red.A400
  },
  background: {
    default: type === 'dark' ? '#212124' : '#fff'
  }
}

const theme = createMuiTheme({
  palette,
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor:
          type === 'dark'
            ? 'rgba(150, 150, 150, .02)'
            : 'rgba(100, 100, 100, .1)'
      }
    }
  }
})

export default theme
