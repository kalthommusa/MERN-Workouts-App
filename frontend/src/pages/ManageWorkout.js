import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // hook for accessing URL parameters
import { useAuthContext } from '../hooks/useAuthContext'; // custom hook for auth context
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'; // custom hook for workouts context
import { useNavigate } from 'react-router-dom'; // hook for navigation
import formatDistanceToNow from 'date-fns/formatDistanceToNow'; // function for formatting date
import EditWorkout from '../components/EditWorkout'; // component for editing workouts
import Spinner from '../components/Spinner'; // spinner component for loading indication

const ManageWorkout = () => {
  const { id } = useParams(); // get workout ID from URL
  const { user } = useAuthContext(); // destructure user from auth context
  const [workout, setWorkout] = useState(null); // state for workout data
  const [error, setError] = useState(null); // state for error message
  const { dispatch } = useWorkoutsContext(); // destructure dispatch from workouts context
  
  const [isModalOpen, setIsModalOpen] = useState(false); // state for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`/api/workouts/${id}`, {
        headers: { 'Authorization': `Bearer ${user.token}` }, // include token in headers
      });
      const json = await response.json();

      if (response.ok) {
        // set workout data
        setWorkout(json); 
      } else {
        setError(json.error); 
      }
    };

    if (user) {
      // fetch workout data if user is logged in
      fetchWorkout(); 
    }
  }, [id, user]);

  // display error message
  if (error) return <div>{error}</div>; 

  // show loading spinner if workout data is not available
  if (!workout) return <Spinner />; 

  const handleDelete = async () => {
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
      // update workouts context
      dispatch({ type: 'DELETE_WORKOUT', payload: json }); 

      // navigate back to home
      navigate('/'); 
    }
  };

  const handleEditClick = () => {
    // open edit modal
    setIsModalOpen(true); 
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> 
      <span className="material-symbols-outlined delete-icon" onClick={handleDelete}>delete</span> 
      <button className="edit-icon" onClick={handleEditClick}>edit</button> 
      {isModalOpen && <EditWorkout workout={workout} setIsModalOpen={setIsModalOpen} />} 
    </div>
  );
};

export default ManageWorkout; 