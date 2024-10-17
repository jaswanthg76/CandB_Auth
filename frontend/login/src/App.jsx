 // src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import Welcome from './components/welcome';
import UserStats from './components/UserStats'; // Import the UserStats component
import ProtectedElement from './utils/ProtectedElement';
import Leaderboard from './components/Leaderboard';


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
                
                {/* Protect the /user_stats route and pass the username prop */}
                <Route 
                    path="/user_stats" 
                    element={
                        <ProtectedElement>
                            <UserStats/> 
                        </ProtectedElement> 
                    } 
                />

                  <Route 
                    path="/leaderboard" 
                    element={
                        <ProtectedElement>
                            <Leaderboard/> 
                        </ProtectedElement> 
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;
