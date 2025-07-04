const mockData = [
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

export default mockData;