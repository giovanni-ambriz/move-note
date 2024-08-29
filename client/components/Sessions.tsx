import { useActivities } from '../hooks/useActivities'
import { useSessions } from '../hooks/useSessions'
import { Link } from 'react-router-dom'
import SessionForm from './AddSessionForm'
import { useState } from 'react'

export default function Sessions() {
  const { data: sessions, isPending, isError } = useSessions()
  const { data: activities } = useActivities()
  const [showForm, setShowForm] = useState(false);

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading sessions</div>

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return 'No date available';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    }).format(date);
  }

  return (
    <div>
      <h1>Workout History:</h1>
      <ul>
        {sessions?.map(session => {
          const activity = activities?.find(act => act.id === session.activity_id)
          return (
            <li key={session.id}>
              <Link to={`/sessions/${session.id}`}>
                {activity?.name} - {session.distance} km - {session.duration} min
                <br></br>
                {formatDate(session.date)}
                <br></br>
              </Link>
            </li>
          )
        })}
      </ul>
      <button onClick={() => setShowForm(true)}>Add New Workout</button>

      {showForm && (
        <div className="form-popup">
          <button onClick={() => setShowForm(false)}>Cancel</button>
          <SessionForm />
        </div>
      )}
    </div>
  )
}