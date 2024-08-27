import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useActivities } from '../hooks/useActivities'
import { useAddSession } from '../hooks/useAddSession'

export default function SessionForm() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('00:00')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')
  const [userId, setUserId] = useState<number | undefined>(undefined)
  const [activityId, setActivityId] = useState<number | undefined>(undefined)

  const addSessionMutation = useAddSession()
  const { data: users = [] } = useUsers()
  const { data: activities = [] } = useActivities()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addSessionMutation.mutate({
      user_id: userId,
      date,
      time,
      activity_id: activityId,
      distance,
      duration,
      notes
    })
  }

  return (
    <>
      <h2>Add a new session:</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="user">Your name: </label>
        <select
          id="user"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          <option value="" disabled>Select your name</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <label htmlFor="activity">Activity: </label>
        <select
          id="activity"
          value={activityId}
          onChange={(e) => setActivityId(Number(e.target.value))}
        >
          <option value="" disabled>Select an activity</option>
          {activities.map(activity => (
            <option key={activity.id} value={activity.id}>{activity.name}</option>
          ))}
        </select>
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="time">Time: </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <label htmlFor="distance">Distance (km): </label>
        <input
          type="number"
          step="0.01"
          id="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <label htmlFor="duration">Duration (minutes): </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label htmlFor="notes">How did you go?: </label>
        <input
          type="text"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit" onSubmit={handleSubmit}>Submit</button>
      </form>
    </>
  )
}

