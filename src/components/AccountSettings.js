// src/pages/AccountSettings.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/user/AccountSettings.css';

const AccountSettings = () => {
  const [emailPref, setEmailPref] = useState(true);
  const [smsPref, setSmsPref] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/profile'); // Go back to the profile
  };

  const handleToggle = (setter) => setter((prev) => !prev);

  return (
    <div className="account-settings-page">
      <div className="settings-container">
        <button className="exit-button" onClick={handleExit}>✕</button>
        <h2 className="settings-header">Account Settings</h2>

        <div className="setting-item">
          <label>Email Notifications</label>
          <div className={`toggle-switch ${emailPref ? 'active' : ''}`} 
               onClick={() => handleToggle(setEmailPref)}>
            <div className="switch"></div>
          </div>
        </div>

        <div className="setting-item">
          <label>SMS Notifications</label>
          <div className={`toggle-switch ${smsPref ? 'active' : ''}`} 
               onClick={() => handleToggle(setSmsPref)}>
            <div className="switch"></div>
          </div>
        </div>

        <div className="setting-item">
          <label>Dark Mode</label>
          <div className={`toggle-switch ${darkMode ? 'active' : ''}`} 
               onClick={() => handleToggle(setDarkMode)}>
            <div className="switch"></div>
          </div>
        </div>

        <div className="setting-item">
          <label>Enable 2FA</label>
          <div className={`toggle-switch ${twoFA ? 'active' : ''}`} 
               onClick={() => handleToggle(setTwoFA)}>
            <div className="switch"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
