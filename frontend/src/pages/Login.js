import { useState } from "react";
import { useLogin } from "../hooks/useLogin"; // custom hook for handling login logic
import Spinner from "../components/Spinner"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin(); 

  // handle login form submission
  const handleSubmit = async (e) => {
    // prevent default form submission behavior
    e.preventDefault(); 

    // call the login function
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
      />

      <label>Password:</label>
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} // update password state on change
      />

      <button disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Log in'} 
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
