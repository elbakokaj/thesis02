import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Professor.css';
import 'boxicons/css/boxicons.min.css';

const Professor = ({ name, picture }) => {
    const [showSchoolYearPopup, setShowSchoolYearPopup] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showEmailListPopup, setShowEmailListPopup] = useState(false);
    const [showEmailFormPopup, setShowEmailFormPopup] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState("");
    const [showEmailList, setShowEmailList] = useState(false);
    const [contentToShow, setContentToShow] = useState('');
    const [showContentText, setShowContentText] = useState(true);

    const [profile, setProfile] = useState({
        name: 'John Doe',
        surname: 'Doe',
        birthday: 'January 1, 1980',
        degree: 'Ph.D. in Computer Science',
        consultationHours: 'Tuesdays and Thursdays, 2-4pm',
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

    const toggleSchoolYearPopup = () => {
        setShowSchoolYearPopup(!showSchoolYearPopup);
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

    const toggleEmailListPopup = () => {
        setShowEmailListPopup(!showEmailListPopup);
    };

    const openEmailFormPopup = (email) => {
        setSelectedEmail(email);
        setShowEmailFormPopup(true);
    };

    const closeEmailFormPopup = () => {
        setSelectedEmail("");
        setShowEmailFormPopup(false);
    };

    const setDefaultStudents = () => {
        return [
            { id: 1, name: 'Alice', attendance: [] },
            { id: 2, name: 'Bob', attendance: [] },
            { id: 3, name: 'Charlie', attendance: [] },
            { id: 4, name: 'David', attendance: [] },
            { id: 5, name: 'Eve', attendance: [] },
        ];
    };

    const handleSchoolYearSelect = (schoolYear) => {
        setSelectedYear(schoolYear);
        setStudents(setDefaultStudents());
        setShowSchoolYearPopup(false);
        setContentToShow('attendance');
    };

    const handleAttendance = (studentId, status) => {
        // find the student in the list
        const updatedStudents = students.map((student) => {
            if (student.id === studentId) {
                // Remove all existing statuses
                const updatedAttendance = student.attendance.filter(
                    (attendanceStatus) =>
                        attendanceStatus !== 'present' &&
                        attendanceStatus !== 'excused' &&
                        attendanceStatus !== 'absent'
                );

                // Add the new status
                updatedAttendance.push(status);

                return { ...student, attendance: updatedAttendance };
            } else {
                return student;
            }
        });

        // update the state
        setStudents(updatedStudents);
    };


    const handleSendEmail = (e) => {
        e.preventDefault();
        // Implement your email sending logic here
        console.log("Email sent to:", selectedEmail);
        closeEmailFormPopup();
    };



    const handleContactClick = () => {
        if (students.length === 0) {
            setStudents(setDefaultStudents());
        }
        if (contentToShow !== 'contact') {
            setContentToShow('contact');
            setShowContentText(false);
        } else {
            setContentToShow('');
            setShowContentText(true);
        }
    };

    const toggleEmailList = () => {
        setShowEmailList(!showEmailList);
        setShowProfile(false);
        setShowContentText(false);
    };

    const saveAttendance = async () => {
        // You will need to replace this URL with the actual API endpoint
        const apiUrl = 'https://your-backend-api/attendance';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ students }),
            });

            if (!response.ok) {
                throw new Error(`Failed to save attendance data: ${response.statusText}`);
            }

            console.log('Attendance data saved successfully');
        } catch (error) {
            console.error('Error while saving attendance data:', error);
        }
    };

    const handlePictureClick = () => {
        console.log("Clicked to change profile picture");
        // Handle picture change event here (e.g., open file picker, upload and update the picture)
    };

    return (
        <div className='professorPage'>
            <div className='dashboard-professor'>
                <header>
                    <img className='profile-pic-ofProfessor' src={picture} alt='Profile' />
                    <h1>Hello {name}!</h1>
                </header>

                <ul className="nav-links">
                    <li onClick={toggleProfile}>
                        <a href="#">
                            <i className='bx bx-user' ></i>
                            <span className="links_name">Profile</span>
                        </a>
                    </li>
                    <li onClick={toggleSchoolYearPopup}>
                        <a href="#">
                            <i className='bx bx-grid-alt' ></i>
                            <span className="links_name">Classes</span>
                        </a>
                    </li>
                    <li onClick={handleContactClick}>
                        <a href="#">
                            <i className='bx bx-list-ul' ></i>
                            <span className="links_name">Contact</span>
                        </a>
                    </li>

                    <li>  {/*ski punu kurgjo */}
                        <a href="#">
                            <i className='bx bx-log-out'></i>
                            <span className="links_name">Log out</span>
                        </a>
                    </li>
                </ul>

            </div>
            <div className='content-ofProfessor'>
                {contentToShow === 'profile' && (
                    <div className={`professor-profile ${isEditMode ? "edit-mode" : ""}`}>
                        <div className="profile-picture">
                            <img src={picture} alt="Profile" />
                            <i className="bx bx-camera camera-icon" onClick={handlePictureClick}></i>
                        </div>
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
                                    Degree: <input name='degree' value={profile.degree} onChange={handleProfileChange} />
                                </label>
                                <label>
                                    Consultation Hours: <input name='consultationHours' value={profile.consultationHours} onChange={handleProfileChange} />
                                </label>
                                <label>
                                    Current Password: <input name='currentPassword' value={profile.currentPassword} onChange={handleProfileChange} />
                                </label>
                                <label>
                                    New Password: <input name='newPassword' value={profile.newPassword} onChange={handleProfileChange} />
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
                                <p><strong>Degree:</strong> {profile.degree}</p>
                                <p><strong>Consultation Hours:</strong> {profile.consultationHours}</p>
                                {/* Add Edit button */}
                                <button className="edit-profile-btn" onClick={toggleEditMode}>Edit Profile</button>
                            </>
                        )}
                    </div>
                )}
                {!showProfile && showContentText && students.length === 0 && (
                    <div className='content-text-ofProfessor'>
                        <p>Welcome to your professor dashboard!</p>
                        <p>Here you can access all of your important information and resources.</p>
                    </div>
                )}
                {contentToShow === 'attendance' && students.length > 0 && (
                    <div className='attendance-list'>
                        <h2>Attendance for School Year {selectedYear}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>
                                            <div className='attendance-status'>
                                                <button
                                                    className={`status-btn ${student.attendance.includes('present') ? 'present' : ''}`}
                                                    onClick={() => handleAttendance(student.id, 'present')}
                                                >
                                                    Present
                                                </button>
                                                <button
                                                    className={`status-btn ${student.attendance.includes('excused') ? 'excused' : ''}`}
                                                    onClick={() => handleAttendance(student.id, 'excused')}
                                                >
                                                    Excused
                                                </button>
                                                <button
                                                    className={`status-btn ${student.attendance.includes('absent') ? 'absent' : ''}`}
                                                    onClick={() => handleAttendance(student.id, 'absent')}
                                                >
                                                    Absent
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className='saveAttendanceButton' onClick={saveAttendance}>Save Attendance</button>
                    </div>
                )}
                {showSchoolYearPopup && (
                    <div className='popup'>
                        <div className='popup-content'>
                            <button className='popup-close' onClick={toggleSchoolYearPopup}>
                                X
                            </button>
                            <h2>Select a School Year</h2>
                            <ul>
                                <li onClick={() => handleSchoolYearSelect('2021-2022')}>
                                    <a href='#'>2021-2022</a>
                                </li>
                                <li onClick={() => handleSchoolYearSelect('2022-2023')}>
                                    <a href='#'>2022-2023</a>
                                </li>
                                <li onClick={() => handleSchoolYearSelect('2023-2024')}>
                                    <a href='#'>2023-2024</a>
                                </li>
                            </ul>

                        </div>
                    </div>
                )}

                {showAccountSettings && (
                    <div className='popup'>
                        <div className='popup-content'>
                            <h2>Account Settings</h2>
                            <ul>
                                <li onClick={toggleProfile}>
                                    <a href='#'>View Profile</a>
                                </li>
                                <li>
                                    <a href='#'>Edit Profile</a>
                                </li>
                            </ul>
                            <button className='popup-close' onClick={toggleAccountSettings}>
                                X
                            </button>
                        </div>
                    </div>
                )}


                {showEmailFormPopup && (
                    <div className='popupEmail'>
                        <div className='popup-contentEmail'>
                            <h2>Send Email to {selectedEmail}</h2>
                            <form onSubmit={handleSendEmail}>
                                <label>
                                    Subject: <input type='text' name='subject' />
                                </label>
                                <label>
                                    Message: <textarea name='message'></textarea>
                                </label>
                                <button type='submit'>Send</button>
                                <button type='button' onClick={closeEmailFormPopup}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
                {contentToShow === 'contact' && (
                    <div className='email-list'>
                        <h2>Email List</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.name.split(" ")[0]}</td>
                                        <td>{student.name.split(" ")[1]}</td>
                                        <td>
                                            <a
                                                href='#'
                                                onClick={() =>
                                                    openEmailFormPopup(
                                                        `${student.name.toLowerCase().replace(" ", ".")}@example.com`
                                                    )
                                                }
                                            >
                                                {`${student.name.toLowerCase().replace(" ", ".")}@example.com`}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Professor;