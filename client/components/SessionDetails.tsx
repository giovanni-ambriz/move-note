import { useParams } from 'react-router-dom';
import { useSessionDetails } from '../hooks/useSessionDetails';
import { useDeleteSession } from '../hooks/useDeleteSession';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import EditNotes from './EditNotes';

export default function SessionDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError } = useSessionDetails(Number(id));
  const { mutate } = useDeleteSession();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this workout session?')) {
      mutate(Number(id));
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCloseEdit = () => setIsEditing(false);

  if (isPending) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error loading session</div>;

  return (
    <div className="container">
      <Link to={`/activities/${data?.activity.id}/sessions`} className="back-link">
        {data?.activity.name}
      </Link>
      <div className="card">
        <p><strong>By:</strong> {data?.user.name}</p>
        <p><strong>Date:</strong> {data?.date}</p>
        <p><strong>Time:</strong> {data?.time}</p>
        <p><strong>Distance:</strong> {data?.distance} km</p>
        <p><strong>Duration:</strong> {data?.duration} min</p>
        <p><strong>Notes:</strong> {data?.notes}</p>
        <button className="button" onClick={handleEditClick}>Edit Notes</button>
        {isEditing && (
          <EditNotes
            sessionId={Number(id)}
            currentNotes={data?.notes || ''}
            onClose={handleCloseEdit}
          />
        )}
        <button className="button delete" onClick={handleDelete}>Delete Workout</button>
      </div>
      <Link to='/'>
        <button className="button ">Back</button>
      </Link>
    </div>
  );
}
