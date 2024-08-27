
import { useSessions } from '../hooks/useSessions'

export default function SessionsComponent() {
  const { data: sessions, isLoading, isError } = useSessions()
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading sessions</div>



  return (
    <div>
      <h1>Recent Activity:</h1>
      <ul>
        {sessions?.map(session => (
          <li key={session.id}>
            {session.date} <button>Delete</button>
          </li>
        ))}
      </ul>
      <button>Add New Training Session</button>
    </div>
  )
}
