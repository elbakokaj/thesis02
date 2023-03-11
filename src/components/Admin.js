import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Admin.css';

const Admin = ({ name, picture }) => {
    return (
        <div className='adminPage'>

            <div className='dashboard'>
                <header>
                    <img className='profile-pic' src={picture} alt='Profile' />
                    <h1>Hello {name}!</h1>
                </header>
                <nav>
                    <ul>
                        <li>
                            <NavLink exact to='/profile' activeClassName='active-link'>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/courses' activeClassName='active-link'>
                                Courses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/requests' activeClassName='active-link'>
                                Requests
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/contact' activeClassName='active-link'>
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/logout' activeClassName='active-link'>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='content'>
                <div className='content-text'>
                    <p>Welcome to your admin dashboard!</p>
                    <p>Here you can access all of your important information and resources.</p>
                </div>
            </div>
        </div>
    );
};

export default Admin;
