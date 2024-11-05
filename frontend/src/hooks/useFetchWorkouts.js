import { useEffect } from 'react';
import { useWorkoutsContext } from './useWorkoutsContext';
import { useAuthContext } from './useAuthContext';

// custom hook for fetching workouts data for authenticated user  
const useFetchWorkouts = () => {
  const { user } = useAuthContext();
  const { dispatch, workouts } = useWorkoutsContext();

  useEffect(() => {
    // function to fetch workouts from the backend API
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { 'Authorization': `Bearer ${user.token}` }, // attach token for authentication
      });
      // parse JSON response
      const json = await response.json(); 

      // on success, update workouts state in context
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    // fetch workouts if user is authenticated
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]); // re-run if dispatch function or user info changes

  return { workouts };
};

export default useFetchWorkouts;