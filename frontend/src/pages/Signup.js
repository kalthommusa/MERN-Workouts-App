import { useState } from "react"
import { useSignup } from "../hooks/useSignup" // custom hook for handling signup logic
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()
  const navigate = useNavigate()

  // handle signup form submission
  const handleSubmit = async (e) => {
    // prevent default form submission behavior
    e.preventDefault()

    // call the signup function
    const isSuccess = await signup(email, password)

    // after successful signup, navigate to the login page 
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
      />

      <label>Password:</label>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} // update password state on change
      />

      <button disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Sign up'} 
      </button>

      {error && <div className="error">{error}</div>} 
    </form>
  )
}

export default Signup