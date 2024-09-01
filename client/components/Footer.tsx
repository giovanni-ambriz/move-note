import { useAffirmation } from '../hooks/useAffirmation';

export default function Footer() {
  const { data, isLoading, isError } = useAffirmation();

  return (
    <footer className="app-footer">
      {isLoading && <p className="footer-text">Remember that...</p>}
      {isError && <p className="footer-text">Failed to load affirmation. Please try again later.</p>}
      {!isLoading && !isError && (
        <p className="footer-text">{data?.affirmation}</p>
      )}
    </footer>
  );
}
