import React, { useState } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports] = useState([
    {
      id: 1,
      name: 'Blood Test Report',
      date: '2024-01-15',
      doctor: 'Dr. John Smith',
      type: 'Laboratory',
      file: '/patient_report.pdf'
    },
    {
      id: 2,
      name: 'X-Ray Report',
      date: '2024-02-20',
      doctor: 'Dr. Sarah Johnson',
      type: 'Radiology',
      file: '/patient_report.pdf'
    },
    {
      id: 3,
      name: 'General Checkup',
      date: '2024-03-10',
      doctor: 'Dr. Michael Brown',
      type: 'General',
      file: '/patient_report.pdf'
    },
    {
      id: 4,
      name: 'Cardiology Report',
      date: '2024-03-25',
      doctor: 'Dr. Emily Davis',
      type: 'Cardiology',
      file: '/patient_report.pdf'
    }
  ]);

  const handleView = (file) => {
    window.open(file, '_blank');
  };

  const handleDownload = (file, name) => {
    const link = document.createElement('a');
    link.href = file;
    link.download = `${name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-layout-container">
      <h1>Your Medical Reports</h1>
      <p className="subtitle">View and download your medical reports</p>

      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <h3>{report.name}</h3>
              <span className="report-type">{report.type}</span>
            </div>
            
            <div className="report-details">
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">{new Date(report.date).toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span className="label">Doctor:</span>
                <span className="value">{report.doctor}</span>
              </div>
            </div>

            <div className="report-actions">
              <button 
                className="view-btn" 
                onClick={() => handleView(report.file)}
              >
                <i className="fa fa-eye"></i> View
              </button>
              <button 
                className="download-btn"
                onClick={() => handleDownload(report.file, report.name)}
              >
                <i className="fa fa-download"></i> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {reports.length === 0 && (
        <div className="no-reports">
          <p>No reports available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsLayout;