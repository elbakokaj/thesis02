import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Admin.css';

const Admin = ({ name, picture }) => {
    const [students, setStudents] = useState([]);
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showEmailListPopup, setShowEmailListPopup] = useState(false);
    const [showEmailFormPopup, setShowEmailFormPopup] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState("");
    const [showEmailList, setShowEmailList] = useState(false);
    const [contentToShow, setContentToShow] = useState('');
    const [showContentText, setShowContentText] = useState(true);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [classDates, setClassDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [showSemesters, setShowSemesters] = useState(false);


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

    const semesters = [
        { id: 1, name: 'Fall 2022' },
        { id: 2, name: 'Spring 2023' },
        { id: 3, name: 'Summer 2023' },
    ];

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
    const onSelectSemester = (semester) => {
        setShowSemesters(false);
        setSelectedSemester(semester);
        // Replace EXAMPLE_COURSES with the actual courses data that you have
        const EXAMPLE_COURSES = [
            { id: 1, name: 'Course 1' },
            { id: 2, name: 'Course 2' },
            { id: 3, name: 'Course 3' },
        ];
        setCourses(EXAMPLE_COURSES);
    };



    const SemesterSelection = ({ semesters, setSelectedSemester }) => {
        // render a list of semesters and handle semester selection
        const handleSemesterClick = (semester) => {
            setSelectedSemester(semester);
        };

        return (
            <div>
                <h2>Select Semester</h2>
                <ul>
                    {semesters.map((semester, index) => (
                        <li key={index} onClick={() => onSelectSemester(semester)}>
                            {semester.name}
                        </li>
                    ))}

                </ul>
            </div>
        );
    };


    const CourseSelection = ({ courses, setSelectedCourse }) => {
        // render a list of courses and handle course selection
        const handleCourseClick = (course) => {
            setSelectedCourse(course);
        };

        return (
            <div>
                <h2>Select Course</h2>
                <ul>
                    {courses.map((course) => (
                        <li key={course.id} onClick={() => handleCourseClick(course)}>
                            {course.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const GroupSelection = ({ groups, setSelectedGroup }) => {
        // render a list of groups and handle group selection
        const handleGroupClick = (group) => {
            setSelectedGroup(group);
        };

        return (
            <div>
                <h2>Select Group</h2>
                <ul>
                    {groups.map((group) => (
                        <li key={group.id} onClick={() => handleGroupClick(group)}>
                            {group.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const ClassDateSelection = ({ classDates, setSelectedDate }) => {
        // render a list of class dates and handle date selection
        const handleDateClick = (date) => {
            setSelectedDate(date);
        };

        return (
            <div>
                <h2>Select Class Date</h2>
                <ul>
                    {classDates.map((date) => (
                        <li key={date.id} onClick={() => handleDateClick(date)}>
                            {date.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const AttendanceList = ({ attendance, setAttendance }) => {
        // render attendance list and handle attendance update
        const handleAttendance = (studentId, status) => {
            const updatedAttendance = attendance.map((item) => {
                if (item.studentId === studentId) {
                    return { ...item, status };
                }
                return item;
            });
            setAttendance(updatedAttendance);
        };

        return (
            <div className="attendance-list">
                <h2>Attendance List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => {
                            const studentAttendance = attendance.find((item) => item.studentId === student.id) || {};
                            return (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>
                                        <select
                                            value={studentAttendance.status}
                                            onChange={(e) => handleAttendance(student.id, e.target.value)}
                                        >
                                            <option value="present">Present</option>
                                            <option value="excused">Excused</option>
                                            <option value="absent">Absent</option>
                                        </select>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button onClick={() => console.log(attendance)}>Save Attendance</button>
            </div>
        );
    };


    return (
        <div className='adminPage'>

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
                        <li onClick={() => { setShowSemesters(true); setShowContentText(false); }}>
                            <a href='#'>Courses</a>
                        </li>

                        <li onClick={handleContactClick}>
                            <a href='#'>Contact</a>
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
                                    Degree: <input name='degree' value={profile.degree} onChange={handleProfileChange} />
                                </label>
                                <label>
                                    Consultation Hours: <input name='consultationHours' value={profile.consultationHours} onChange={handleProfileChange} />
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
                                <button onClick={toggleEditMode}>Edit Profile</button>
                            </>
                        )}
                    </div>
                )}
                {!showProfile && showContentText && !showSemesters && (
                    <div className='content-text'>
                        <p>Welcome to your professor dashboard!</p>
                        <p>Here you can access all of your important information and resources.</p>
                    </div>
                )}

                {showSemesters && selectedSemester === null && (
                    <SemesterSelection semesters={semesters} setSelectedSemester={setSelectedSemester} />
                )}

                {showEmailFormPopup && (
                    <div className='popup'>
                        <div className='popup-content'>
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

                {courses.map((course, index) => (
                    <div key={index}>
                        {course.name}
                    </div>
                ))}


                {selectedSemester !== null && selectedCourse === null && (
                    <CourseSelection courses={courses} setSelectedCourse={setSelectedCourse} />
                )}
                {selectedCourse !== null && selectedGroup === null && (
                    <GroupSelection groups={groups} setSelectedGroup={setSelectedGroup} />
                )}
                {selectedGroup !== null && selectedDate === null && (
                    <ClassDateSelection classDates={classDates} setSelectedDate={setSelectedDate} />
                )}
                {selectedDate !== null && (
                    <AttendanceList attendance={attendance} setAttendance={setAttendance} />
                )}
            </div>
        </div>
    );
};

export default Admin;
