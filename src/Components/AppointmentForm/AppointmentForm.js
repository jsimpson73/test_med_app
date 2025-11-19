import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
        setTimeSlot(slot);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !phoneNumber || !date || !timeSlot) {
            alert('Please fill all fields');
            return;
        }

        onSubmit({ name, phoneNumber, date, timeSlot });
        setName('');
        setPhoneNumber('');
        setDate('');
        setTimeSlot('');
        setSelectedSlot(null);
    };

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <h2>Book Appointment with {doctorName}</h2>
            <p>Speciality: {doctorSpeciality}</p>
            
            <div className="form-group">
                <label htmlFor="name">Patient Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="date">Appointment Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    required
                />
            </div>

            <div className="form-group">
                <label>Select Time Slot:</label>
                <div className="time-slots-container">
                    {timeSlots.map((slot) => (
                        <button
                            key={slot}
                            type="button"
                            className={`time-slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                            onClick={() => handleSlotSelection(slot)}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </div>

            <button type="submit" className="submit-btn">Book Appointment</button>
        </form>
    );
};

export default AppointmentForm;