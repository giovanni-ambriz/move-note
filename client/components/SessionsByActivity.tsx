import { Link, useParams } from 'react-router-dom';
import { useSessionsByActivity } from '../hooks/useSessionsByActivity';

export default function SessionsByActivity() {
  const { activity_id } = useParams<{ activity_id: string }>();
  const { data: sessions, isPending, isError } = useSessionsByActivity(Number(activity_id));

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading sessions</div>;

  return (
    <div>
      <h1>{sessions?.[0]?.name} - Workouts</h1>
      {sessions && sessions.length > 0 ? (
        <ul>
          {sessions.map(session => (
            <li key={session.id}>
              <Link to={`/sessions/${session.id}`}>
                <p>Date: {session.date}</p>
                <p>Distance: {session.distance} km</p>
                <p>Duration: {session.duration} min</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions available yet. Start by adding a new workout!</p>
      )}
    </div>
  )
}