export const mockData = [
  {
    "id": 1,
    "name": "City General Hospital",
    "address": "123 Health St, City, State, 12345",
    "contact": "555-123-4567",
    "description": "A leading hospital providing comprehensive healthcare services.",
    "logo": "https://via.placeholder.com/150/007BFF/FFFFFF?text=Hospital+Logo",
    "doctors": [
      {
        "id": 101,
        "name": "Dr. John Smith",
        "specialization": "Cardiologist",
        "experience": 10,
        "workingHours": "9:00 AM - 5:00 PM",
        "availability": [
          { "date": "2025-07-05", "slots": ["10:00 AM", "11:00 AM", "2:00 PM"], "status": "available" },
          { "date": "2025-07-06", "slots": [], "status": "on_leave" },
          { "date": "2025-07-07", "slots": ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"], "status": "available" }
        ]
      },
      {
        "id": 102,
        "name": "Dr. Emily White",
        "specialization": "Neurologist",
        "experience": 8,
        "workingHours": "10:00 AM - 6:00 PM",
        "availability": [
          { "date": "2025-07-05", "slots": ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"], "status": "available" },
          { "date": "2025-07-06", "slots": ["10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"], "status": "available" }
        ]
      }
    ]
  },
  {
    "id": 2,
    "name": "Community Health Center",
    "address": "456 Oak Ave, Town, State, 67890",
    "contact": "555-987-6543",
    "description": "Your local health partner, committed to community well-being.",
    "logo": "https://via.placeholder.com/150/28A745/FFFFFF?text=Clinic+Logo",
    "doctors": [
      {
        "id": 201,
        "name": "Dr. Robert Green",
        "specialization": "Pediatrician",
        "experience": 12,
        "workingHours": "8:00 AM - 4:00 PM",
        "availability": [
          { "date": "2025-07-05", "slots": ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"], "status": "available" },
          { "date": "2025-07-06", "slots": ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"], "status": "available" }
        ]
      }
    ]
  }
];

export const mockDoctors = [
  {
    id: 101,
    fullName: "Dr. John Smith",
    email: "doctor@example.com",
    specialization: "Cardiology",
    yearsOfExperience: 10,
    hospitalName: "City General Hospital",
    role: "doctor"
  },
  {
    id: 102,
    fullName: "Dr. Emily White",
    email: "emily.white@example.com",
    specialization: "Neurology",
    yearsOfExperience: 8,
    hospitalName: "City General Hospital",
    role: "doctor"
  }
];

export const mockAppointments = [
  {
    id: "appt1",
    patientName: "Alice Johnson",
    date: "2025-07-11T10:00:00", // Today
    bookingTimestamp: "2025-07-01T09:00:00",
    doctorId: 101,
    status: "scheduled",
    noShow: false
  },
  {
    id: "appt2",
    patientName: "Bob Williams",
    date: "2025-07-11T11:30:00", // Today
    bookingTimestamp: "2025-07-02T14:00:00",
    doctorId: 101,
    status: "scheduled",
    noShow: false
  },
  {
    id: "appt3",
    patientName: "Charlie Brown",
    date: "2025-07-12T09:00:00", // Tomorrow
    bookingTimestamp: "2025-07-03T10:00:00",
    doctorId: 101,
    status: "scheduled",
    noShow: false
  },
  {
    id: "appt4",
    patientName: "Diana Prince",
    date: "2025-07-15T14:00:00", // 4 days away
    bookingTimestamp: "2025-07-04T16:00:00",
    doctorId: 101,
    status: "scheduled",
    noShow: false
  },
  {
    id: "appt5",
    patientName: "Eve Adams",
    date: "2025-07-18T10:00:00", // 7 days away
    bookingTimestamp: "2025-07-05T11:00:00",
    doctorId: 101,
    status: "scheduled",
    noShow: false
  },
  {
    id: "appt6",
    patientName: "Frank Miller",
    date: "2025-07-09T13:00:00", // Past appointment
    bookingTimestamp: "2025-06-20T10:00:00",
    doctorId: 101,
    status: "completed",
    noShow: false
  },
  {
    id: "appt7",
    patientName: "Grace Hopper",
    date: "2025-07-10T15:00:00", // Past appointment
    bookingTimestamp: "2025-06-25T11:00:00",
    doctorId: 101,
    status: "completed",
    noShow: true // Example of a no-show
  },
  {
    id: "appt8",
    patientName: "Harry Potter",
    date: "2025-07-11T10:00:00", // Today, for another doctor
    bookingTimestamp: "2025-07-01T09:00:00",
    doctorId: 102,
    status: "scheduled",
    noShow: false
  }
];