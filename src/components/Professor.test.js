import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Professor from './Professor';
import '@testing-library/jest-dom';
import axios from '../axios';


jest.mock('../axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: [] })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Professor Component', () => {


    test('renders Professor component without crashing', () => {
        render(<Professor />);
    });

    test('renders Profile link Prof', () => {
        render(<Professor />);
        const profileLink = screen.getByText(/Profile/i);
        expect(profileLink).toBeInTheDocument();
    });

    test('renders Classes link Prof', () => {
        render(<Professor />);
        const classesLink = screen.getByText(/Classes/i);
        expect(classesLink).toBeInTheDocument();
    });

    test('renders Taken Attendances link Prof', () => {
        render(<Professor />);
        const takenAttendancesLink = screen.getByText(/Taken Attendances/i);
        expect(takenAttendancesLink).toBeInTheDocument();
    });

    test('renders Log out link Prof', () => {
        render(<Professor />);
        const logoutLink = screen.getByText(/Log out/i);
        expect(logoutLink).toBeInTheDocument();
    });

    it('should render Professor Profile text after clicking Profile button', async () => {
        render(<Professor />);

        // Find the Profile button and click it
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);

        // Check if the Professor Profile text is displayed after the click event
        const ProfessorProfileElement = await screen.findByTestId('professor-prof');
        expect(ProfessorProfileElement).toBeInTheDocument();
    });

    it('toggles the change password mode', async () => {
        render(<Professor />);
        // Find the Profile button and click it
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);

        // Check if the Professor Profile text is displayed after the click event
        const ProfessorProfileElement = await screen.findByTestId('professor-prof');
        expect(ProfessorProfileElement).toBeInTheDocument();
        // Find the Change Password button and click it
        const changePasswordBtn = screen.getByText('Change Password');
        fireEvent.click(changePasswordBtn);

        // Find the Change Password header using data-testid
        const changePasswordHeader = await screen.findByTestId('change-password-header');
        expect(changePasswordHeader).toBeInTheDocument();
    });

    test('edit profile form appears when the "Edit Profile" button is clicked', async () => {
        render(<Professor />);
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);

        // Check if the Professor Profile text is displayed after the click event
        const ProfessorProfileElement = await screen.findByTestId('professor-prof');
        expect(ProfessorProfileElement).toBeInTheDocument();
        // Find the Edit Porifle button and click it
        const editProfileBtn = screen.getByText('Edit Profile');
        fireEvent.click(editProfileBtn);

        // Find the Edit Profile header using data-testid
        const editProfileHeader = await screen.findByTestId('edit-header');
        expect(editProfileHeader).toBeInTheDocument();
    });


    test('change password form submits successfully', async () => {
        axios.put.mockResolvedValue({ data: {} });

        render(<Professor />);
        const profileButton = screen.getByText(/Profile/i);
        fireEvent.click(profileButton);

        const changePasswordBtn = await screen.findByText('Change Password');
        fireEvent.click(changePasswordBtn);

        const oldPasswordInput = screen.getByLabelText("Current Password:");
        const newPasswordInput = screen.getByLabelText("New Password:");
        const saveChangesBtn = screen.getByText("Save Changes");

        fireEvent.change(oldPasswordInput, { target: { value: 'oldPassword' } });
        fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });

        fireEvent.click(saveChangesBtn);

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledTimes(1);
        });
    });

    test('edit profile form submits successfully', async () => {
        axios.put.mockResolvedValue({ data: {} });

        render(<Professor />);
        const profileButton = screen.getByText(/Profile/i);
        fireEvent.click(profileButton);

        const editProfileBtn = await screen.findByText('Edit Profile');
        fireEvent.click(editProfileBtn);

        const firstNameInput = screen.getByLabelText("Name:");
        const lastNameInput = screen.getByLabelText("Surname:");
        const saveChangesBtn = screen.getByText("Save Changes");

        fireEvent.change(firstNameInput, { target: { value: 'NewFirstName' } });
        fireEvent.change(lastNameInput, { target: { value: 'NewLastName' } });

        fireEvent.click(saveChangesBtn);

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledTimes(2);
        });
    });

    test('attendance dates are displayed when the "Taken Attendances" button is clicked', async () => {
        // Add mock data for classDates
        const mockClassDates = [
            { date: '2023-05-01' },
            { date: '2023-05-02' },
        ];

        // Override the axios.get function to return mock data
        axios.get.mockResolvedValue({ data: mockClassDates });

        render(<Professor />);

        const takenAttendancesButton = screen.getByText(/Taken Attendances/i);
        fireEvent.click(takenAttendancesButton);

        await waitFor(() => {
            mockClassDates.forEach((el, index) => {
                const dateElement = screen.getByText(el.date.slice(0, 10));
                expect(dateElement).toBeInTheDocument();
            });
        });
    });


})