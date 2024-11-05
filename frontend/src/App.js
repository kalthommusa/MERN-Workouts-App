import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages & components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ManageWorkout from './pages/ManageWorkout';
import NotFound from './pages/NotFound'; 

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/signup" />} 
            />
            <Route 
              path="/:id"
              element={user ? <ManageWorkout /> : <Navigate to="/signup" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </div>
        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;