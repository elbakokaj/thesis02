import axios from '../axios';
import Login from './Login';
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Admin from './Admin';
import '@testing-library/jest-dom';

jest.mock('../axios');

describe('Login Component', () => {
    beforeEach(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
    });

    afterEach(() => {
        window.alert.mockRestore();
    });
    it('renders the login form', () => {
        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText('Please enter your email here');
        const passwordInput = getByPlaceholderText('Please enter your password here');
        const submitButton = getByText('LOG IN');
        const forgotPasswordButton = getByText('Forgot Password');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(forgotPasswordButton).toBeInTheDocument();
    });

    it('submits the login form', async () => {
        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText('Please enter your email here');
        const passwordInput = getByPlaceholderText('Please enter your password here');
        const submitButton = getByText('LOG IN');

        axios.post.mockResolvedValue({
            data: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNTg3NjE5MzQ2fQ.qC-L2bvZ1byDlUk0h9OJgKSlNrpKxBz1tO_cVZ0jKZg'
            }
        });

        fireEvent.change(emailInput, { target: { value: 'user@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('api/login', {
                email: 'user@email.com',
                pass: expect.any(String)
            });
        });
    });

    it('displays an error message when login fails', async () => {
        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText('Please enter your email here');
        const passwordInput = getByPlaceholderText('Please enter your password here');
        const submitButton = getByText('LOG IN');

        axios.post.mockRejectedValue(new Error('Login failed'));

        fireEvent.change(emailInput, { target: { value: 'user@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('api/login', {
                email: 'user@email.com',
                pass: expect.any(String)
            });
            expect(window.alert).toHaveBeenCalledWith('Error:Error: Login failed');
        });
    });

    it('sends a password reset link', async () => {
        const { getByPlaceholderText, getByText } = render(<Login />);
        const emailInput = getByPlaceholderText('Please enter your email here');
        const forgotPasswordButton = getByText('Forgot Password');
        axios.post.mockResolvedValue({});

        fireEvent.change(emailInput, { target: { value: 'user@email.com' } });
        fireEvent.click(forgotPasswordButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('/api/forgot-password/link', {
                email: 'user@email.com'
            });
            expect(window.alert).toHaveBeenCalledWith('A password reset link has been sent to your email.');
        });
    });
});
