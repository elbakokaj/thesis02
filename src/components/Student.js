import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Student.css';

const Student = ({ name, picture }) => {
    return (
        <div className='studentPage'>

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
                            <NavLink exact to='/complain' activeClassName='active-link'>
                                Complain
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/notice' activeClassName='active-link'>
                                Notice
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/calendar' activeClassName='active-link'>
                                Calendar
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
                    <p>Welcome to your student dashboard!</p>
                    <p>Here you can access all of your important information and resources.</p>
                </div>
            </div>
        </div>
    );
};

export default Student;
