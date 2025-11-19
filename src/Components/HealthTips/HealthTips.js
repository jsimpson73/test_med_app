import React, { useState } from 'react';
import { healthTips } from '../../data/mockData';
import './HealthTips.css';

const HealthTips = () => {
  const [tips, setTips] = useState(healthTips);

  const toggleExpand = (id) => {
    setTips(tips.map(tip => 
      tip.id === id ? { ...tip, expanded: !tip.expanded } : tip
    ));
  };

  const getCategoryColor = (category) => {
    const colors = {
      'General Health': '#3685fb',
      'Fitness': '#28a745',
      'Nutrition': '#fd7e14',
      'Mental Health': '#6f42c1',
      'Lifestyle': '#20c997'
    };
    return colors[category] || '#6c757d';
  };

  return (
    <div className="health-tips-container">
      <div className="health-tips-header">
        <h1>Health Tips & Guidance</h1>
        <p>Expert advice to help you maintain a healthy lifestyle and prevent diseases</p>
      </div>

      <div className="tips-intro">
        <div className="intro-card">
          <i className="fa fa-heartbeat"></i>
          <h3>Daily Wellness</h3>
          <p>Discover simple yet effective tips for maintaining optimal health every day</p>
        </div>
        <div className="intro-card">
          <i className="fa fa-apple-alt"></i>
          <h3>Nutrition Advice</h3>
          <p>Learn about balanced diets and nutrition for better health outcomes</p>
        </div>
        <div className="intro-card">
          <i className="fa fa-brain"></i>
          <h3>Mental Wellness</h3>
          <p>Explore techniques for stress management and mental health maintenance</p>
        </div>
      </div>

      <div className="tips-categories">
        <h2>Browse by Category</h2>
        <div className="category-pills">
          <span className="category-pill" style={{ backgroundColor: '#3685fb' }}>
            General Health
          </span>
          <span className="category-pill" style={{ backgroundColor: '#28a745' }}>
            Fitness
          </span>
          <span className="category-pill" style={{ backgroundColor: '#fd7e14' }}>
            Nutrition
          </span>
          <span className="category-pill" style={{ backgroundColor: '#6f42c1' }}>
            Mental Health
          </span>
          <span className="category-pill" style={{ backgroundColor: '#20c997' }}>
            Lifestyle
          </span>
        </div>
      </div>

      <div className="tips-grid">
        <h2>Featured Health Tips</h2>
        {tips.map(tip => (
          <div key={tip.id} className="tip-card">
            <div className="tip-header">
              <div className="tip-icon">
                {tip.category === 'General Health' && <i className="fa fa-heartbeat"></i>}
                {tip.category === 'Fitness' && <i className="fa fa-running"></i>}
                {tip.category === 'Nutrition' && <i className="fa fa-apple-alt"></i>}
                {tip.category === 'Mental Health' && <i className="fa fa-brain"></i>}
                {tip.category === 'Lifestyle' && <i className="fa fa-bed"></i>}
              </div>
              <div className="tip-title-section">
                <h3>{tip.title}</h3>
                <span 
                  className="category-tag" 
                  style={{ backgroundColor: getCategoryColor(tip.category) }}
                >
                  {tip.category}
                </span>
              </div>
            </div>
            
            <div className="tip-content">
              <div className={`tip-text ${tip.expanded ? 'expanded' : 'collapsed'}`}>
                <p>{tip.content}</p>
              </div>
              
              <button 
                className="read-more-btn"
                onClick={() => toggleExpand(tip.id)}
              >
                {tip.expanded ? (
                  <>
                    <i className="fa fa-chevron-up"></i>
                    Read Less
                  </>
                ) : (
                  <>
                    <i className="fa fa-chevron-down"></i>
                    Read More
                  </>
                )}
              </button>
            </div>

            <div className="tip-actions">
              <button className="action-btn">
                <i className="fa fa-bookmark"></i>
                Save
              </button>
              <button className="action-btn">
                <i className="fa fa-share"></i>
                Share
              </button>
              <button className="action-btn">
                <i className="fa fa-print"></i>
                Print
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="additional-resources">
        <h2>Additional Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <i className="fa fa-video"></i>
            <h3>Educational Videos</h3>
            <p>Watch expert-led videos on various health topics</p>
            <button className="resource-btn">Browse Videos</button>
          </div>
          <div className="resource-card">
            <i className="fa fa-file-medical"></i>
            <h3>Health Articles</h3>
            <p>Read in-depth articles on medical conditions and treatments</p>
            <button className="resource-btn">Read Articles</button>
          </div>
          <div className="resource-card">
            <i className="fa fa-calculator"></i>
            <h3>Health Calculators</h3>
            <p>Calculate BMI, calorie needs, and other health metrics</p>
            <button className="resource-btn">Try Calculators</button>
          </div>
          <div className="resource-card">
            <i className="fa fa-ambulance"></i>
            <h3>Emergency Guide</h3>
            <p>Learn what to do in medical emergencies</p>
            <button className="resource-btn">View Guide</button>
          </div>
        </div>
      </div>

      <div className="newsletter-section">
        <div className="newsletter-content">
          <i className="fa fa-envelope"></i>
          <h3>Subscribe to Health Newsletter</h3>
          <p>Get weekly health tips and medical insights delivered to your inbox</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;