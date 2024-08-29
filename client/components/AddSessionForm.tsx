import { useQueryClient } from '@tanstack/react-query'
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
  const [userId, setUserId] = useState(1)
  const [activityId, setActivityId] = useState(1)

  const addSessionMutation = useAddSession()
  const { data: users = [] } = useUsers()
  const { data: activities = [] } = useActivities()
  const queryClient = useQueryClient()

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value))
  }

  const handleActivityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActivityId(Number(e.target.value))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
  }

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(e.target.value)
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value)
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value)
  }

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
    }, {
      onSuccess: () => {
        setUserId(1)
        setActivityId(1)
        setDate('')
        setTime('00:00')
        setDistance('')
        setDuration('')
        setNotes('')

        queryClient.invalidateQueries({ queryKey: ['sessions'] })
      }
    })
  }


  return (
    <>
      <h2>Add a new session:</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor="user">Your name: </label>
        <select id="user" value={userId} onChange={handleUserChange}>
          <option value="" disabled>Select your name</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <label htmlFor="activity">Activity: </label>
        <select id="activity" value={activityId} onChange={handleActivityChange}>
          <option value="" disabled>Select an activity</option>
          {activities.map(activity => (
            <option key={activity.id} value={activity.id}>{activity.name}</option>
          ))}
        </select>

        <label htmlFor="date">Date: </label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />

        <label htmlFor="time">Time: </label>
        <input type="time" id="time" value={time} onChange={handleTimeChange} />

        <label htmlFor="distance">Distance (km): </label>
        <input type="number" step="0.01" id="distance" value={distance} onChange={handleDistanceChange} />

        <label htmlFor="duration">Duration (minutes): </label>
        <input type="number" id="duration" value={duration} onChange={handleDurationChange} />

        <label htmlFor="notes">How did you feel?: </label>
        <input type="text" id="notes" value={notes} onChange={handleNotesChange} />

        <button type="submit">Submit</button>
      </form>
    </>
  )
}