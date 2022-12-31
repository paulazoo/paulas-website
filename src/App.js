import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom';
import CityAbout from './CityAbout'
import Main from './Main'

const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/about' element = {<CityAbout/>} />
      <Route exact path='/' element={<Main/>} />
    </Routes>
    </BrowserRouter>

  )
}
export default App