import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { useActivities } from '../hooks/useActivities'
import { useAddSession } from '../hooks/useAddSession'
import '../styles/sessionform.css'

interface SessionFormProps {
  onClose: () => void;
}

export default function SessionForm({ onClose }: SessionFormProps) {
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
        onClose()
      }
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Add a New Session</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="user" className="form-label">Your Name:</label>
            <select
              id="user"
              value={userId}
              onChange={handleUserChange}
              className="form-input"
            >
              <option value="" disabled>Select your name</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="activity" className="form-label">Activity:</label>
            <select
              id="activity"
              value={activityId}
              onChange={handleActivityChange}
              className="form-input"
            >
              <option value="" disabled>Select an activity</option>
              {activities.map(activity => (
                <option key={activity.id} value={activity.id}>{activity.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="time" className="form-label">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={handleTimeChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="distance" className="form-label">Distance (km):</label>
            <input
              type="number"
              step="0.01"
              id="distance"
              value={distance}
              onChange={handleDistanceChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration" className="form-label">Duration (minutes):</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={handleDurationChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">How Did You Feel?:</label>
            <input
              type="text"
              id="notes"
              value={notes}
              onChange={handleNotesChange}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            className="form-button"
          >
            Submit
          </button>
          <button className="form-button cancel-button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
}
