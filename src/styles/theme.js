import { createMuiTheme } from '@material-ui/core/styles'
import { red, purple, orange, grey } from '@material-ui/core/colors'

// Create a theme instance.
const type = 'dark'
const palette = {
  type,
  primary: {
    light: purple[400],
    main: purple[500],
    dark: purple[700]
  },
  secondary: {
    light: orange[400],
    main: orange[500],
    dark: orange[700]
  },
  error: {
    main: red.A400
  },
  text: {
    primary: type === 'dark' ? grey[300] : '#313131'
  },
  background: {
    default: type === 'dark' ? '#303035' : '#fafafa'
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
