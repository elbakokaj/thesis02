import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Admin.css';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import axios from "../axios"


const Admin = ({ name, picture }) => {
    const [students, setStudents] = useState([
        { id: 1, name: 'Alice', attendance: [] },
        { id: 2, name: 'Bob', attendance: [] },
        { id: 3, name: 'Charlie', attendance: [] },
        { id: 4, name: 'David', attendance: [] },
        { id: 5, name: 'Eve', attendance: [] },
    ]);
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
    const [showAttendance, setShowAttendance] = useState(false);
    const [selectedYear, setSelectedYear] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform any logout actions, e.g., remove tokens, clear user data
        window.localStorage.clear()
        window.location.assign('/');
    };



    const [profile, setProfile] = useState({
        name: 'John Doe',
        surname: 'Doe',
        birthday: 'January 1, 1980',
    });

    const [editBody, setEditBody] = useState({
        firstName: "",
        lastName: "",
        birthday: ""
    });
    const handleProfileChange = (e, type) => {
        const { name, value } = e.target;

        // Update the editBody object based on the input change
        setEditBody(prevEditBody => ({ ...prevEditBody, [type]: value }));
    };

    async function handleEditPost(e) {
        e.preventDefault();
        await axios.put(`/profile/edit/${admin_id}`, editBody)
            .then((res) => {
                console.log('resPUT', res)
            })
            .catch(err =>
                alert("Error:" + err)
            )
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        // Handle saving changes here (e.g., send a request to update the profile in the backend)
        toggleEditMode();
    };
    const toggleAccountSettings = () => {
        setShowAccountSettings(!showAccountSettings);
    };

    const [userData, setUserData] = useState(null)

    const admin_id = window.localStorage.getItem("user_id")

    const toggleProfile = async (e) => {
        e.preventDefault();
        if (contentToShow !== 'profile') {
            await axios.get(`/profile/${admin_id}`)
                .then((res) => {
                    setUserData(res.data[0])


                })
                .catch(err =>
                    alert("Error:" + err)
                )
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



    // const handleContactClick = () => {
    //     if (students.length === 0) {
    //         setStudents(setDefaultStudents());
    //     }
    //     if (contentToShow !== 'contact') {
    //         setContentToShow('contact');
    //         setShowContentText(false);
    //     } else {
    //         setContentToShow('');
    //         setShowContentText(true);
    //     }
    // };

    const toggleCourses = () => {
        setContentToShow('courses');
        setShowContentText(false);
        setSelectedSemester(null);
        setSelectedCourse(null);
        setSelectedGroup(null);
        setSelectedDate(null);
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

    const EXAMPLE_GROUPS = [
        { id: 1, name: 'Group 1' },
        { id: 2, name: 'Group 2' },
        { id: 3, name: 'Group 3' },
    ];

    const EXAMPLE_CLASS_DATES = [
        { id: 1, name: 'Date 1' },
        { id: 2, name: 'Date 2' },
        { id: 3, name: 'Date 3' },
    ];

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

    const handlePictureClick = () => {
        console.log("Clicked to change profile picture");
        // Handle picture change event here (e.g., open file picker, upload and update the picture)
    };

    const CourseSelection = ({ courses, setSelectedCourse }) => {
        // render a list of courses and handle course selection
        const handleCourseClick = (course) => {
            setSelectedCourse(course);
            setGroups(EXAMPLE_GROUPS);
        };

        return (
            <div>
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
            setClassDates(EXAMPLE_CLASS_DATES);
        };

        return (
            <div>

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


    const AttendanceList = ({ attendance, setAttendance, students }) => {
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
                            const studentAttendance = attendance.find(item => item.studentId === student.id);
                            return (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>
                                        <div className="attendance-status">
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
                            );
                        })}
                    </tbody>
                </table>
                <button className='saveAttendanceButton' onClick={() => console.log(attendance)}>Save Attendance</button>
            </div>
        );
    };

    return (
        <div className='adminPage'>

            <div className='dashboard-admin'>
                <header>
                    {/* <img className='profile-pic-ofAdmin' src={picture} alt='Profile' /> */}
                    <h1>Welcome!</h1>
                </header>

                <ul className="nav-links">
                    <li onClick={toggleProfile}>
                        <a href="#">
                            <i className='bx bx-user' ></i>
                            <span className="links_name">Profile</span>
                        </a>
                    </li>
                    <li onClick={toggleCourses}>
                        <a href="#">
                            <i className='bx bx-grid-alt' ></i>
                            <span className="links_name">Courses</span>
                        </a>
                    </li>


                    {/* <li onClick={handleContactClick}>
                        <a href="#">
                            <i className='bx bx-list-ul' ></i>
                            <span className="links_name">Contact</span>
                        </a>
                    </li> */}
                    <li onClick={handleLogout}>
                        <a href="#">
                            <i className='bx bx-log-out'></i>
                            <span className="links_name">Log out</span>
                        </a>
                    </li>
                </ul>

            </div>
            <div className='content-ofAdmin'>
                {contentToShow === 'profile' && (
                    <div className={`admin-profile ${isEditMode ? "edit-mode" : ""}`}>
                        {/* <div className="profile-picture">
                            <img src={picture} alt="Profile" />
                            <i className="bx bx-camera camera-icon" onClick={handlePictureClick}></i>
                        </div> */}
                        {isEditMode ? (
                            // Edit form
                            <form onSubmit={handleEditPost}>
                                <h2>Edit Profile</h2>
                                <label>
                                    Name: <input type="text" name='name' defaultValue={userData?.firstName} onChange={(e) => handleProfileChange(e, "firstName")} />
                                </label>
                                <label>
                                    Surname: <input type="text" name='surname' defaultValue={userData?.lastName} onChange={(e) => handleProfileChange(e, "lastName")} />
                                </label>
                                <label>
                                    Birthday: <input type="date" name='birthday' defaultValue={userData?.birthday.substring(0, 10)} onChange={(e) => handleProfileChange(e, "birthday")} />
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
                                <h2>Admin Profile</h2>
                                <p><strong>Name:</strong> {userData?.firstName}</p>
                                <p><strong>Surname:</strong> {userData?.lastName}</p>
                                <p><strong>Birthday:</strong> {userData?.birthday.substring(0, 10)}</p>
                                {/* Add Edit button */}
                                <button className="edit-profile-btn" onClick={toggleEditMode}>Edit Profile</button>
                            </>
                        )}
                    </div>
                )}
                {!showProfile && showContentText && !showSemesters && (
                    <div className='content-text-ofAdmin'>
                        <p>Welcome to your admin dashboard!</p>
                        <p>Here you can access all of your important information and resources.</p>
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
                {/* {contentToShow === 'contact' && (
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
                )} */}

                {!selectedDate && contentToShow === 'courses' && (
                    <div className='semesterSelection'>
                        <div className="white-box">
                            <h2>Select Semester</h2>
                            <ul>
                                {semesters.map((semester, index) => (
                                    <li key={index} onClick={() => onSelectSemester(semester)}>
                                        {semester.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {selectedSemester !== null && (
                            <div className="white-box">
                                <h2>Select Course</h2>
                                <CourseSelection courses={courses} setSelectedCourse={setSelectedCourse} />
                            </div>
                        )}
                    </div>
                )}




                {!selectedDate && selectedCourse !== null && contentToShow === 'courses' && (
                    <div className='groupSelection'>
                        <div className="white-box">
                            <h2>Select Group</h2>
                            <GroupSelection groups={groups} setSelectedGroup={setSelectedGroup} />
                        </div>
                        {selectedGroup !== null && contentToShow === 'courses' && (
                            <div className="white-box">
                                <h2>Select Date</h2>
                                <ClassDateSelection classDates={classDates} setSelectedDate={date => { setSelectedDate(date); setContentToShow('attendance') }} />
                            </div>
                        )}
                    </div>
                )}

                {contentToShow === 'attendance' && selectedDate !== null && (
                    <AttendanceList attendance={attendance} setAttendance={setAttendance} students={students} />
                )}





            </div>
        </div>
    );
};

export default Admin;
