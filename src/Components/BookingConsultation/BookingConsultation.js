import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';
import './BookingConsultation.css';

const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // Mock doctor data - in real app, this would come from API
        const mockDoctors = [
            { id: 1, name: 'Dr. John Smith', speciality: 'Dentist', experience: 10, ratings: 4.5, profilePic: '' },
            { id: 2, name: 'Dr. Sarah Johnson', speciality: 'Gynecologist/obstetrician', experience: 8, ratings: 4.7, profilePic: '' },
            { id: 3, name: 'Dr. Michael Brown', speciality: 'General Physician', experience: 15, ratings: 4.8, profilePic: '' },
            { id: 4, name: 'Dr. Emily Davis', speciality: 'Dermatologist', experience: 12, ratings: 4.6, profilePic: '' },
            { id: 5, name: 'Dr. David Wilson', speciality: 'Ear-nose-throat (ent) Specialist', experience: 9, ratings: 4.4, profilePic: '' },
            { id: 6, name: 'Dr. Lisa Anderson', speciality: 'Homeopath', experience: 7, ratings: 4.3, profilePic: '' },
            { id: 7, name: 'Dr. Robert Taylor', speciality: 'Ayurveda', experience: 11, ratings: 4.5, profilePic: '' },
            { id: 8, name: 'Dr. Jennifer Martinez', speciality: 'Dentist', experience: 6, ratings: 4.6, profilePic: '' },
            { id: 9, name: 'Dr. William Garcia', speciality: 'General Physician', experience: 14, ratings: 4.7, profilePic: '' },
            { id: 10, name: 'Dr. Amanda Rodriguez', speciality: 'Dermatologist', experience: 10, ratings: 4.8, profilePic: '' },
        ];
        setDoctors(mockDoctors);
    }, []);

    useEffect(() => {
        const speciality = searchParams.get('speciality');
        if (speciality) {
            setIsSearching(true);
            const filtered = doctors.filter(
                doctor => doctor.speciality.toLowerCase() === speciality.toLowerCase()
            );
            setFilteredDoctors(filtered);
        } else {
            setIsSearching(false);
            setFilteredDoctors([]);
        }
    }, [searchParams, doctors]);

    return (
        <div className="booking-consultation-container">
            <FindDoctorSearch />
            
            {isSearching && (
                <div className="search-results-container">
                    <h2>Available Doctors</h2>
                    {filteredDoctors.length > 0 ? (
                        <div className="doctors-grid">
                            {filteredDoctors.map(doctor => (
                                <DoctorCard
                                    key={doctor.id}
                                    name={doctor.name}
                                    speciality={doctor.speciality}
                                    experience={doctor.experience}
                                    ratings={doctor.ratings}
                                    profilePic={doctor.profilePic}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">No doctors found for this speciality.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookingConsultation;