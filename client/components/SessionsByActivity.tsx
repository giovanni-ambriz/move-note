import { useParams } from 'react-router-dom';
import { useSessionsByActivity } from '../hooks/useSessionsByActivity';

export default function SessionsByActivity() {
  const { activity_id } = useParams<{ activity_id: string }>();
  const { data: sessions, isPending, isError } = useSessionsByActivity(Number(activity_id));

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading sessions</div>;

  return (
    <div>
      <h1>Sessions for Activity</h1>
      <ul>
        {sessions?.map(session => (
          <li key={session.id}>
            <p>Date: {session.date}</p>
            <p>Distance: {session.distance} km</p>
            <p>Duration: {session.duration} min</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
