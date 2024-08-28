import { useParams } from 'react-router-dom';
import { useSessionDetails } from '../hooks/useSessionDetails'

export default function SessionDetails() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useSessionDetails(Number(id));


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading session</div>;
  }

  const activity = data?.activity;
  if (!data || !activity) {
    return <div>No session details available</div>;
  }
  return (
    <div>
      <h2>{data.activity.name}</h2>
      <p>by {data.user.name}</p>
      <p>Date: {data.date}</p>
      <p>Time: {data.time}</p>
      <p>Distance: {data.distance} km</p>
      <p>Duration: {data.duration} min</p>
      <p>Notes: {data.notes}</p>
    </div>
  );
}
