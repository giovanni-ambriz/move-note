import { Link, useParams } from 'react-router-dom';
import { useSessionsByActivity } from '../hooks/useSessionsByActivity';

export default function SessionsByActivity() {
  const { activity_id } = useParams<{ activity_id: string }>();
  const { data: sessions, isPending, isError } = useSessionsByActivity(Number(activity_id));

  if (isPending) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error loading sessions</div>;

  return (
    <div className="container">
      <h1 className="title">{sessions?.[0]?.name} - Workouts</h1>
      {sessions && sessions.length > 0 ? (
        <div className="card-container">
          {sessions.map(session => (
            <Link to={`/sessions/${session.id}`} className="card" key={session.id}>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Distance:</strong> {session.distance} km</p>
              <p><strong>Duration:</strong> {session.duration} min</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No sessions available yet. Start by adding a new workout!</p>
      )}
      <Link to='/'>
        <button className="button ">Back</button>
      </Link>
    </div>
  );
}
