import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Student.css';

const Student = ({ name, picture }) => {
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showContentText, setShowContentText] = useState(true);
    const [contentToShow, setContentToShow] = useState('');


    const [profile, setProfile] = useState({
        name: 'John Doe',
        surname: 'Doe',
        birthday: 'January 1, 1980',
        yearEnrolled: '2020/2021'
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        // Handle saving changes here (e.g., send a request to update the profile in the backend)
        toggleEditMode();
    };
    const toggleAccountSettings = () => {
        setShowAccountSettings(!showAccountSettings);
    };

    const toggleProfile = () => {
        if (contentToShow !== 'profile') {
            setContentToShow('profile');
            setShowContentText(false);
        } else {
            setContentToShow('');
            setShowContentText(true);
        }
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const toggleMessages = () => {
        if (contentToShow !== 'messages') {
            setContentToShow('messages');
            setShowContentText(false);
        } else {
            setContentToShow('');
            setShowContentText(true);
        }
    }

    return (
        <div className='studentPage'>

            <div className='dashboard'>
                <header>
                    <img className='profile-pic' src={picture} alt='Profile' />
                    <h1>Hello {name}!</h1>
                </header>
                <nav>
                    <ul>
                        <li onClick={toggleProfile}>
                            <a href='#'>Profile</a>
                        </li>
                        <li>
                            <NavLink exact to='/courses' activeClassName='active-link'>
                                Courses
                            </NavLink>
                        </li>
                        <li onClick={toggleMessages}>
                            <a href='#'>Messages</a>
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
                {contentToShow === 'profile' && (
                    <div className='professor-profile'>
                        {isEditMode ? (
                            // Edit form
                            <form onSubmit={handleProfileSubmit}>
                                <h2>Edit Profile</h2>
                                <label>
                                    Name: <input name='name' value={profile.name} onChange={handleProfileChange} />
                                </label>
                                <label>
                                    Surname: <input name='surname' value={profile.surname} onChange={handleProfileChange} />
                                </label>
                                <label>
                                    Birthday: <input name='birthday' value={profile.birthday} onChange={handleProfileChange} />
                                </label>
                                <label>
                                    Year of Enrollment: <input name='yearEnrolled' value={profile.yearEnrolled} onChange={handleProfileChange} />
                                </label>

                                <button type='submit'>Save Changes</button>
                                <button type='button' onClick={toggleEditMode}>Cancel</button>
                            </form>
                        ) : (
                            // Profile view
                            <>
                                <h2>Professor Profile</h2>
                                <p><strong>Name:</strong> {profile.name}</p>
                                <p><strong>Surname:</strong> {profile.surname}</p>
                                <p><strong>Birthday:</strong> {profile.birthday}</p>
                                <p><strong>Year of Enrollment:</strong> {profile.yearEnrolled}</p>
                                {/* Add Edit button */}
                                <button onClick={toggleEditMode}>Edit Profile</button>
                            </>
                        )}
                    </div>
                )}
                {!showProfile && !showContentText && contentToShow === 'messages' && (
                    <div className='messagesToShow'>
                        <p>divnsdklnvsflvmlkfsmlkfmv</p>
                    </div>
                )}
                {!showProfile && showContentText && (
                    <div className='content-text'>
                        <p>Welcome to your professor dashboard!</p>
                        <p>Here you can access all of your important information and resources.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Student;
