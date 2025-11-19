import React, { useState } from 'react';
import { selfCheckupTopics } from '../../data/mockData';
import './SelfCheckup.css';

const SelfCheckup = () => {
  const [topics, setTopics] = useState(selfCheckupTopics);
  const [bmiData, setBmiData] = useState({ weight: '', height: '' });
  const [bmiResult, setBmiResult] = useState(null);

  const toggleExpand = (id) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, expanded: !topic.expanded } : topic
    ));
  };

  const calculateBMI = (e) => {
    e.preventDefault();
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height);
    
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      let category = '';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setBmiResult({
        value: bmi.toFixed(1),
        category: category,
        color: bmi < 18.5 ? '#3498db' : bmi < 25 ? '#27ae60' : bmi < 30 ? '#f39c12' : '#e74c3c'
      });
    }
  };

  const resetBMI = () => {
    setBmiData({ weight: '', height: '' });
    setBmiResult(null);
  };

  return (
    <div className="self-checkup-container">
      <div className="self-checkup-header">
        <h1>Self Health Checkup</h1>
        <p>Monitor your health with these self-assessment tools and guides</p>
      </div>

      <div className="checkup-intro">
        <div className="intro-text">
          <i className="fa fa-user-md"></i>
          <h3>Take Control of Your Health</h3>
          <p>Regular self-checkups help detect potential health issues early. Use these tools to monitor your vital signs and assess your health status.</p>
        </div>
      </div>

      {/* BMI Calculator Section */}
      <div className="bmi-calculator">
        <div className="calculator-header">
          <i className="fa fa-calculator"></i>
          <h2>BMI Calculator</h2>
          <p>Calculate your Body Mass Index to assess if you're at a healthy weight</p>
        </div>
        
        <div className="bmi-content">
          <div className="bmi-form">
            <form onSubmit={calculateBMI}>
              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={bmiData.weight}
                    onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                    placeholder="Enter weight"
                  />
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    required
                    value={bmiData.height}
                    onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                    placeholder="Enter height"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="calculate-btn">
                  <i className="fa fa-chart-line"></i>
                  Calculate BMI
                </button>
                <button type="button" onClick={resetBMI} className="reset-btn">
                  <i className="fa fa-redo"></i>
                  Reset
                </button>
              </div>
            </form>
            
            {bmiResult && (
              <div className="bmi-result">
                <div className="result-value" style={{ color: bmiResult.color }}>
                  {bmiResult.value}
                </div>
                <div className="result-category" style={{ color: bmiResult.color }}>
                  {bmiResult.category}
                </div>
                <div className="bmi-scale">
                  <div className="scale-bar">
                    <div className="scale-section underweight">
                      <span>Underweight</span>
                      <small>&lt; 18.5</small>
                    </div>
                    <div className="scale-section normal">
                      <span>Normal</span>
                      <small>18.5-24.9</small>
                    </div>
                    <div className="scale-section overweight">
                      <span>Overweight</span>
                      <small>25-29.9</small>
                    </div>
                    <div className="scale-section obese">
                      <span>Obese</span>
                      <small>≥ 30</small>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health Topics Section */}
      <div className="health-topics">
        <div className="topics-header">
          <i className="fa fa-book-medical"></i>
          <h2>Health Assessment Topics</h2>
          <p>Learn about different health indicators and how to monitor them</p>
        </div>

        <div className="topics-grid">
          {topics.map(topic => (
            <div key={topic.id} className="topic-card">
              <div className="topic-header">
                <div className="topic-icon">
                  {topic.title.includes('Blood Pressure') && <i className="fa fa-heartbeat"></i>}
                  {topic.title.includes('BMI') && <i className="fa fa-weight"></i>}
                  {topic.title.includes('Diabetes') && <i className="fa fa-tint"></i>}
                  {topic.title.includes('Heart') && <i className="fa fa-heart"></i>}
                </div>
                <div className="topic-title">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
              </div>
              
              <div className="topic-content">
                <div className={`topic-text ${topic.expanded ? 'expanded' : 'collapsed'}`}>
                  <div className="topic-details">
                    <p>{topic.content}</p>
                  </div>
                </div>
                
                <button 
                  className="expand-btn"
                  onClick={() => toggleExpand(topic.id)}
                >
                  {topic.expanded ? (
                    <>
                      <i className="fa fa-chevron-up"></i>
                      Show Less
                    </>
                  ) : (
                    <>
                      <i className="fa fa-chevron-down"></i>
                      Read More
                    </>
                  )}
                </button>
              </div>

              <div className="topic-actions">
                <button className="action-btn">
                  <i className="fa fa-download"></i>
                  Download Guide
                </button>
                <button className="action-btn">
                  <i className="fa fa-print"></i>
                  Print
                </button>
                <button className="action-btn">
                  <i className="fa fa-share"></i>
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tools Section */}
      <div className="quick-tools">
        <div className="tools-header">
          <i className="fa fa-tools"></i>
          <h2>Quick Health Tools</h2>
        </div>
        
        <div className="tools-grid">
          <div className="tool-card">
            <i className="fa fa-heartbeat"></i>
            <h3>Heart Rate Calculator</h3>
            <p>Calculate your target heart rate for exercise</p>
            <button className="tool-btn">Try Now</button>
          </div>
          
          <div className="tool-card">
            <i className="fa fa-fire"></i>
            <h3>Calorie Calculator</h3>
            <p>Estimate daily calorie needs based on your goals</p>
            <button className="tool-btn">Try Now</button>
          </div>
          
          <div className="tool-card">
            <i className="fa fa-tint"></i>
            <h3>Hydration Tracker</h3>
            <p>Track your daily water intake</p>
            <button className="tool-btn">Try Now</button>
          </div>
          
          <div className="tool-card">
            <i className="fa fa-bed"></i>
            <h3>Sleep Calculator</h3>
            <p>Calculate optimal sleep schedule</p>
            <button className="tool-btn">Try Now</button>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="notice-section">
        <div className="notice-content">
          <i className="fa fa-exclamation-triangle"></i>
          <div className="notice-text">
            <h3>Important Medical Notice</h3>
            <p>These self-checkup tools are for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for medical concerns, diagnosis, or treatment. If you experience severe symptoms, seek immediate medical attention.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCheckup;