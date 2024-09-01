import { useActivities } from '../hooks/useActivities';
import { useSessions } from '../hooks/useSessions';
import { Link } from 'react-router-dom';
import SessionForm from './AddSessionForm';
import { useState } from 'react';

export default function Sessions() {
  const { data: sessions, isPending, isError } = useSessions();
  const { data: activities } = useActivities();
  const [showForm, setShowForm] = useState(false);

  if (isPending) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error loading sessions</div>;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No date available';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    }).format(date);
  };

  return (
    <div className="container">
      <h1 className="title">Workout History:</h1>
      <div className="card-container">
        {sessions?.map(session => {
          const activity = activities?.find(act => act.id === session.activity_id);
          return (
            <Link to={`/sessions/${session.id}`} className="card" key={session.id}>
              <h3>{activity?.name}</h3>
              <p><strong>Distance:</strong> {session.distance} km</p>
              <p><strong>Duration:</strong> {session.duration} min</p>
              <p><strong>Date:</strong> {formatDate(session.date)}</p>
            </Link>
          );
        })}
      </div>
      <button className="button" onClick={() => setShowForm(true)}>Add New Workout</button>
      {showForm && (
        <div className="form-popup">
          <SessionForm onClose={() => setShowForm(false)} />
          <button className="button cancel" onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
