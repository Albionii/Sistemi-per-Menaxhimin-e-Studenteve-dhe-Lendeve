import './App.css'

import NavBar from './components/navBar.jsx'


// import About from './pages/about.jsx';
import Signup from './pages/signup.jsx';
import LoggedIn from './components/loggedIn.jsx';

function App() {
  //ktu bahet verifikimi prej backend qe a osht logged in a jo
  const isLoggedIn = true;

  //ktu bahet renderimi nqoftse osht logged in at her e qon te home page nese jo te SignUp 
  if (isLoggedIn) {
    return <LoggedIn />
  } else {
    return <Signup />
  }
}

export default App
