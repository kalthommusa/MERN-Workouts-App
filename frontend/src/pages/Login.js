import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Spinner from "../components/Spinner";

const Login = () => {
  // state variables to hold user input for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // destructure properties from the custom hook 
  const { login, error, emptyFields, isLoading } = useLogin();

  // handle form submission
  const handleSubmit = async (e) => {
    // prevent the default behavior of reloading the page 
    e.preventDefault();
    // attempt to login by calling the login function
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

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
        {isLoading ? <Spinner /> : 'Log in'}  {/* show spinner while loading */}
      </button>

      {error && <div className="error">{error}</div>} {/* display error message if exists */}
    </form>
  );
};

export default Login;
