import { useParams } from 'react-router-dom';
import { useSessionDetails } from '../hooks/useSessionDetails'
import { useDeleteSession } from '../hooks/useDeleteSession';

export default function SessionDetails() {
  const { id } = useParams<{ id: string }>()
  const { data, isPending, isError } = useSessionDetails(Number(id));
  const { mutate } = useDeleteSession()

  const handleDelete = () => {
    if (window.confirm('Are you sure you wnat to delete this workout session?')) {
      mutate(Number(id))
    }
  }

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading session</div>;
  }

  return (
    <div>
      <h2>{data?.activity.name}</h2>
      <p>by {data?.user.name}</p>
      <p>Date: {data?.date}</p>
      <p>Time: {data?.time}</p>
      <p>Distance: {data?.distance} km</p>
      <p>Duration: {data?.duration} min</p>
      <p>Notes: {data?.notes}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
