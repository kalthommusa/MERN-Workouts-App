import { useNavigate } from 'react-router-dom'; 

// function for formatting date
import formatDistanceToNow from 'date-fns/formatDistanceToNow'; 

const WorkoutDetails = ({ workout }) => {
  const navigate = useNavigate(); 

  const handleSettings = () => {
    // navigate to specific workout page
    navigate(`/${workout._id}`); 
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> 
      <span className="material-symbols-outlined" onClick={handleSettings}>settings</span> 
    </div>
  );
};

export default WorkoutDetails;