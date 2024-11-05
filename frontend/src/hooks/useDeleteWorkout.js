import { useWorkoutsContext } from './useWorkoutsContext';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const useDeleteWorkout = () => {
  const { user } = useAuthContext(); 
  const { dispatch } = useWorkoutsContext(); 
  const navigate = useNavigate();

  const deleteWorkout = async (id) => {
    // ensure user is logged in
    if (!user) return; 

    const response = await fetch(`/api/workouts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}` // include token in headers
      }
    });
    const json = await response.json();

    if (response.ok) {
      // dispatch delete action to update context
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
      // navigate back to home
      navigate('/'); 
    } 
  };

  return { deleteWorkout }; 
};

export default useDeleteWorkout;