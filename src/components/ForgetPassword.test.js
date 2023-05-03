import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ForgetPassword from './ForgetPassword';
import fetch from 'node-fetch';
import 'isomorphic-fetch';

jest.mock('node-fetch', () => jest.fn());
describe('ForgetPassword component', () => {

    it('renders the password reset form', () => {
        const { getByPlaceholderText, getByText } = render(<ForgetPassword />);
        const newPasswordInput = getByPlaceholderText('Please enter your new password here');
        const confirmNewPasswordInput = getByPlaceholderText('Please confirm your new password here');
        const submitButton = getByText('RESET PASSWORD');

        expect(newPasswordInput).toBeInTheDocument();
        expect(confirmNewPasswordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('updates the newPassword state on input change', () => {
        const { getByPlaceholderText } = render(<ForgetPassword />);

        const newPasswordInput = getByPlaceholderText('Please enter your new password here');

        fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });

        expect(newPasswordInput.value).toBe('newPassword');
    });
    it('updates the confirmNewPassword state on input change', () => {
        const { getByPlaceholderText } = render(<ForgetPassword />);

        const confirmNewPasswordInput = getByPlaceholderText('Please confirm your new password here');

        fireEvent.change(confirmNewPasswordInput, { target: { value: 'confirmNewPassword' } });

        expect(confirmNewPasswordInput.value).toBe('confirmNewPassword');
    });
    // it('navigates to the login page on successful password reset', async () => {
    //     const mockResponse = { success: true };
    //     jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    //         json: () => Promise.resolve(mockResponse)
    //     }));

    //     const { getByText } = render(<ForgetPassword />);

    //     const resetPasswordButton = getByText('RESET PASSWORD');

    //     fireEvent.click(resetPasswordButton);

    //     expect(global.fetch).toHaveBeenCalledWith('/api/reset-password', {
    //         method: 'POST',
    //         body: JSON.stringify({ newPassword: '', confirmNewPassword: '' }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     await new Promise(resolve => setTimeout(resolve, 0));

    //     const navigateComponent = getByText('Navigate');

    //     expect(navigateComponent).toBeInTheDocument();
    // });








});
