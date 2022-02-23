import { createTheme } from '@mui/material';
import { Shadows } from '@mui/material/styles/shadows';

//  Theme for material UI
const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
    },
  },

  palette: {
    primary: {
      main: '#434ce7',
    },
    info: {
      main: '#24ca80',
      contrastText: 'white',
      dark: '#22b573',
    },
    secondary: {
      main: '#ebeefd',
      contrastText: '#434ce7',
      dark: '#d4dbff',
    },
    warning: {
      main: '#ffe4e6',
      dark: '#ffbdc2',
      contrastText: '#ff003d',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  // buttons
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

export default theme;
