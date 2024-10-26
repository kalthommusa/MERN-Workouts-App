import { useState } from 'react'

// custom hook for signing up users
export const useSignup = () => {
  const [error, setError] = useState(null) // state for error message
  const [isLoading, setIsLoading] = useState(null) // state for loading status

  const signup = async (email, password) => {
    // set loading to true while request is in progress
    setIsLoading(true)
    // clear any existing error
    setError(null)

    // send POST request to the signup API endpoint
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    // parse JSON response
    const json = await response.json()

    // if the signup fails, display error message
    if (!response.ok) {
      // stop loading
      setIsLoading(false)
      // set error state with response error
      setError(json.error)
      // indicate failure
      return false; 
    }
    
    // if signup is successful
    if (response.ok) {
      // stop loading
      setIsLoading(false)
      // indicate success without handling user data here
      return true; 
    }
  }

  return { signup, isLoading, error }
}