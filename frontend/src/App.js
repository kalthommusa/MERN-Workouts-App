import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import ManageWorkout from './pages/ManageWorkout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

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
              element={!user ? <Signup /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="*" 
              element={<NotFound />} // Catch-all route for Not Found
            />
          </Routes>
        </div>
        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;