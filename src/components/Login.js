import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Make a request to the server to verify the user's credentials
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // If the user's credentials are valid, store their role in local storage and set loggedIn to true
        if (data.role) {
            localStorage.setItem('role', data.role);
            setLoggedIn(true);
        }
    };

    if (loggedIn) {
        // Redirect the user to a different page depending on their role
        const role = localStorage.getItem('role');

        if (role === 'student') {
            return <Navigate to="/dashboard/student" />;
        } else if (role === 'teacher') {
            return <Navigate to="/dashboard/teacher" />;
        } else if (role === 'admin') {
            return <Navigate to="/dashboard/admin" />;
        }
    }

    return (
        <div className="login-wrapper">
            <div className="parent-container">
                <div className='login-form'>
                    <form className='mainForm' onSubmit={handleSubmit}>
                        <div className='login forms form-style'>


                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='input input-field' placeholder='Please enter your email here' />
                            <br />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input input-field' placeholder='Please enter your password here' />
                            <br />
                            <button type="submit" className='input submit'>LOG IN</button>
                        </div>
                    </form>
                </div >
            </div >
        </div >
    );
};

export default Login;
