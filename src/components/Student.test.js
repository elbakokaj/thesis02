import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Student from './Student';

describe('Student Component', () => {
    test('renders Welcome text Student', () => {
        render(<Student />);
        const welcomeElement = screen.getByText(/Welcome!/i);
        expect(welcomeElement).toBeInTheDocument();
    });

    test('renders Profile link Student', () => {
        render(<Student />);
        const profileLink = screen.getByText(/Profile/i);
        expect(profileLink).toBeInTheDocument();
    });

    test('renders Courses link Student', () => {
        render(<Student />);
        const coursesLink = screen.getByText(/Courses/i);
        expect(coursesLink).toBeInTheDocument();
    });

    test('renders Log out link Student', () => {
        render(<Student />);
        const logoutLink = screen.getByText(/Log out/i);
        expect(logoutLink).toBeInTheDocument();
    });

    test('shows Student Profile when Profile link is clicked', async () => {
        render(<Student />);
        const profileLink = screen.getByText(/Profile/i);

        fireEvent.click(profileLink);

        const studentProfile = await screen.findByText(/Student Profile/i);
        expect(studentProfile).toBeInTheDocument();
    });

    test('shows Courses when Courses link is clicked', async () => {
        render(<Student />);
        const coursesLink = screen.getByText(/Courses/i);

        fireEvent.click(coursesLink);

        // const courseRow = await screen.findByText(/Mock Course/i);
        // fireEvent.click(courseRow);

        const coursesToShow = await screen.findByTestId("coursesToShow");
        expect(coursesToShow).toBeInTheDocument();
    });

    it('toggles the change password mode', async () => {
        render(<Student />);
        // Find the Profile button and click it
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);

        // Check if the student Profile text is displayed after the click event
        const studentProfileElement = await screen.findByTestId('student-prof');
        expect(studentProfileElement).toBeInTheDocument();
        // Find the Change Password button and click it
        const changePasswordBtn = screen.getByText('Change Password');
        fireEvent.click(changePasswordBtn);

        // Find the Change Password header using data-testid
        const changePasswordHeader = await screen.findByTestId('change-password-header');
        expect(changePasswordHeader).toBeInTheDocument();
    });

    test('edit profile form appears when the "Edit Profile" button is clicked', async () => {
        render(<Student />);
        const profileButton = screen.getByText('Profile');
        fireEvent.click(profileButton);

        // Check if the Admin Profile text is displayed after the click event
        const studentProfileElement = await screen.findByTestId('student-prof');
        expect(studentProfileElement).toBeInTheDocument();
        // Find the Edit Porifle button and click it
        const editProfileBtn = screen.getByText('Edit Profile');
        fireEvent.click(editProfileBtn);

        // Find the Edit Profile header using data-testid
        const editProfileHeader = await screen.findByTestId('edit-header');
        expect(editProfileHeader).toBeInTheDocument();
    });

    // test('shows Courses Statitics when Course Name link is clicked', async () => {
    //     render(<Student />);
    //     const coursesLink = screen.getByText(/Courses/i);

    //     fireEvent.click(coursesLink);

    //     await waitFor(() => {
    //         expect(screen.findByTestId("coursesToShow")).toBeInTheDocument();
    //     });

    //     const dataLink = await screen.findByTestId("coursesToShow");

    //     fireEvent.click(dataLink);

    //     const statsToShow = await screen.findByTestId("course-stats");
    //     expect(statsToShow).toBeInTheDocument();
    // });
});
