import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signup';
import Welcome from './components/Welcome';
import ProtectedElement from './utils/ProtectedElement'; // Import the ProtectedElement

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protect the /welcome route */}
        <Route 
          path="/welcome" 
          element={
            <ProtectedElement>
              <Welcome />
            </ProtectedElement> 
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
