import { useState } from "react";
import { useCreateWorkout } from "../hooks/useCreateWorkout"; 
import Spinner from './Spinner'; 

const CreateWorkout = () => { 
  // state variables for form inputs 
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState(''); 
  
  // destructure properties from the custom hook 
  const { createWorkout, isLoading, error, emptyFields } = useCreateWorkout(); 

  // function to handle form submission
  const handleSubmit = async (e) => {
    // prevent the default behavior of reloading the page 
    e.preventDefault(); 
    // attempt to create a new workout
    const isSuccess = await createWorkout(title, load, reps);
    // reset form fields if the workout creation is successful
    if (isSuccess) {
      setTitle('');
      setLoad('');
      setReps('');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // update title state on change
        className={emptyFields.includes('title') ? 'error' : ''} // highlight if there's an error
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)} // update load state on change
        className={emptyFields.includes('load') ? 'error' : ''} // highlight if there's an error
      />

      <label>Reps:</label>
      <input 
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)} // update reps state on change
        className={emptyFields.includes('reps') ? 'error' : ''} // highlight if there's an error
      />

      <button disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Add Workout'} {/* show spinner while loading */}
      </button>

      {error && <div className="error">{error}</div>} {/* display error message if exists */}
    </form>
  );
};

export default CreateWorkout;