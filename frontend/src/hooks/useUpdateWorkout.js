import { useWorkoutsContext } from './useWorkoutsContext';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const useUpdateWorkout = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const updateWorkout = async (id, updatedWorkout) => {
    // ensure user is logged in
    if (!user) return; 

    const response = await fetch(`/api/workouts/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`, // include token in headers
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedWorkout) // send updated workout data as JSON
    });

    const json = await response.json();

    if (response.ok) {
      // update workouts context
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      // navigate back to home
      navigate('/');
    } 
  };

  return { updateWorkout };
};

export default useUpdateWorkout;