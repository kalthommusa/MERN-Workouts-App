import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout() // destructure the logout function from the Logout custom hook 
  const { user } = useAuthContext() // destructure the user state from the Auth context custom hook 

  const handleClick = () => {
    logout() // call logout function when clicked
  }

  return (
    <header>
      <div className="container">
        <Link to="/"><h1>Workout Tracker</h1></Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
