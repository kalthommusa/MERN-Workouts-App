import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; // custom hook for workouts context
import { useAuthContext } from '../hooks/useAuthContext'; // custom hook for auth context
import Spinner from '../components/Spinner'; 

const WorkoutForm = () => { 
  const { dispatch } = useWorkoutsContext(); // destructure dispatch from workouts context
  const { user } = useAuthContext(); // destructure user from auth context

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState(''); 
  const [error, setError] = useState(null); 
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    // prevent default form submission
    e.preventDefault(); 

    if (!user) {
      setError('You must be logged in'); 
      return;
    }

    // create workout object
    const workout = { title, load, reps }; 

    // set loading state to true
    setIsLoading(true); 

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout), // send workout data as JSON
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // include token in headers
      }
    });
    
    // parse JSON response
    const json = await response.json(); 

    // stop loading state
    setIsLoading(false); 

    if (!response.ok) {
      setError(json.error); // Set error message
      setEmptyFields(json.emptyFields); // Set empty fields
    } else {
      // reset form fields and error states
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json }); // update workouts context
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)} // update title state
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''} // highlight empty fields
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)} // update load state
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''} // highlight empty fields
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)} // update reps state
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''} // highlight empty fields
      />

      <button disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Add Workout'} 
      </button>

      {error && (
        <div className="error">
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm; 