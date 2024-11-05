import { useState } from 'react';
import useUpdateWorkout from '../hooks/useUpdateWorkout'; // Import the custom hook

const UpdateWorkout = ({ workout, setIsModalOpen }) => {
  const { updateWorkout } = useUpdateWorkout(); // Use the custom hook
  const [title, setTitle] = useState(workout.title); 
  const [load, setLoad] = useState(workout.load); 
  const [reps, setReps] = useState(workout.reps); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    // create updated workout object
    const updatedWorkout = { title, load, reps }; 

    // call the update workout function from the custom hook
    await updateWorkout(workout._id, updatedWorkout); 

    // close modal
    setIsModalOpen(false); 
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

export default UpdateWorkout;