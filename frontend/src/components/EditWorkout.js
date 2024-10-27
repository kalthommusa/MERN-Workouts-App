import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'; // custom hook for workouts context
import { useAuthContext } from '../hooks/useAuthContext'; // custom hook for auth context
import { useNavigate } from 'react-router-dom'; // hook for navigation

const EditWorkout = ({ workout, setIsModalOpen }) => {
  const { dispatch } = useWorkoutsContext(); // destructure dispatch from workouts context
  const { user } = useAuthContext(); // destructure user from auth context
  const navigate = useNavigate(); // initialize navigate

  const [title, setTitle] = useState(workout.title); // state for workout title
  const [load, setLoad] = useState(workout.load); // state for load (in kg)
  const [reps, setReps] = useState(workout.reps); // state for repetitions

  const handleSubmit = async (e) => {
    // prevent default form submission
    e.preventDefault(); 

    // ensure user is logged in
    if (!user) return; 

    // create updated workout object
    const updatedWorkout = { title, load, reps }; 

    const response = await fetch('/api/workouts/' + workout._id, {
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

      // close modal
      setIsModalOpen(false); 

      // navigate back to home
      navigate('/'); 
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Edit Workout</h3>
        
        <form onSubmit={handleSubmit}>

          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} // update title state
          />

          <label>Load (kg):</label>
          <input 
            type="number" 
            value={load} 
            onChange={(e) => setLoad(e.target.value)} // update load state
          />

          <label>Reps:</label>
          <input 
            type="number" 
            value={reps} 
            onChange={(e) => setReps(e.target.value)} // update reps state
          />

          <button type="submit">Update Workout</button> 

          <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button> 
        </form>
      </div>
    </div>
  );
};

export default EditWorkout; 