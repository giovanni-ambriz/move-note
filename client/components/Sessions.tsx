import { useQueryClient } from '@tanstack/react-query'
import { useActivities } from '../hooks/useActivities'
import { useDeleteSession } from '../hooks/useDeleteSession'
import { useSessions } from '../hooks/useSessions'
import { Link } from 'react-router-dom'

export default function Sessions() {
  const { data: sessions, isPending, isError } = useSessions()
  const { data: activities } = useActivities()
  const deleteSession = useDeleteSession()
  const queryClient = useQueryClient()

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


  const handleDelete = (id: number) => {
    deleteSession.mutate(id)
    queryClient.invalidateQueries({ queryKey: ['sessions'] })
  }

  return (
    <div>
      <h1>Recent Activity:</h1>
      <ul>
        {sessions?.map(session => {
          const activity = activities?.find(act => act.id === session.activity_id)
          return (
            <li key={session.id}>
              <Link to={`/sessions/${session.id}`}>
                {formatDate(session.date)} - {activity?.name}
              </Link>
              <br></br>
              {session.distance} km - {session.duration} min
              <br></br>
              <button onClick={() => handleDelete(session.id)}>Delete</button>
            </li>
          )
        })}
      </ul>
      <button>New Workout Session</button>
    </div>
  )
}