import { createMuiTheme, withTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: { 500: '#467fcf' },
  },
  drawer: {
    width: 150,
  },
  icon: {
    color: 'white',
  }
})
export default theme