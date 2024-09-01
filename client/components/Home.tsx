import { useState } from 'react';
import Modal from './Modal';
import SessionForm from './AddSessionForm';
import { useSessions } from '../hooks/useSessions';
import { useActivities } from '../hooks/useActivities';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: sessions = [], isPending, isError } = useSessions();
  const { data: activities = [] } = useActivities();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  const sortedSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestSessions = sortedSessions.slice(0, 5);

  return (
    <div className="container">
      <h1 className="welcome-title">Welcome to MoveNote</h1>

      <Modal show={isModalOpen} onClose={closeModal}>
        <SessionForm onClose={closeModal} />
      </Modal>

      <div className="latest-sessions-container">
        <h2 className="latest-sessions-title">Latest Workout Sessions:</h2>
        <div className="card-container">
          {latestSessions.length === 0 ? (
            <p>No recent sessions available.</p>
          ) : (
            latestSessions.map(session => {
              const activity = activities.find(act => act.id === session.activity_id);
              return (
                <Link to={`/sessions/${session.id}`} className="card" key={session.id}>
                  <h3>{activity?.name}</h3>
                  <p><strong>Distance:</strong> {session.distance} km</p>
                  <p><strong>Duration:</strong> {session.duration} min</p>
                  <p><strong>Date:</strong> {formatDate(session.date)}</p>
                </Link>
              );
            })
          )}
        </div>
      </div>

      <div className="button-container">
        <button className="button" onClick={openModal}>Add New Workout</button>
      </div>
    </div>
  );
}