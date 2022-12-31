import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import About from './About'
import Main from './Main'

const App = () => {
  return (
    <Routes>
      <Route path='/about' component = { About } />
      <Route path='/' component={Main} />
      <Navigate to='/' />
    </Routes>

  )
}
export default App