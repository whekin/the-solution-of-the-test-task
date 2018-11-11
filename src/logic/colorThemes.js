import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  type: "light",
  palette: {
    primary: {
      light: '#03a9f4',
      main: '#03a9f4',
      dark: '#03a9f4',
      contrastText: '#fff'
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#03a9f4'
    }
  }
});

export const nightTheme = createMuiTheme({
  palette: {
    type: "dark",
    text: {
      color: "#fff"
    },
    primary: {
      light: '#4caf50',
      main: '#4caf50',
      dark: '#4caf50',
      contrastText: '#fff'
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#4caf50'
    }
  }
});

export const LIGHT_THEME = 'LIGHT_THEME';
export const DARK_THEME = 'DARK_THEME';

const colorThemes = {
  [LIGHT_THEME]: {
    mainColor: "#03a9f4",
    appBackgroundColor: "#fafafa",
    appTextColor: "#222",
    btnColor: "#fff",
    btnColorHover: "#fff",
    btnBackgroundColor: "#4caf50",
    btnBackgroundColorHover: "#43a047",
    btnToggleColor: "#fff",
    btnToggleColorHover: "#fff",
    btnToggleColorActive: "Efff",
    btnToggleBackgroundColor: "#03a9f4",
    btnToggleBackgroundColorHover: "#039be5",
    btnToggleBackgroundColorActive: "#ff9800",
    tableTrEvenBackgroundColor: "rgba(0, 0, 0, 0.08)",
    easeTransparent: "rgba(0, 0, 0, 0.18)",
    selectionColor: "#fff",
    selectionBackgroundColor: "#777"
  },
  [DARK_THEME]: {
    mainColor: "#4caf50",
    appBackgroundColor: "#283238",
    appTextColor: "#fff",
    btnColor: "#fff",
    btnColorHover: "#fff",
    btnBackgroundColor: "#4caf50",
    btnBackgroundColorHover: "#43a047",
    btnToggleColor: "#000",
    btnToggleColorHover: "#000",
    btnToggleColorActive: "#fff",
    btnToggleBackgroundColor: "#f0f0f0",
    btnToggleBackgroundColorHover: "#81c784",
    btnToggleBackgroundColorActive: "#81c784",
    tableTrEvenBackgroundColor: "rgba(255, 255, 255, 0.08)",
    easeTransparent: "rgba(255, 255, 255, 0.18)",
    selectionColor: "#222",
    selectionBackgroundColor: "#fff"
  }
};

export default colorThemes;
