import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

// custom hook for logging out users
export const useLogout = () => {
  const { dispatch } = useAuthContext(); // destructure the dispatch function from the Auth context custom hook 
  const { dispatch: dispatchWorkouts } = useWorkoutsContext(); // destructure the dispatch function from the Workouts context custom hook

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user'); 

    // dispatch logout action
    dispatch({ type: 'LOGOUT' }); 

    // clear workouts in context
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null }); 
  }

  return { logout }; 
}