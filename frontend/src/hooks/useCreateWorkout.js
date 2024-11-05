import { useState } from 'react';
import { useAuthContext } from './useAuthContext'; 
import { useWorkoutsContext } from './useWorkoutsContext'; 

// custom hook for creating a new workout  
export const useCreateWorkout = () => {
  // state variables for error handling and loading state
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
   
  const { user } = useAuthContext(); 
  const { dispatch } = useWorkoutsContext();

  // function that interacts with the backend 
  const createWorkout = async (title, load, reps) => {

    // check if the user is logged in
    if (!user) {
        setError('You must be logged in'); 
        return;
        }

    // start loading spinner
    setIsLoading(true);
    // clear any previous errors
    setError(null); 
    // reset empty fields
    setEmptyFields([]); 

    // create workout object 
    const workout = { title, load, reps };

    // send POST request to the backend API endpoint
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`, // include token for user authorization
      },
      body: JSON.stringify(workout) // convert workout object to JSON format
    });
    // parse JSON response
    const json = await response.json();

    // check for errors in the response
    if (!response.ok) {
      // set error message
      setError(json.error); 
      // set empty fields
      setEmptyFields(json.emptyFields); 
      // stop loading spinner
      setIsLoading(false);
    } else {
      // on success, dispatch create workout action to update global workout context
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
      // stop loading spinner
      setIsLoading(false);
      return true;
    }
    return false;
  };

  return { createWorkout, isLoading, error, emptyFields };
};
