import './App.css';
import { Route,BrowserRouter as Router,Routes,Navigate } from 'react-router-dom';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <div className="App">
      </div>
      <Routes>
        <Route path='/' element={
          <Navigate to='/login' />
        } />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
