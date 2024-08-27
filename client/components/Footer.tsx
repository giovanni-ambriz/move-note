import React from 'react'
import { useAffirmation } from '../hooks/useAffirmation'

const Footer: React.FC = () => {
  const { data, isLoading, isError } = useAffirmation()

  if (isLoading) {
    return <p>Loading a new affirmation... ✨</p>
  }

  if (isError) {
    return <p>Failed to load affirmation. Please try again later.</p>
  }

  return <p>{data?.affirmation}</p>
}

export default Footer
