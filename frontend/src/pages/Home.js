import React from 'react';
import useFetchWorkouts from '../hooks/useFetchWorkouts'; 

import WorkoutDetails from '../components/WorkoutDetails';
import CreateWorkout from '../components/CreateWorkout';

const Home = () => {
  const { workouts } = useFetchWorkouts();

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <CreateWorkout />
    </div>
  );
};

export default Home;