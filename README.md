# Hospital Booking Management System - Frontend UI

This project implements the frontend user interface for a hospital booking management system using React and JavaScript. It features a clean, modern, and responsive design suitable for both hospital administrators and patients. The UI is structured to easily integrate with a backend in the future, using mock data for current demonstration purposes.

## Features

### General
- **Responsive Design**: Adapts seamlessly to desktop, tablet, and mobile screens.
- **Authentication Pages**: Separate login for Patients and Administrators, registration for both roles, and a "Forgot Password" link (UI only).
- **Navigation**: Role-based navigation bar.
- **Theme**: Modern professional color palette with light/dark mode toggle.
- **Mock Data**: Uses `data/mockData.js` to simulate dynamic content.

### Hospital Administrator UI
- **Dashboard**: Summary of hospital details and registered doctors.
- **Hospital Profile Management**: Form to input/edit hospital details and upload a logo (UI placeholder).
- **Doctor Management**: Form to add/edit doctor details, manage working hours, and set availability using a calendar-based UI.
- **UI Elements**: Modals for forms, validation feedback, confirmation dialogs for deletions.

### Patient/Customer UI
- **Dashboard**: Homepage listing hospitals with search and filter options.
- **Hospital Details Page**: Displays hospital information and a list of its doctors.
- **Doctor Profile and Booking**: Detailed doctor profile, calendar for date selection, timeslot selector with availability indicators, and booking confirmation modal.
- **Appointment Management**: Page to view upcoming/past appointments with options to cancel/reschedule (UI only).
- **UI Elements**: Cards for listings, calendar component, tooltips/badges for availability, loading states.

### Additional Features (Enhancements)
- **Dark Mode**: Toggle between light and dark themes.
- **Notifications**: UI placeholder for in-app notifications (using `react-toastify`).
- **Favorites**: (UI placeholder)
- **Ratings and Reviews**: (UI placeholder)
- **Multi-Language Support**: (UI placeholder)
- **Accessibility**: Designed with keyboard navigation and ARIA labels in mind.
- **Error Handling**: User-friendly messages for invalid inputs.
- **Onboarding**: (UI placeholder)

## Technical Stack
- **Framework**: React (JavaScript)
- **Styling**: `styled-components` (CSS-in-JS)
- **State Management**: React Context API
- **Routing**: `react-router-dom`
- **UI Libraries**:
    - `react-icons`: For consistent icon set.
    - `react-calendar`: For date selection.
    - `react-toastify`: For notifications.
    - `framer-motion`: For subtle animations (e.g., modals).

## Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/         // Reusable UI components (Button, Card, Modal, FormInput, Header, Layout, LoadingSpinner)
│   ├── data/               // Mock data (mockData.js)
│   ├── pages/              // Main application pages (Login, Registration, Dashboards, Details, Management)
│   ├── styles/             // Global styles and theme configurations (GlobalStyles.js)
│   ├── App.jsx             // Main application component, routing, context providers
│   ├── index.css           // Basic CSS resets
│   ├── main.jsx            // Entry point for React app
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md               // This file
├── vite.config.js
└── eslint.config.js
```

## Setup and Running the Project

To set up and run the project locally, follow these steps:

1.  **Navigate to the `frontend` directory**:
    ```bash
    cd frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

    The application will typically open in your browser at `http://localhost:5173` (or another available port).

## Integrating with a Backend

The UI is designed to be easily integrated with a backend. Here's how you would typically proceed:

1.  **Replace Mock Data**:
    -   The `frontend/src/data/mockData.js` file currently provides all hospital and doctor data.
    -   You would replace the data fetching logic in components (e.g., `PatientDashboard.jsx`, `HospitalDetailsPage.jsx`, `DoctorProfilePage.jsx`, `AdminDashboard.jsx`, `HospitalProfileManagement.jsx`, `DoctorManagement.jsx`) from `mockData` to actual API calls.
    -   Example: Instead of `setHospitals(mockData);`, you would use `axios.get('/api/hospitals').then(res => setHospitals(res.data));`.

2.  **Implement Authentication Logic**:
    -   In `PatientLoginPage.jsx`, `AdminLoginPage.jsx`, `PatientRegistrationPage.jsx`, and `AdminRegistrationPage.jsx`, the `handleSubmit` functions currently use mock authentication.
    -   You would replace this with actual API calls to your backend's authentication endpoints (e.g., `/api/auth/login`, `/api/auth/register`).
    -   The `AuthContext` in `App.jsx` would then store actual user tokens or session information received from the backend.

3.  **Update Data Management**:
    -   For forms like `HospitalProfileManagement.jsx` and `DoctorManagement.jsx`, the `handleSubmit` functions currently just log data to the console.
    -   These would be updated to send `POST`, `PUT`, or `DELETE` requests to your backend API endpoints (e.g., `/api/hospitals`, `/api/doctors`).

## Dependencies

-   `react`: JavaScript library for building user interfaces.
-   `react-dom`: Entry point for browser-specific DOM interaction.
-   `react-router-dom`: For declarative routing in React applications.
-   `styled-components`: For CSS-in-JS styling.
-   `react-icons`: Provides popular icon sets as React components.
-   `react-calendar`: A flexible calendar component.
-   `react-toastify`: For customizable toast notifications.
-   `framer-motion`: For production-ready animations.

