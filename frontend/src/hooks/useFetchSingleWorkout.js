import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';

// custom hook for fetching a specific workout for authenticated user  
const useFetchSingleWorkout = (id) => {
  const { user } = useAuthContext(); // access user context for authentication
  const [workout, setWorkout] = useState(null); // store workout data
  const [error, setError] = useState(null); // handle error messages
  const [isLoading, setIsLoading] = useState(true); // handle loading state

  useEffect(() => {
    const fetchSingleWorkout = async () => {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/workouts/${id}`, {
          headers: { 'Authorization': `Bearer ${user.token}` } // include token in headers
        });
        const json = await response.json();

        if (response.ok) {
          setWorkout(json);
          setIsLoading(false);
        } else {
          setError(json.error);
          setIsLoading(false);
        }
    };

    // fetch workout if user is authenticated
    if (user) {
      fetchSingleWorkout();
    }

  }, [id, user]);

  return { workout, error, isLoading };
};

export default useFetchSingleWorkout;