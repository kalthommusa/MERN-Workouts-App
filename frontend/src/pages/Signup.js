import { useState } from "react";
import { useSignup } from "../hooks/useSignup"; 
import { useNavigate } from 'react-router-dom'; 
import Spinner from "../components/Spinner"; 

const Signup = () => {
  // state variables to hold user input for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // destructure properties from the custom hook 
  const { signup, error, emptyFields, isLoading } = useSignup();
  const navigate = useNavigate();

  // handle form submission
  const handleSubmit = async (e) => {
    // prevent the default behavior of reloading the page 
    e.preventDefault(); 
    // attempt to sign up by calling the signup function
    const isSuccess = await signup(email, password); 

    // redirect to login page on successful signup
    if (isSuccess) {
      navigate('/login');
    }
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} // update email state on change
        className={emptyFields.includes('email') ? 'error' : ''} // highlight if there's an error
      />

      <label>Password:</label>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} // update password state on change
        className={emptyFields.includes('password') ? 'error' : ''} // highlight if there's an error
      />

      <button disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Sign up'} {/* show spinner while loading */}
      </button>

      {error && <div className="error">{error}</div>} {/* display error message if exists */}
    </form>
  )
}

export default Signup;