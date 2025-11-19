import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm() {
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedMessage(formData);
      setShowWarning(false);
      setIsSubmitted(true);
      setShowForm(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Consultation Feedback</h2>
      
      {!showForm && !submittedMessage ? (
        <div className="feedback-prompt">
          <p>We value your feedback! Please share your experience with us.</p>
          <button 
            onClick={handleButtonClick} 
            className="open-form-btn"
            disabled={isSubmitted}
          >
            {isSubmitted ? 'Feedback Submitted' : 'Click Here to Provide Feedback'}
          </button>
        </div>
      ) : showForm ? (
        <form onSubmit={handleSubmit} className="review-form">
          <h3>Give Your Feedback</h3>
          
          {showWarning && <p className="warning">Please fill out all fields and select a rating.</p>}
          
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="review">Review:</label>
            <textarea 
              id="review" 
              name="review" 
              value={formData.review} 
              onChange={handleChange}
              placeholder="Share your experience..."
              rows="5"
            />
          </div>
          
          <div className="form-group">
            <label>Rating:</label>
            <div className="rating-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? 'filled' : ''}`}
                  onClick={() => handleRatingClick(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="rating-text">
              {formData.rating > 0 ? `${formData.rating} out of 5` : 'Select a rating'}
            </p>
          </div>
          
          <button type="submit" className="submit-btn">Submit Feedback</button>
        </form>
      ) : null}
      
      {submittedMessage && (
        <div className="submitted-message">
          <h3>Thank You for Your Feedback!</h3>
          <div className="feedback-summary">
            <p><strong>Name:</strong> {submittedMessage.name}</p>
            <p><strong>Rating:</strong> {submittedMessage.rating} ★</p>
            <p><strong>Review:</strong></p>
            <p className="review-text">{submittedMessage.review}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;