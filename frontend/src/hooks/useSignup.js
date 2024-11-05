import { useState } from 'react';

// custom hook for signing up user
export const useSignup = () => {
  // state variables for error handling and loading state
  const [error, setError] = useState(null); 
  const [emptyFields, setEmptyFields] = useState([]); 
  const [isLoading, setIsLoading] = useState(null); 
 
  // function that interacts with the backend to signup the user
  const signup = async (email, password) => {
    // start loading spinner
    setIsLoading(true); 
    // clear any previous errors
    setError(null); 
    // reset empty fields
    setEmptyFields([]); 

    // send POST request to signup API endpoint 
    const response = await fetch('/api/user/signup', {
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
      return false;
    } else {
      // on successful signup, stop loading spinner
      setIsLoading(false);
      return true;
    }
  };

  return { signup, isLoading, error, emptyFields };
};