import { useState } from 'react';
import { useAuthContext } from './useAuthContext'; // custom hook to access authentication context

// custom hook for logging in users
export const useLogin = () => {
  const [error, setError] = useState(null); // state for error message
  const [isLoading, setIsLoading] = useState(false); // state for loading status
  const { dispatch } = useAuthContext(); // destructure the dispatch function from the Auth context custom hook

  const login = async (email, password) => {
    // set loading to true while request is in progress
    setIsLoading(true);
    // clear any existing error
    setError(null);

    // send POST request to the login API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }), // send email and password as JSON
    });
    // parse JSON response
    const json = await response.json(); 

    // if the login fails, display error message
    if (!response.ok) {
      // stop loading
      setIsLoading(false);
      // set error state with response error
      setError(json.error);
    }

    // if login is successful
    if (response.ok) {
      // save the user data (email and token) to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the global auth context with the logged-in user
      dispatch({ type: 'LOGIN', payload: json });

      // stop loading
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
