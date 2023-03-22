import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Student.css';
import 'boxicons/css/boxicons.min.css';
const Student = ({ name, picture }) => {
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showContentText, setShowContentText] = useState(true);
    const [contentToShow, setContentToShow] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState([
        //dont forget to remove these when you connect backend, this are just to test if they work
        {
            from: 'Professor A',
            subject: 'Important Update on Course',
            date: '2023-03-20',
            isRead: false,
        },
        {
            from: 'Admin',
            subject: 'Upcoming Event Reminder',
            date: '2023-03-19',
            isRead: true,
        },
        {
            from: 'Professor B',
            subject: 'Assignment Deadline Extended',
            date: '2023-03-18',
            isRead: false,
        },
    ]);



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
    const fetchMessages = async () => {
        try {
            const response = await fetch('API_URL', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any authentication headers if needed
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                console.error('Error fetching messages:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);
    const renderMessages = () => {
        return messages.map((message, index) => (
            <div
                key={index}
                className={`message-row ${message.isRead ? '' : 'unread'}`}
                onClick={() => {
                    handleRowClick(message);
                    message.isRead = true;
                }}
            >
                <div className="message-from">{message.from}</div>
                <div className="message-subject">{message.subject}</div>
                <div className="message-date">{message.date}</div>
            </div>
        ));
    };

    const handleRowClick = (message) => {
        setSelectedMessage(message);
    };

    const closeMessagePopup = () => {
        setSelectedMessage(null);
    };


    return (
        <div className='studentPage'>

            <div className='dashboard-student'>
                <header>
                    <img className='profile-pic-ofStudent' src={picture} alt='Profile' />
                    <h1>Hello {name}!</h1>
                </header>

                <ul className="nav-links">
                    <li onClick={toggleProfile}>
                        <a href="#">
                            <i class='bx bx-user' ></i>
                            <span class="links_name">Profile</span>
                        </a>
                    </li>
                    <li> {/*ski punu kurgjo */}
                        <a href="#" class="active">
                            <i class='bx bx-grid-alt' ></i>
                            <span class="links_name">Courses</span>
                        </a>
                    </li>
                    <li onClick={toggleMessages}>
                        <a href="#">
                            <i class='bx bx-message' ></i>
                            <span class="links_name">Messages</span>
                        </a>
                    </li>
                    <li>  {/*ski punu kurgjo */}
                        <a href="#">
                            <i class='bx bx-log-out'></i>
                            <span class="links_name">Log out</span>
                        </a>
                    </li>
                </ul>

            </div>
            <div className='content-ofStudent'>
                {contentToShow === 'profile' && (
                    <div className='student-profile'>
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

                {!showProfile && showContentText && (
                    <div className='content-text-ofStudent'>
                        <p>Welcome to your student dashboard!</p>
                        <p>Here you can access all of your important information and resources.</p>
                    </div>
                )}

                {!showProfile && !showContentText && contentToShow === 'messages' && (
                    <div className='messagesToShow'>
                        {renderMessages()}
                    </div>
                )}
                {selectedMessage && (
                    <div className="message-popup">
                        <div className="message-popup-content">
                            <h3>{selectedMessage.subject}</h3>
                            <p><strong>From:</strong> {selectedMessage.from}</p>
                            <p><strong>Date:</strong> {selectedMessage.date}</p>
                            <p>
                                {/* Add the full message content here */}
                                This is the full message content. Replace this with actual content when connected to the backend.
                            </p>
                            <button onClick={closeMessagePopup}>Close</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Student;
