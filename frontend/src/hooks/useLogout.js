import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

// custom hook for handling user logout
export const useLogout = () => {
  // destructure the dispatch function from the Auth context custom hook 
  const { dispatch } = useAuthContext(); 

  // destructure the dispatch function from the Workouts context custom hook
  const { dispatch: dispatchWorkouts } = useWorkoutsContext(); 

  const logout = () => {
    // remove user data from local storage to clear session
    localStorage.removeItem('user'); 

    // dispatch logout action to reset user state
    dispatch({ type: 'LOGOUT' }); 

    // clear workouts state in workouts context
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null }); 
  }

  return { logout }; 
}