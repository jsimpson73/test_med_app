import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    role: user?.role || '',
    address: user?.address || '',
    age: user?.age || '',
    bloodGroup: user?.bloodGroup || '',
    medicalHistory: user?.medicalHistory || ''
  });

  const [message, setMessage] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      role: user?.role || '',
      address: user?.address || '',
      age: user?.age || '',
      bloodGroup: user?.bloodGroup || '',
      medicalHistory: user?.medicalHistory || ''
    });
  };

  const handleSave = () => {
    // Validate form data
    if (!formData.name.trim()) {
      setMessage('Name is required');
      return;
    }

    if (!formData.phone.trim()) {
      setMessage('Phone number is required');
      return;
    }

    // Update profile
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      age: formData.age,
      bloodGroup: formData.bloodGroup,
      medicalHistory: formData.medicalHistory
    });

    setIsEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage('Password must be at least 8 characters');
      return;
    }

    // In a real app, this would make an API call
    setMessage('Password changed successfully!');
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="login-prompt">
          <i className="fa fa-user-circle"></i>
          <h3>Please Login to View Your Profile</h3>
          <p>You need to be logged in to access and manage your profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your personal information and account settings</p>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          <i className={`fa ${message.includes('success') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
          {message}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <i className="fa fa-user"></i>
            </div>
            <button className="change-avatar-btn">
              <i className="fa fa-camera"></i>
              Change Photo
            </button>
          </div>

          <div className="profile-info">
            <div className="info-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button onClick={handleEdit} className="edit-btn">
                  <i className="fa fa-edit"></i>
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={handleSave} className="save-btn">
                    <i className="fa fa-save"></i>
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    <i className="fa fa-times"></i>
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <form className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : 'readonly'}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled={true}
                    className="readonly"
                  />
                  <small>Email is your unique identifier and cannot be changed</small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : 'readonly'}
                  />
                </div>
                <div className="form-group">
                  <label>Account Type</label>
                  <input
                    type="text"
                    value={formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                    disabled={true}
                    className="readonly"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                    className={isEditing ? 'editable' : 'readonly'}
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    disabled={!isEditing}
                    placeholder="Enter your age"
                    className={isEditing ? 'editable' : 'readonly'}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                    disabled={!isEditing}
                    className={isEditing ? 'editable' : 'readonly'}
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Member Since</label>
                  <input
                    type="text"
                    value={formatDate(user.createdAt)}
                    disabled={true}
                    className="readonly"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Medical History</label>
                <textarea
                  rows="4"
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Enter any relevant medical history, allergies, or conditions"
                  className={isEditing ? 'editable' : 'readonly'}
                ></textarea>
              </div>
            </form>
          </div>
        </div>

        {/* Account Settings */}
        <div className="settings-card">
          <h3>Account Settings</h3>
          
          <div className="setting-item">
            <div className="setting-info">
              <i className="fa fa-lock"></i>
              <div>
                <h4>Change Password</h4>
                <p>Update your password to keep your account secure</p>
              </div>
            </div>
            <button 
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="setting-btn"
            >
              Change Password
            </button>
          </div>

          {showPasswordForm && (
            <div className="password-form">
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  />
                </div>
                <div className="password-actions">
                  <button type="submit" className="submit-btn">Update Password</button>
                  <button type="button" onClick={() => setShowPasswordForm(false)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="setting-item">
            <div className="setting-info">
              <i className="fa fa-bell"></i>
              <div>
                <h4>Notification Preferences</h4>
                <p>Manage how you receive appointment reminders and updates</p>
              </div>
            </div>
            <button className="setting-btn">
              Manage Notifications
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <i className="fa fa-shield-alt"></i>
              <div>
                <h4>Privacy Settings</h4>
                <p>Control your data sharing and privacy preferences</p>
              </div>
            </div>
            <button className="setting-btn">
              Privacy Settings
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-card">
          <h3>Your Health Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <i className="fa fa-calendar-check"></i>
              <div className="stat-info">
                <span className="stat-value">12</span>
                <span className="stat-label">Total Appointments</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fa fa-star"></i>
              <div className="stat-info">
                <span className="stat-value">4.8</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fa fa-file-medical"></i>
              <div className="stat-info">
                <span className="stat-value">5</span>
                <span className="stat-label">Medical Reports</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fa fa-heart"></i>
              <div className="stat-info">
                <span className="stat-value">Good</span>
                <span className="stat-label">Health Status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;