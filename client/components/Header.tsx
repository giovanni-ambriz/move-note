import { Link } from 'react-router-dom';
import '../styles/header.css'
import Weather from './Weather';

export default function Header() {
  const activities = [
    { id: 1, name: 'Running' },
    { id: 2, name: 'Walking' },
    { id: 3, name: 'Hiking' },
    { id: 4, name: 'Swimming' },
    { id: 5, name: 'Weightlifting' },
    { id: 6, name: 'Kayaking' },
    { id: 7, name: 'Skiing' },
    { id: 8, name: 'Snowboarding' },
    { id: 9, name: 'Taekwondo' },
  ];

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">MoveNoteApp</Link>
      </div>
      <nav className="nav-links">
        <Link to="/sessions">Workouts</Link>
        <div className="dropdown">
          <button className="dropbtn">Activities</button>
          <div className="dropdown-content">
            {activities.map((activity) => (
              <Link key={activity.id} to={`/activities/${activity.id}/sessions`}>
                {activity.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="user-profile">
        <Link to="/profile">Profile</Link>
      </div>
      {/* <Weather /> */}
    </header>
  );
}
