import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';

type ThemeProps = {
  children: ReactNode;
};

enum themePalette {
  BG = '#12181b',
  LIME = '#c8fa5f',
  FONT_GLOBAL = '"Quicksand", sans-serif;',
  ERROR_MAIN = 'f44336',
  BG_ERROR_MAIN = 'rgba(244,67,54,0.1)',
}

let theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: themePalette.BG,
    },
    primary: {
      main: themePalette.LIME,
    },
  },
  typography: {
    fontFamily: themePalette.FONT_GLOBAL,
    h1: {
      '@media (max-width: 600px)': {
        fontSize: '3rem',
      },
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '0.5em',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        style: {
          borderRadius: '0.5em',
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        style: {
          borderRadius: '0.8em',
          fontSize: '1em',
        },
      },
      styleOverrides: {
        standardError: {
          border: `1px solid ${themePalette.ERROR_MAIN}`,
          background: themePalette.BG_ERROR_MAIN,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #1e1e1e inset',
          },
        },
      },
    },
  },
});

// theme.typography.h1 = {
//   [theme.breakpoints.up('xs')]: {
//     fontSize: '3rem',
//   },
//   [theme.breakpoints.up('sm')]: {
//     fontSize: '4rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '6rem',
//   },
// };

theme = responsiveFontSizes(theme);

export default function ThemeConfig({ children }: ThemeProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
