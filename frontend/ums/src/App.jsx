import './output.css'

// import About from './pages/about.jsx';
// import Signup from './pages/signup.jsx';
import Authentication from './pages/authentication.jsx';
import LoggedIn from './components/loggedIn.jsx';

function App() {
  //ktu bahet verifikimi prej backend qe a osht logged in a jo
  const isLoggedIn = false;

  //ktu bahet renderimi nqoftse osht logged in at her e qon te home page nese jo te SignUp 
  if (isLoggedIn) {
    return <LoggedIn />
  } else {
    return <Authentication />
  }
}

export default App
