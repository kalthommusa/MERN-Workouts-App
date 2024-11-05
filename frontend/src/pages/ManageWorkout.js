import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import UpdateWorkout from '../components/UpdateWorkout';
import Spinner from '../components/Spinner';
import useDeleteWorkout from '../hooks/useDeleteWorkout';
import useFetchSingleWorkout from '../hooks/useFetchSingleWorkout';

const ManageWorkout = () => {
  const { id } = useParams(); // get workout ID from URL parameters
  const { workout, error, isLoading } = useFetchSingleWorkout(id); // fetch single workout
  const [isModalOpen, setIsModalOpen] = useState(false); // handle edit modal
  const { deleteWorkout } = useDeleteWorkout(); // hook for deleting workout
  const navigate = useNavigate();

  // render error message if any
  if (error) return <div>{error}</div>;

  // show loading spinner while fetching data
  if (isLoading) return <Spinner />;

  // handle delete button click to delete a workout
  const handleDelete = async () => {
    await deleteWorkout(id);
    navigate('/');
  };

  // handle edit button click to open modal
  const handleEditClick = () => {
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
      {isModalOpen && <UpdateWorkout workout={workout} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default ManageWorkout;