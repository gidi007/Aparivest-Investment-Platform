import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../stylesheets/user/UserProfile.css'; // Import CSS
import UserNav from '../components/UserNav';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const userId = Cookies.get('userId');
  const token = Cookies.get('token');
  const url = process.env.REACT_APP_URL;

  // Fetch user data from the API when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/users/${userId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUserData(response.data);
        setFormData(response.data); // Set form data for editing
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId, token, url]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/users/${userId}`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUserData(formData); // Update state with new user data
      setEditing(false); // Exit edit mode
      navigate('/profile');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    navigate('/login');
  };

  // Handle navigation to account settings
  const handleAccountSettings = () => {
    navigate('/account-settings'); // Navigate to account settings
  };

  return (
    <div className="user-profile-page">
      <UserNav />
      <main className="user-profile-main">
        <div className="user-profile-container">
          <h2>User Profile</h2>

          {editing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
              />

              <label htmlFor="balance">Balance</label>
              <input
                type="text"
                id="balance"
                name="balance"
                value={formData.balance || ''}
                onChange={handleChange}
                disabled
              />

              <button type="submit" className="save-button">Save</button>
              <button onClick={() => setEditing(false)} className="cancel-button">
                Cancel
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Balance:</strong> {userData.balance}</p>
              <button onClick={() => setEditing(true)} className="edit-button">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="logout-button">
                Log Out
              </button>
              <button onClick={handleAccountSettings} className="account-settings-button">
                Account Settings
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
