import React from 'react';
import './Badges.css'; // Optional if you're not using Tailwind

const badges = [
  {
    id: 1,
    title: 'Route Checker',
    description: 'Checked all assigned routes for 7 days straight.',
    icon: '🗺️',
  },
  {
    id: 2,
    title: 'Safety Streak',
    description: 'No incidents reported in the last 30 days.',
    icon: '🛡️',
  },
  {
    id: 3,
    title: 'Early Bird',
    description: 'Started all shifts before 6 AM for 10 days in a row.',
    icon: '⏰',
  },
];

const BadgeCard = ({ icon, title, description }) => (
  <div className="badge-card">
    <div className="badge-icon">{icon}</div>
    <div className="badge-content">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

const Badges = () => {
  return (
    <div className="badges-container">
      <h3>Your Achievements</h3>
      <div className="badges-grid">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default Badges;
