import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setLoginError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock default users
      const mockUsers = [
        {
          id: 1,
          email: 'patient@example.com',
          password: 'Password123',
          name: 'John Doe',
          role: 'patient',
          phone: '+1234567890'
        },
        {
          id: 2,
          email: 'doctor@example.com',
          password: 'Password123',
          name: 'Dr. Sarah Johnson',
          role: 'doctor',
          phone: '+1234567891'
        },
        {
          id: 3,
          email: 'admin@example.com',
          password: 'Password123',
          name: 'Admin User',
          role: 'admin',
          phone: '+1234567892'
        }
      ];
      
      // Get all registered users from localStorage
      const registeredUsersJson = localStorage.getItem('stayhealthy_registered_users');
      const registeredUsers = registeredUsersJson ? JSON.parse(registeredUsersJson) : [];
      
      // Combine mock users with registered users
      const allUsers = [...mockUsers, ...registeredUsers];
      
      // Find user (check both email and password)
      const user = allUsers.find(u => 
        u.email.toLowerCase() === formData.email.toLowerCase() && 
        u.password === formData.password
      );
      
      if (user) {
        // Log the user in
        const userData = {
          ...user,
          lastLogin: new Date().toISOString()
        };
        // Remove password from user data before storing
        const { password, ...userWithoutPassword } = userData;
        login(userWithoutPassword);
        
        // Redirect to home page
        navigate('/');
      } else {
        setLoginError('Invalid email or password. Please try again.');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      email: '',
      password: ''
    });
    setErrors({});
    setLoginError('');
  };

  return (
    <div className="login-container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Welcome Back</h2>
          <p>Login to access your StayHealthy account</p>
        </div>
        
        <div className="login-text">
          Are you a new member? <Link to="/signup"> Sign Up Here</Link>
        </div>
        
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            {loginError && (
              <div className="error-message login-error">
                <i className="fa fa-exclamation-circle"></i>
                {loginError}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                className={`form-control ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <div className="btn-group">
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="demo-accounts">
          <p>Demo Accounts:</p>
          <small>Patient: patient@example.com / Password123</small>
          <small>Doctor: doctor@example.com / Password123</small>
          <small>Admin: admin@example.com / Password123</small>
        </div>
      </div>
    </div>
  );
};

export default Login;