## Code Quality

-   **Clean and Modular Code**: Components are broken down into small, reusable units.
-   **React Best Practices**: Utilizes functional components, React Hooks (`useState`, `useEffect`, `useContext`), and prop-types (though not explicitly added for brevity in this example, recommended for larger projects).
-   **No Console Errors/Warnings**: Aim to keep the browser console clean during development.

## UI Design Guidelines Adherence

-   **Layout**: Grid-based for listings, centered for forms/modals.
-   **Typography**: Uses 'Roboto' (or similar sans-serif) with clear hierarchy.
-   **Colors**: Consistent use of soft blues, whites, grays, and specific accents for success/error.
-   **Icons**: Integrated using `react-icons`.
-   **Spacing**: Consistent spacing scale applied.
-   **Modals**: Clean, centered design with smooth animations.
-   **Loading States**: Implemented with `LoadingSpinner` component.
-   **Forms**: Clear labels, placeholders, and basic validation feedback.

## Mock Screenshots/UI Descriptions

Due to the text-based nature of this interaction, direct screenshots cannot be provided. However, here's a description of key UI screens:

1.  **Login Pages (`PatientLoginPage.jsx`, `AdminLoginPage.jsx`)**:
    -   Centered card with a title ("Patient Login" / "Administrator Login").
    -   Input fields for Email and Password.
    -   "Login" button.
    -   Links for "Forgot Password?" and "Register here".
    -   A small text link to switch between Patient and Admin login.
    -   Clean, minimalistic design with soft shadows.

2.  **Patient Dashboard (`PatientDashboard.jsx`)**:
    -   Header with "Hospital Booking" logo and navigation links ("Hospitals", "My Appointments", Theme Toggle, Logout).
    -   Main title: "Welcome, Patient! Find Your Hospital".
    -   Search input field and a dropdown filter for "All Specializations".
    -   A grid of `HospitalCard` components. Each card displays:
        -   Hospital Logo (circular).
        -   Hospital Name (prominent blue text).
        -   Address and Contact Info.
        -   "View Doctors" button.
    -   Loading spinner when data is being fetched.
    -   "No hospitals found" message if filters yield no results.

3.  **Hospital Details Page (`HospitalDetailsPage.jsx`)**:
    -   Header as above.
    -   Prominent hospital header section with logo, name, address, contact, and description.
    -   Section title: "Our Doctors".
    -   A grid of `DoctorCard` components. Each card displays:
        -   Doctor Name.
        -   Specialization, Years of Experience, Working Hours.
        -   "Book Appointment" button.
    -   "No doctors listed" message if applicable.

4.  **Doctor Profile and Booking Page (`DoctorProfilePage.jsx`)**:
    -   Header as above.
    -   Doctor profile header with a circular avatar (icon), name, specialization, experience, working hours, and associated hospital.
    -   "Select Date" section with a `react-calendar` component.
    -   "Select Timeslot" section:
        -   Displays available/unavailable timeslots as buttons (green for available, red for unavailable).
        -   Messages for "on leave" or "no timeslots available".
        -   Shows selected date and time.
        -   "Confirm Booking" button.
    -   Booking Confirmation Modal: Appears after booking, showing appointment details and a "Got It!" button.

5.  **Admin Dashboard (`AdminDashboard.jsx`)**:
    -   Header with "Hospital Booking" logo and admin navigation links ("Dashboard", "Hospital Profile", "Doctor Management", Theme Toggle, Logout).
    -   Main title: "Administrator Dashboard".
    -   "Hospital Summary" card displaying hospital logo, name, address, contact, and a button to "Edit Hospital Profile".
    -   "Registered Doctors" section with a button to "Add New Doctor".
    -   A responsive table listing doctors with columns for Name, Specialization, Experience, Working Hours, and Actions (Edit/Delete buttons).
    -   Confirmation dialog for deleting a doctor.

6.  **Hospital Profile Management Page (`HospitalProfileManagement.jsx`)**:
    -   Header as above.
    -   Title: "Manage Hospital Profile".
    -   Form card with input fields for Hospital Name, Address (Street, City, State, ZIP), Contact Number, Email, and Description (textarea).
    -   "Upload Hospital Logo" section with a file input and preview.
    -   "Save Profile" button.

7.  **Doctor Management Page (`DoctorManagement.jsx`)**:
    -   Header as above.
    -   Title: "Add New Doctor" or "Edit Doctor Profile".
    -   Form card with input fields for Doctor Name, Specialization, Years of Experience, Working Hours.
    -   "Set Doctor Availability" section:
        -   `react-calendar` for date selection.
        -   Toggle buttons for "Available" / "On Leave" status for the selected day.
        -   Input to "Add new timeslot" and a list of existing timeslots for the selected day with remove buttons.
    -   "Add Doctor" or "Update Doctor" button.

This README provides a comprehensive overview of the project, its features, technical implementation, and how to set it up.
