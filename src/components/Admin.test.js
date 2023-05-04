import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Admin from './Admin';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';


// Mocking axios and useNavigate
// jest.mock('axios');
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: () => jest.fn(),
// }));

jest.mock('../axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Admin Component', () => {

    test('renders Admin component without crashing', () => {
        render(<Admin />);
    });


    test('renders Profile link Admin', () => {
        render(<Admin />);
        const profileLink = screen.getByText(/Profile/i);
        expect(profileLink).toBeInTheDocument();
    });

    test('renders Courses link Admin', () => {
        render(<Admin />);
        const coursesLink = screen.getByText(/Courses/i);
        expect(coursesLink).toBeInTheDocument();
    });

    test('renders Log out link Admin', () => {
        render(<Admin />);
        const logoutLink = screen.getByText(/Log out/i);
        expect(logoutLink).toBeInTheDocument();
    });

    it('should render Admin Profile text after clicking Profile button', async () => {
        render(<Admin />);

        // Find the Profile button and click it
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);

        // Check if the Admin Profile text is displayed after the click event
        const adminProfileElement = await screen.findByTestId('admin-prof');
        expect(adminProfileElement).toBeInTheDocument();
    });

    it('toggles the change password mode', async () => {
        render(<Admin />);
        // Find the Profile button and click it
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);

        // Check if the Admin Profile text is displayed after the click event
        const adminProfileElement = await screen.findByTestId('admin-prof');
        expect(adminProfileElement).toBeInTheDocument();
        // Find the Change Password button and click it
        const changePasswordBtn = screen.getByText('Change Password');
        fireEvent.click(changePasswordBtn);

        // Find the Change Password header using data-testid
        const changePasswordHeader = await screen.findByTestId('change-password-header');
        expect(changePasswordHeader).toBeInTheDocument();
    });




    test('edit profile form appears when the "Edit Profile" button is clicked', async () => {
        render(<Admin />);
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);

        // Check if the Admin Profile text is displayed after the click event
        const adminProfileElement = await screen.findByTestId('admin-prof');
        expect(adminProfileElement).toBeInTheDocument();
        // Find the Edit Porifle button and click it
        const editProfileBtn = screen.getByText('Edit Profile');
        fireEvent.click(editProfileBtn);

        // Find the Edit Profile header using data-testid
        const editProfileHeader = await screen.findByTestId('edit-header');
        expect(editProfileHeader).toBeInTheDocument();
    });

    test('shows Courses when Courses link is clicked', async () => {
        render(<Admin />);
        const coursesLink = screen.getByText(/Courses/i);

        fireEvent.click(coursesLink);

        // const courseRow = await screen.findByText(/Mock Course/i);
        // fireEvent.click(courseRow);

        const semestersToShow = await screen.findByTestId("semesterSelection");
        expect(semestersToShow).toBeInTheDocument();
    });

    test('Attendance List is Shown', async () => {
        render(<Admin />);
        const coursesLink = screen.getByText(/Courses/i);

        fireEvent.click(coursesLink);

        // const courseRow = await screen.findByText(/Mock Course/i);
        // fireEvent.click(courseRow);

        const semestersToShow = await screen.findByTestId("semesterSelection");
        expect(semestersToShow).toBeInTheDocument();
        fireEvent.click(semestersToShow)

        const datesToShow = await screen.findByTestId("datesSelection");
        expect(datesToShow).toBeInTheDocument();
        fireEvent.click(datesToShow)

        const attendance = await screen.findByText("Attendance List");
        expect(attendance).toBeInTheDocument();
    });
});
