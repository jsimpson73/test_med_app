import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Reports.css';

const Reports = () => {
  const { user } = useAuth();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Mock medical reports data
  const [reports] = useState([
    {
      id: 1,
      title: 'Complete Blood Count (CBC)',
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      type: 'Lab Report',
      status: 'Normal',
      description: 'Complete blood count analysis including red blood cells, white blood cells, hemoglobin, and platelets.',
      fileUrl: '/reports/cbc-2024-01-15.pdf',
      thumbnail: '📊'
    },
    {
      id: 2,
      title: 'Chest X-Ray Report',
      date: '2024-01-10',
      doctor: 'Dr. Michael Chen',
      type: 'Radiology',
      status: 'Normal',
      description: 'Chest radiography examination showing clear lung fields and normal heart size.',
      fileUrl: '/reports/chest-xray-2024-01-10.pdf',
      thumbnail: '🫁'
    },
    {
      id: 3,
      title: 'Lipid Panel Test',
      date: '2023-12-20',
      doctor: 'Dr. Emily Williams',
      type: 'Lab Report',
      status: 'Borderline',
      description: 'Cholesterol and triglyceride levels analysis with cardiovascular risk assessment.',
      fileUrl: '/reports/lipid-panel-2023-12-20.pdf',
      thumbnail: '💉'
    },
    {
      id: 4,
      title: 'Electrocardiogram (ECG)',
      date: '2023-12-15',
      doctor: 'Dr. Robert Anderson',
      type: 'Cardiology',
      status: 'Normal',
      description: '12-lead electrocardiogram showing normal sinus rhythm and no acute abnormalities.',
      fileUrl: '/reports/ecg-2023-12-15.pdf',
      thumbnail: '❤️'
    },
    {
      id: 5,
      title: 'Annual Physical Examination',
      date: '2023-11-30',
      doctor: 'Dr. James Rodriguez',
      type: 'Physical Exam',
      status: 'Good',
      description: 'Comprehensive physical examination including vital signs, systems review, and health assessment.',
      fileUrl: '/reports/physical-exam-2023-11-30.pdf',
      thumbnail: '🩺'
    }
  ]);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  const handleDownloadReport = (report) => {
    // In a real app, this would trigger actual file download
    console.log('Downloading report:', report.title);
    // Create a mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${report.title.replace(/\s+/g, '_')}.pdf`;
    link.click();
  };

  const getStatusColor = (status) => {
    const colors = {
      'Normal': '#28a745',
      'Good': '#28a745',
      'Borderline': '#ffc107',
      'Abnormal': '#dc3545',
      'Critical': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Lab Report': '🧪',
      'Radiology': '📷',
      'Cardiology': '❤️',
      'Physical Exam': '🩺',
      'Pathology': '🔬',
      'MRI': '🧠',
      'CT Scan': '💻'
    };
    return icons[type] || '📄';
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
      <div className="reports-container">
        <div className="login-prompt">
          <i className="fa fa-lock"></i>
          <h3>Please Login to Access Your Reports</h3>
          <p>You need to be logged in to view and download your medical reports and records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Medical Reports & Records</h1>
        <p>Access and download your medical test results and health records</p>
      </div>

      {/* Reports Summary */}
      <div className="reports-summary">
        <div className="summary-card">
          <i className="fa fa-file-medical"></i>
          <h3>Total Reports</h3>
          <span className="summary-value">{reports.length}</span>
        </div>
        <div className="summary-card">
          <i className="fa fa-check-circle"></i>
          <h3>Normal Results</h3>
          <span className="summary-value">
            {reports.filter(r => r.status === 'Normal' || r.status === 'Good').length}
          </span>
        </div>
        <div className="summary-card">
          <i className="fa fa-exclamation-triangle"></i>
          <h3>Needs Attention</h3>
          <span className="summary-value">
            {reports.filter(r => r.status === 'Borderline' || r.status === 'Abnormal').length}
          </span>
        </div>
        <div className="summary-card">
          <i className="fa fa-calendar-alt"></i>
          <h3>Last Updated</h3>
          <span className="summary-value">
            {new Date(Math.max(...reports.map(r => new Date(r.date)))).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="reports-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search reports by title, doctor, or type..."
            className="search-input"
          />
          <i className="fa fa-search"></i>
        </div>
        
        <div className="filter-controls">
          <select className="filter-select">
            <option value="">All Types</option>
            <option value="lab">Lab Reports</option>
            <option value="radiology">Radiology</option>
            <option value="cardiology">Cardiology</option>
            <option value="physical">Physical Exam</option>
          </select>
          
          <select className="filter-select">
            <option value="">All Status</option>
            <option value="normal">Normal</option>
            <option value="borderline">Borderline</option>
            <option value="abnormal">Abnormal</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="reports-grid">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-thumbnail">
              <span className="thumbnail-icon">{report.thumbnail}</span>
              <span className="report-type">{getTypeIcon(report.type)}</span>
            </div>
            
            <div className="report-content">
              <div className="report-header">
                <h3>{report.title}</h3>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(report.status) }}
                >
                  {report.status}
                </span>
              </div>
              
              <div className="report-meta">
                <p><i className="fa fa-user-md"></i> {report.doctor}</p>
                <p><i className="fa fa-calendar"></i> {formatDate(report.date)}</p>
                <p><i className="fa fa-tag"></i> {report.type}</p>
              </div>
              
              <p className="report-description">{report.description}</p>
            </div>
            
            <div className="report-actions">
              <button 
                onClick={() => handleViewReport(report)}
                className="view-btn"
              >
                <i className="fa fa-eye"></i>
                View
              </button>
              <button 
                onClick={() => handleDownloadReport(report)}
                className="download-btn"
              >
                <i className="fa fa-download"></i>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report View Modal */}
      {showViewModal && selectedReport && (
        <div className="report-modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedReport.title}</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="close-btn"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="report-info">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Doctor:</span>
                    <span className="info-value">{selectedReport.doctor}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date:</span>
                    <span className="info-value">{formatDate(selectedReport.date)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Type:</span>
                    <span className="info-value">{selectedReport.type}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span 
                      className="info-value status"
                      style={{ color: getStatusColor(selectedReport.status) }}
                    >
                      {selectedReport.status}
                    </span>
                  </div>
                </div>
                
                <div className="report-description-full">
                  <h4>Report Description</h4>
                  <p>{selectedReport.description}</p>
                </div>
              </div>
              
              <div className="report-viewer">
                <div className="viewer-placeholder">
                  <i className="fa fa-file-pdf"></i>
                  <h4>PDF Report Viewer</h4>
                  <p>In a real application, the actual PDF would be displayed here</p>
                  <div className="pdf-placeholder">
                    <div className="pdf-page">
                      <div className="pdf-header">
                        <h5>{selectedReport.title}</h5>
                        <p>Patient: {user.name}</p>
                        <p>Date: {formatDate(selectedReport.date)}</p>
                      </div>
                      <div className="pdf-content">
                        <p>Medical report content would appear here...</p>
                        <div className="mock-data">
                          <p><strong>Patient Information:</strong></p>
                          <p>Name: {user.name}</p>
                          <p>ID: MED-{String(user.id).padStart(6, '0')}</p>
                          <p>Date of Birth: [Patient DOB]</p>
                          <p>Age: {user.age || 'N/A'}</p>
                          <p>Blood Group: {user.bloodGroup || 'N/A'}</p>
                          <br />
                          <p><strong>Test Results:</strong></p>
                          <p>Results would be displayed here based on the report type...</p>
                          <p>Normal ranges and patient values...</p>
                          <br />
                          <p><strong>Doctor's Notes:</strong></p>
                          <p>{selectedReport.description}</p>
                          <br />
                          <p><strong>Recommendations:</strong></p>
                          <p>Follow up as needed based on results...</p>
                        </div>
                      </div>
                      <div className="pdf-footer">
                        <p>Report generated by StayHealth Medical System</p>
                        <p>Page 1 of 1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                onClick={() => handleDownloadReport(selectedReport)}
                className="download-modal-btn"
              >
                <i className="fa fa-download"></i>
                Download PDF
              </button>
              <button 
                onClick={() => setShowViewModal(false)}
                className="close-modal-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="upload-section">
        <div className="upload-card">
          <i className="fa fa-cloud-upload-alt"></i>
          <h3>Upload External Reports</h3>
          <p>If you have medical reports from other healthcare providers, you can upload them here for your records.</p>
          <button className="upload-btn">
            <i className="fa fa-upload"></i>
            Choose Files to Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;