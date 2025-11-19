export const specialties = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Gynecologist',
  'Neurologist',
  'Orthopedic',
  'Psychiatrist',
  'Ophthalmologist',
  'ENT Specialist'
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'General Physician',
    experience: 12,
    rating: 4.8,
    education: 'MD, Harvard Medical School',
    availability: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    image: 'https://images.unsplash.com/photo-1559839734-49b0a14c7f1c?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    education: 'MD, Johns Hopkins University',
    availability: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Dermatologist',
    experience: 8,
    rating: 4.7,
    education: 'MD, Stanford University',
    availability: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '05:00 PM'],
    image: 'https://images.unsplash.com/photo-1594824475065-5c3c9d6565dc?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Dr. James Rodriguez',
    specialty: 'Pediatrician',
    experience: 10,
    rating: 4.9,
    education: 'MD, UCLA Medical School',
    availability: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Gynecologist',
    experience: 14,
    rating: 4.8,
    education: 'MD, Yale School of Medicine',
    availability: ['08:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '04:00 PM'],
    image: 'https://images.unsplash.com/photo-1559839734-49b0a14c7f1c?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Dr. Robert Anderson',
    specialty: 'Neurologist',
    experience: 18,
    rating: 4.9,
    education: 'MD, Columbia University',
    availability: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '05:00 PM'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: 7,
    name: 'Dr. Maria Garcia',
    specialty: 'Orthopedic',
    experience: 11,
    rating: 4.7,
    education: 'MD, Northwestern University',
    availability: ['08:00 AM', '09:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '04:00 PM'],
    image: 'https://images.unsplash.com/photo-1594824475065-5c3c9d6565dc?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: 8,
    name: 'Dr. David Kim',
    specialty: 'Psychiatrist',
    experience: 9,
    rating: 4.8,
    education: 'MD, University of Pennsylvania',
    availability: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face'
  }
];

export const healthTips = [
  {
    id: 1,
    title: 'Stay Hydrated',
    category: 'General Health',
    content: 'Drinking at least 8 glasses of water daily helps maintain bodily functions, improves skin health, and boosts energy levels. Proper hydration is essential for overall wellness.',
    expanded: false
  },
  {
    id: 2,
    title: 'Regular Exercise',
    category: 'Fitness',
    content: 'Aim for at least 30 minutes of moderate exercise daily. Regular physical activity reduces the risk of chronic diseases, improves mental health, and enhances overall quality of life.',
    expanded: false
  },
  {
    id: 3,
    title: 'Balanced Diet',
    category: 'Nutrition',
    content: 'Include a variety of fruits, vegetables, whole grains, and lean proteins in your diet. Limit processed foods, sugar, and saturated fats for optimal health.',
    expanded: false
  },
  {
    id: 4,
    title: 'Mental Wellness',
    category: 'Mental Health',
    content: 'Practice mindfulness, meditation, or stress-reduction techniques. Prioritize mental health as much as physical health for overall well-being.',
    expanded: false
  },
  {
    id: 5,
    title: 'Quality Sleep',
    category: 'Lifestyle',
    content: 'Aim for 7-9 hours of quality sleep each night. Good sleep is crucial for physical recovery, mental clarity, and immune system function.',
    expanded: false
  }
];

export const selfCheckupTopics = [
  {
    id: 1,
    title: 'Blood Pressure Monitoring',
    description: 'Learn how to monitor and understand your blood pressure readings',
    content: 'Normal blood pressure is typically around 120/80 mmHg. Regular monitoring helps detect hypertension early. Use a validated blood pressure monitor, measure at the same time daily, and keep a log of your readings. Consult a doctor if you consistently have readings above 130/80 mmHg.',
    expanded: false
  },
  {
    id: 2,
    title: 'BMI Calculator',
    description: 'Calculate and understand your Body Mass Index',
    content: 'BMI is calculated by dividing weight in kilograms by height in meters squared. A healthy BMI ranges from 18.5 to 24.9. BMI below 18.5 indicates underweight, 25-29.9 indicates overweight, and 30 or above indicates obesity. Always consider other factors like muscle mass and body composition.',
    expanded: false
  },
  {
    id: 3,
    title: 'Diabetes Risk Assessment',
    description: 'Assess your risk for type 2 diabetes',
    content: 'Risk factors include age over 45, family history, overweight, physical inactivity, and high blood pressure. Regular exercise, maintaining healthy weight, and balanced diet can reduce your risk. Consider regular blood sugar testing if you have multiple risk factors.',
    expanded: false
  },
  {
    id: 4,
    title: 'Heart Health Check',
    description: 'Basic cardiovascular health assessment',
    content: 'Monitor your heart rate, blood pressure, and cholesterol levels. A normal resting heart rate is 60-100 BPM. Watch for symptoms like chest pain, shortness of breath, or irregular heartbeats. Regular cardiovascular exercise and a heart-healthy diet are essential for prevention.',
    expanded: false
  }
];