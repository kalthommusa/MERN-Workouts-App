import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// custom hook for logging in user
export const useLogin = () => {
  // state variables for error handling and loading state
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  // function that interacts with the backend to login the user
  const login = async (email, password) => {
    // start loading spinner
    setIsLoading(true); 
    // clear any previous errors
    setError(null); 
    // reset empty fields
    setEmptyFields([]); 

    // send POST request to login API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }) // convert email and password to JSON format
    });
    // parse JSON response
    const json = await response.json();

    // check for errors in the response
    if (!response.ok) {
      //set error message
      setError(json.error);
      // set empty fields 
      setEmptyFields(json.emptyFields);
      // stop loading spinner
      setIsLoading(false);
    } else {
      // on successful login, store user data in local storage
      localStorage.setItem('user', JSON.stringify(json));
      // dispatch login action to update global auth state
      dispatch({ type: 'LOGIN', payload: json });
      // stop loading spinner
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, emptyFields };
};
