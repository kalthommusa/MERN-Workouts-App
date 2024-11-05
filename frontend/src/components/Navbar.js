import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// functional component for navigation  
const Navbar = () => {
  // destructure logout function from the custom useLogout hook
  const { logout } = useLogout();

  // destructure user data from the custom useAuthContext hook
  const { user } = useAuthContext();

  // get current page location to manage active link styles
  const location = useLocation();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/"><h1>Workout Tracker</h1></Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className={location.pathname === '/login' ? 'active' : ''}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={location.pathname === '/signup' ? 'active' : ''}
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
