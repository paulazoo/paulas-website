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
import Main from './Main'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    }
  }
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
      <Route path='/about' element = {<CityAbout/>} />
      <Route exact path='/' element={<Main/>} />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}
export default App