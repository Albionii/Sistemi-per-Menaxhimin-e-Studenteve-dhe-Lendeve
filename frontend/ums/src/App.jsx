import './App.css'

import NavBar from './components/navBar.jsx'


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// import About from './pages/about.jsx';
import Home from './pages/home.jsx';
import Services from './pages/services.jsx';
import LogIn from './pages/login.jsx';
import Signup from './pages/signup.jsx';

function App() {


  return (
    <>

      <Router>
      <NavBar></NavBar>

        <Routes>
          <Route exact path='/' 
            element={<Home />}>
          </Route>

          <Route path="/services"
            element={<Services />}>
          </Route>

          <Route path="/LogIn"
            element={<LogIn />}>
          </Route>

          <Route path="/signup"
            element={<Signup />}>
          </Route>
        
        </Routes>
        
      </Router>
    </>
  )
}

export default App