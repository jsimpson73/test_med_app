import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doctors } from '../../data/mockData';
import Popup from 'reactjs-popup';
import './Reviews.css';

const Reviews = () => {
  const { user, appointments, addReview } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      appointmentId: 101,
      doctorId: 1,
      doctorName: 'Dr. Sarah Johnson',
      patientName: 'John Doe',
      rating: 5,
      comment: 'Excellent consultation! Dr. Johnson was very thorough and caring.',
      date: '2024-01-15'
    },
    {
      id: 2,
      appointmentId: 102,
      doctorId: 2,
      doctorName: 'Dr. Michael Chen',
      patientName: 'Jane Smith',
      rating: 4,
      comment: 'Very professional and knowledgeable. Wait time was a bit long but overall good experience.',
      date: '2024-01-10'
    }
  ]);

  const handleGiveReview = (appointment) => {
    setSelectedAppointment(appointment);
    setReviewForm({ rating: 0, comment: '' });
    setShowReviewForm(true);
  };

  const handleStarClick = (rating) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (reviewForm.rating === 0) {
      alert('Please select a rating');
      return;
    }

    const newReview = {
      id: Date.now(),
      appointmentId: selectedAppointment.id,
      doctorId: selectedAppointment.doctorId,
      doctorName: selectedAppointment.doctorName,
      patientName: user.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([...reviews, newReview]);
    addReview(newReview);
    setShowReviewForm(false);
    setReviewForm({ rating: 0, comment: '' });
  };

  const hasReviewed = (appointmentId) => {
    return reviews.some(review => review.appointmentId === appointmentId);
  };

  const getDoctorInfo = (doctorId) => {
    return doctors.find(doc => doc.id === doctorId);
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className={`stars ${interactive ? 'interactive' : ''}`}>
        {[1, 2, 3, 4, 5].map(star => (
          <i
            key={star}
            className={`fa ${star <= (interactive ? (hoveredStar || reviewForm.rating) : rating) ? 'fa-star' : 'fa-star-o'}`}
            style={{ 
              color: star <= (interactive ? (hoveredStar || reviewForm.rating) : rating) ? '#ffd700' : '#ddd',
              cursor: interactive ? 'pointer' : 'default'
            }}
            onClick={interactive ? () => handleStarClick(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredStar(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredStar(0) : undefined}
          ></i>
        ))}
      </div>
    );
  };

  const averageRating = (doctorId) => {
    const doctorReviews = reviews.filter(review => review.doctorId === doctorId);
    if (doctorReviews.length === 0) return 0;
    const sum = doctorReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / doctorReviews.length).toFixed(1);
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h1>Consultation Reviews</h1>
        <p>Share your experience and help others make informed healthcare decisions</p>
      </div>

      {!user ? (
        <div className="login-prompt">
          <i className="fa fa-sign-in"></i>
          <h3>Please Login to View and Submit Reviews</h3>
          <p>You need to be logged in to access your consultation history and provide feedback.</p>
          <button className="login-btn">Go to Login</button>
        </div>
      ) : (
        <>
          {/* Reviews Summary */}
          <div className="reviews-summary">
            <div className="summary-card">
              <i className="fa fa-comments"></i>
              <h3>Your Reviews</h3>
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-value">{reviews.length}</span>
                  <span className="stat-label">Total Reviews</span>
                </div>
                <div className="stat">
                  <span className="stat-value">
                    {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0'}
                  </span>
                  <span className="stat-label">Avg Rating</span>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <i className="fa fa-star"></i>
              <h3>Rating Breakdown</h3>
              <div className="rating-breakdown">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = reviews.filter(r => r.rating === rating).length;
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={rating} className="rating-row">
                      <span>{rating} ★</span>
                      <div className="rating-bar">
                        <div 
                          className="rating-fill" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Appointments for Review */}
          {appointments.length > 0 && (
            <div className="appointments-for-review">
              <h2>Your Consultations</h2>
              <div className="appointments-list">
                {appointments.map(appointment => {
                  const doctorInfo = getDoctorInfo(appointment.doctorId);
                  const reviewed = hasReviewed(appointment.id);
                  
                  return (
                    <div key={appointment.id} className="appointment-review-card">
                      <div className="appointment-info">
                        <div className="doctor-header">
                          <h3>{appointment.doctorName}</h3>
                          <span className="specialty">{doctorInfo?.specialty}</span>
                        </div>
                        <div className="appointment-details">
                          <p><i className="fa fa-calendar"></i> {appointment.date}</p>
                          <p><i className="fa fa-clock"></i> {appointment.time}</p>
                          <p><i className="fa fa-user"></i> {appointment.patientName}</p>
                        </div>
                      </div>
                      
                      <div className="review-status">
                        {reviewed ? (
                          <div className="reviewed-status">
                            <i className="fa fa-check-circle"></i>
                            <span>Review Submitted</span>
                            <button className="view-review-btn">View Review</button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleGiveReview(appointment)}
                            className="give-review-btn"
                          >
                            <i className="fa fa-star"></i>
                            Give Review
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Reviews */}
          <div className="all-reviews">
            <h2>All Reviews</h2>
            {reviews.length === 0 ? (
              <div className="no-reviews">
                <i className="fa fa-comment-slash"></i>
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="reviews-grid">
                {reviews.map(review => {
                  const doctorInfo = getDoctorInfo(review.doctorId);
                  return (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            <i className="fa fa-user"></i>
                          </div>
                          <div className="reviewer-details">
                            <h4>{review.patientName}</h4>
                            <p>{review.date}</p>
                          </div>
                        </div>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      
                      <div className="review-content">
                        <div className="review-doctor">
                          <strong>Doctor:</strong> {review.doctorName} ({doctorInfo?.specialty})
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>

                      <div className="review-actions">
                        <button className="action-btn helpful">
                          <i className="fa fa-thumbs-up"></i>
                          Helpful
                        </button>
                        <button className="action-btn">
                          <i className="fa fa-flag"></i>
                          Report
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}

      {/* Review Form Modal */}
      <Popup open={showReviewForm} closeOnDocumentClick={false}>
        <div className="review-modal">
          <div className="modal-header">
            <h3>Review Your Consultation</h3>
            <button onClick={() => setShowReviewForm(false)} className="close-btn">
              <i className="fa fa-times"></i>
            </button>
          </div>
          
          <div className="modal-content">
            <div className="consultation-summary">
              <h4>Consultation with {selectedAppointment?.doctorName}</h4>
              <p><strong>Date:</strong> {selectedAppointment?.date}</p>
              <p><strong>Time:</strong> {selectedAppointment?.time}</p>
            </div>

            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Overall Rating *</label>
                {renderStars(reviewForm.rating, true)}
                {reviewForm.rating === 0 && (
                  <small>Please select a rating</small>
                )}
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  rows="4"
                  placeholder="Share your experience with the doctor. Was the consultation helpful? Was the doctor thorough and caring?"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                ></textarea>
                <small>{reviewForm.comment.length}/500 characters</small>
              </div>

              <div className="rating-questions">
                <h5>How would you rate the following?</h5>
                <div className="rating-questions-grid">
                  <div className="rating-question">
                    <span>Diagnosis Accuracy</span>
                    {renderStars(5)}
                  </div>
                  <div className="rating-question">
                    <span>Communication</span>
                    {renderStars(4)}
                  </div>
                  <div className="rating-question">
                    <span>Wait Time</span>
                    {renderStars(3)}
                  </div>
                  <div className="rating-question">
                    <span>Staff Courtesy</span>
                    {renderStars(5)}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-review-btn">
                  <i className="fa fa-paper-plane"></i>
                  Submit Review
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowReviewForm(false)} 
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Reviews;