import React from 'react';
import './Alerts.css'; 

const alerts = [
  {
    id: 1,
    type: 'high',
    message: 'Toxic spill detected in River X. Immediate action required.',
  },
  {
    id: 2,
    type: 'medium',
    message: 'pH levels elevated near catchment Y. Monitor closely.',
  },
  {
    id: 3,
    type: 'low',
    message: 'Slight increase in temperature around Zone Z.',
  },
];

const AlertBox = ({ type, message }) => {
  let color, icon;

  switch (type) {
    case 'high':
      color = '#ff4d4f'; // red
      icon = '⚠️';
      break;
    case 'medium':
      color = '#faad14'; // orange
      icon = '🟠';
      break;
    case 'low':
      color = '#52c41a'; // green
      icon = '🟢';
      break;
    default:
      color = '#d9d9d9'; // gray
      icon = 'ℹ️';
  }

  return (
    <div className="alert-box" style={{ borderLeft: `6px solid ${color}` }}>
      <span className="alert-icon">{icon}</span>
      <span className="alert-message">{message}</span>
    </div>
  );
};

const Alerts = () => {
  return (
    <div className="alerts-container">
      <h3>Current Alerts</h3>
      {alerts.map((alert) => (
        <AlertBox key={alert.id} type={alert.type} message={alert.message} />
      ))}
    </div>
  );
};

export default Alerts;
