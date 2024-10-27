import { useEffect } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"; // custom hook for workouts context
import { useAuthContext } from "../hooks/useAuthContext"; // custom hook for auth context

// components
import WorkoutDetails from '../components/WorkoutDetails'; // Component to display workouts
import WorkoutForm from '../components/WorkoutForm'; // component for adding new workouts

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext(); // destructure workouts and dispatch from context
  const { user } = useAuthContext(); // destructure user from auth context

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`}, // include token in headers
      });
      const json = await response.json();

      if (response.ok) {
        // update workouts in context
        dispatch({ type: 'SET_WORKOUTS', payload: json }); 
      }
    }

    if (user) {
      // fetch workouts if user is logged in
      fetchWorkouts(); 
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} /> 
        ))}
      </div>
      <WorkoutForm /> 
    </div>
  );
}

export default Home; 