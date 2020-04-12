import { createMuiTheme, withTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#666ad1',
      main: '#303f9f',
      dark: '#001970',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  drawer: {
    width: 150,
  },
  MuiDrawer: {
    paper: {
      backgroundColor: '#18202c',
      textColor: 'white'
    },
  },
  icon: {
    color: 'white',
  }
})
export default theme