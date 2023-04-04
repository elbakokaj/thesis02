import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/ForgetPassword.css';

const ForgetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a request to the server to reset the user's password
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            body: JSON.stringify({ newPassword, confirmNewPassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // If the password reset is successful, set passwordResetSuccess to true
        if (data.success) {
            setPasswordResetSuccess(true);
        }
    };

    if (passwordResetSuccess) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="forget-password-wrapper">
            <div className="parent-container">
                <div className='forget-password-form'>
                    <form className='mainForm' onSubmit={handleSubmit}>
                        <div className='password-reset forms form-style'>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='input input-field' placeholder='Please enter your new password here' />
                            <br />
                            <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className='input input-field' placeholder='Please confirm your new password here' />
                            <br />
                            <button type="submit" className='input submit'>RESET PASSWORD</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
