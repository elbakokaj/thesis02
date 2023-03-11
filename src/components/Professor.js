import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Professor.css';

const Professor = ({ name, picture }) => {
    const [showSchoolYearPopup, setShowSchoolYearPopup] = useState(false);

    const toggleSchoolYearPopup = () => {
        setShowSchoolYearPopup(!showSchoolYearPopup);
    };

    return (
        <div className='professorPage'>
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
                            <NavLink exact to='/calendar' activeClassName='active-link'>
                                Calendar
                            </NavLink>
                        </li>
                        <li onClick={toggleSchoolYearPopup}>
                            <a href='#'>Classes</a>
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
                    <p>Welcome to your professor dashboard!</p>
                    <p>Here you can access all of your important information and resources.</p>
                </div>
            </div>
            {showSchoolYearPopup && (
                <div className='popup'>
                    <div className='popup-content'>
                        <h2>Select School Year</h2>
                        <ul>
                            <li>2022-2023</li>
                            <li>2021-2022</li>
                            <li>2020-2021</li>
                        </ul>
                        <button onClick={toggleSchoolYearPopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Professor;

