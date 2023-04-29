import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Professor.css';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import axios from "../axios"
import JsonToCsv from 'react-json-to-csv';
import Papa from "papaparse";

const Professor = () => {

    const [students, setStudents] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [contentToShow, setContentToShow] = useState('');
    const [showContentText, setShowContentText] = useState(true);
    const [classDates, setClassDates] = useState([]);
    const navigate = useNavigate();
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleLogout = () => {
        // Perform any logout actions, e.g., remove tokens, clear user data
        window.localStorage.clear()
        window.location.assign('/');
    };

    const [editBody, setEditBody] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        course: "",
        consultationHours: ""
    });

    const handleProfileChange = (e, type) => {
        const { name, value } = e.target;

        // Update the editBody object based on the input change
        setEditBody(prevEditBody => ({ ...prevEditBody, [type]: value }));
    };

    async function handleEditPost(e) {
        e.preventDefault();
        await axios.put(`/profile/edit/${professor_id}`, editBody)
            .then((res) => {
                console.log('resPUT', res)
            })
            .catch(err =>
                alert("Error:" + err)
            )
    }

    const toggleSchoolYearPopup = () => {
        if (contentToShow !== 'attendance') {
            setContentToShow('attendance');
            setShowContentText(false);
            setStudents(setDefaultStudents())
        }
        else {
            setContentToShow('');
            setShowContentText(true);
        }
    };

    const toggleAccountSettings = () => {
        setShowAccountSettings(!showAccountSettings);
    };

    const [userData, setUserData] = useState(null)

    const professor_id = window.localStorage.getItem("user_id")

    const toggleProfile = async (e) => {
        e.preventDefault();
        if (contentToShow !== 'profile') {
            await axios.get(`/profile/${professor_id}`)
                .then((res) => {
                    setUserData(res.data[0])


                })
                .catch(err =>
                    alert("Error:" + err)
                )
            setContentToShow('profile');
            setShowContentText(false);
            setShowChangePassword(false);
        } else {
            setContentToShow('');
            setShowContentText(true);
        }
    };

    const toggleTakenAttendances = () => {
        if (contentToShow !== 'attendanceDates') {
            setContentToShow('attendanceDates');
            setShowContentText(false);
            fetchClassDates();
        } else {
            setContentToShow('');
            setShowContentText(true);
        }
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const [users, setUsers] = useState()
    const course_id = { course_id: window?.localStorage?.getItem("course_id") }
    const setDefaultStudents = async () => {

        console.log('kursGashi', course_id?.course_id)
        return await axios.get(`attendances/find_students/${course_id?.course_id}`,)
            .then((res) => {
                setUsers(res?.data)
                console.log('studentat e zellshem', res.data)
            })
            .catch(err =>
                alert("Error:" + err)
            )
    };
    console.log("users", users)
    const handleAttendance = (studentId, status) => {
        // Find the student in the list
        const updatedStudents = users.map((student) => {
            if (student?.status?.studentId === studentId) {
                // Update the status property with the new attendance status
                return { ...student, status: { ...student.status, status: status } };
            } else {
                // Return the original student object
                return student;
            }
        });

        // Update the state
        setUsers(updatedStudents);
    };


    const fetchClassDates = async () => {
        try {

            await axios.get(`attendances/find_taken_attendances`)
                .then((res) => {
                    setClassDates(res.data);
                    console.log('resgashi, ', res?.data)
                })
                .catch(err =>
                    alert("Error:" + err)
                )
        } catch (error) {
            console.error('Error while fetching class dates:', error);
        }
    };
    const payload = {
        courseId: course_id?.course_id,
        attendanceRecords: users
    };
    console.log('payload gashi', payload)

    const saveAttendance = async () => {
        // You will need to replace this URL with the actual API endpoint
        await axios.post(`attendances/store_students_attendances`, payload)
            .then((res) => {
                alert("New attendance taken !")


            })
            .catch(err =>
                alert("Error:" + err)
            )

    };

    const downloadAttendanceData = (data) => {
        const csvData = data.records.map((record) => ({
            Name: `${record.studentId.firstName} ${record.studentId.lastName}`,
            Status: record.status,
        }));
        const csv = Papa.unparse(csvData);
        const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(csvBlob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            `${data.courseId}-${data.groupId}-${data.date}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const markAllPresent = () => {
        if (users && users.length > 0) {
            const updatedUsers = users.map((user) => {
                return {
                    name: user.name,
                    status: {
                        ...user.status,
                        status: "present",
                    },
                };
            });
            setUsers(updatedUsers);
        }
    }

    const toggleChangePassword = () => {
        if (contentToShow !== 'changePassword') {
            setContentToShow('changePassword');
            setShowContentText(false);
        } else {
            setContentToShow('');
            setShowContentText(true);
        }
    };


    const handlePasswordChange = async (e) => {
        // ndrrimi i passit
        e.preventDefault();
        const body = {
            old_password: oldPass,
            new_password: newPass
        }
        if (oldPass == newPass) {
            alert("Old password can not be the same as new password!")
        }
        else if (oldPass !== newPass) {
            await axios.put(`/profile/change_password/${professor_id}`, body)
                .then((res) => {
                    if (res?.data?.message == "Old passwords do not match!") {
                        alert(res?.data?.message)
                    } else if ("Password changed sucesfully!") {
                        alert("Password changed successfully!")
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        const message = error.response.data.error;
                        alert(`Error: ${message}`);
                    } else if (error.request) {
                        alert("Error: The server did not respond. Please try again later.");
                    } else {
                        alert("Error: An unexpected error occurred.");
                    }
                });
        }
    };

    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    console.log('passwordat1', oldPass, newPass)
    const handlePasswordText = (e, type) => {
        if (type == "currentPassword") {
            setOldPass(e.target.value)
        }
        if (type == "newPassword") {
            setNewPass(e.target.value)
        }

    }
    const [handelClick, setHandelClick] = useState(false);
    return (
        <div className='professorPage'>
            <div className='dashboard-professor'>
                <header>
                    <h1 className='welcome'>Welcome!</h1>
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
                    <li onClick={toggleTakenAttendances}>
                        <a href="#">
                            <i className='bx bx-calendar-check'></i>
                            <span className="links_name">Taken Attendances</span>
                        </a>
                    </li>

                    <li onClick={handleLogout}>
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
                                    Course: <input type="text" name='course' defaultValue={userData?.course} onChange={(e) => handleProfileChange(e, "course")} />
                                </label>
                                <label>
                                    Consultation Hours: <input type="text" name='consultationHours' defaultValue={userData?.consultationHours} onChange={(e) => handleProfileChange(e, "consultationHours")} />
                                </label>
                                <button type='submit'>Save Changes</button>
                                <button type='button' onClick={toggleEditMode}>Cancel</button>
                            </form>
                        ) : (
                            // Profile view
                            <>
                                <h2>Professor Profile</h2>
                                <p><strong>Name:</strong> {userData?.firstName}</p>
                                <p><strong>Surname:</strong> {userData?.lastName}</p>
                                <p><strong>Birthday:</strong> {userData?.birthday.substring(0, 10)}</p>
                                <p><strong>Course:</strong> {userData?.course}</p>
                                <p><strong>Consultation Hours:</strong> {userData?.consultationHours}</p>
                                {/* Add Edit button */}
                                <button className="edit-profile-btn" onClick={toggleEditMode}>Edit Profile</button>
                                <button className="change-password-btn" onClick={toggleChangePassword}>Change Password</button>

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
                {contentToShow === 'attendance' && users?.length > 0 && (
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
                                {users.map((student) => (
                                    <tr key={student?.status?._id}>
                                        {console.log('usersmapRamadani', users)}
                                        <td>{student?.name}</td>
                                        <td>
                                            <div className='attendance-status'>
                                                <button
                                                    className={`status-btn ${student?.status?.status.includes('present') ? 'present' : ''}`}
                                                    onClick={() => { handleAttendance(student?.status?.studentId, 'present') }}
                                                >
                                                    Present
                                                </button>
                                                <button
                                                    className={`status-btn ${student?.status?.status?.includes('excused') ? 'excused' : ''}`}
                                                    onClick={() => { handleAttendance(student?.status?.studentId, 'excused') }}
                                                >
                                                    Excused
                                                </button>
                                                <button
                                                    className={`status-btn ${student?.status?.status?.includes('absent') ? 'absent' : ''}`}
                                                    onClick={() => { handleAttendance(student?.status?.studentId, 'absent') }}
                                                >
                                                    Absent
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="buttons-container">
                            <button className='allPresentButton' onClick={markAllPresent}>All Present</button>
                            <button className='saveAttendanceButton' onClick={saveAttendance}>Save Attendance</button>
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

                {contentToShow === 'attendanceDates' && (
                    <div className="white-box">
                        <h2>Attendance Dates</h2>
                        <ul>



                            {classDates.map((el, index) => (
                                <li className="attendanceDates" key={index} onClick={() => downloadAttendanceData(el)}>
                                    <a href='#' style={{ textDecoration: 'none', color: 'white' }}>{el?.date.slice(0, 10)}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!showProfile && !showContentText && contentToShow === 'changePassword' && (
                    <div className="change-password-form student-profile">
                        <h2>Change Password</h2>
                        <form onSubmit={handlePasswordChange}>
                            <label>
                                Current Password: <input name='currentPassword' onChange={(e) => handlePasswordText(e, "currentPassword")} />
                            </label>
                            <label>
                                New Password: <input name='newPassword' onChange={(e) => handlePasswordText(e, "newPassword")} />
                            </label>
                            <button type="submit" >Save Changes</button>
                            {/* onClick={toggleChangePassword} */}
                            <button type='button' onClick={toggleProfile}>Cancel</button>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Professor;