import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./ProfileCard.css";

const ProfileCard = () => {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const [updatedDetails, setUpdatedDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
    } else {
      setUpdatedDetails({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateProfile(updatedDetails);
      setEditMode(false);
      alert(`Profile Updated Successfully!`);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setUpdatedDetails({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    });
    setEditMode(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Edit Profile</h2>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Welcome, {user.name}!</h1>
          
          <div className="detail-card">
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{user.name}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{user.phone || 'Not provided'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Role:</span>
              <span className="detail-value">{user.role || 'Patient'}</span>
            </div>
          </div>

          <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;