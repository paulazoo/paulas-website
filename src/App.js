import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import {
  createTheme, ThemeProvider
} from '@mui/material/styles';
import CityAbout from './CityAbout'
import MainContainer from './MainContainer';
import MultiplyGame from './MultiplyGame';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#FF7779'
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
      <Route path='/multiply-game' element={<MultiplyGame/>} />
      <Route path='/about' element = {<CityAbout/>} />
      <Route exact path='/' element={<MainContainer/>} />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}
export default App