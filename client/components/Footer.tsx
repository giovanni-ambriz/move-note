import React from 'react'
import { useAffirmation } from '../hooks/useAffirmation'

const Footer: React.FC = () => {
  const { data, isLoading, isError } = useAffirmation()

  return (
    <footer className="app-footer">
      {isLoading && <p className="footer-text">Remember that...</p>}
      {isError && <p className="footer-text">Failed to load affirmation. Please try again later.</p>}
      {!isLoading && !isError && (
        <p className="footer-text">{data?.affirmation}</p>
      )}
    </footer>
  )
}
export default Footer
