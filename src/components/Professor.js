import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Professor.css';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import axios from "../axios"
import JsonToCsv from 'react-json-to-csv';
import Papa from "papaparse";

const Professor = ({ name, picture }) => {
    const [showSchoolYearPopup, setShowSchoolYearPopup] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    // const [showEmailListPopup, setShowEmailListPopup] = useState(false);
    // const [showEmailFormPopup, setShowEmailFormPopup] = useState(false);
    // const [selectedEmail, setSelectedEmail] = useState("");
    // const [showEmailList, setShowEmailList] = useState(false);
    const [contentToShow, setContentToShow] = useState('');
    const [showContentText, setShowContentText] = useState(true);
    const [classDates, setClassDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleLogout = () => {
        // Perform any logout actions, e.g., remove tokens, clear user data
        window.localStorage.clear()
        window.location.assign('/');
    };

    // const [profile, setProfile] = useState({
    //     name: 'John Doe',
    //     surname: 'Doe',
    //     birthday: 'January 1, 1980',
    //     course: 'Ph.D. in Computer Science',
    //     consultationHours: 'Tuesdays and Thursdays, 2-4pm',
    // });

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

    // const handleProfileSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle saving changes here (e.g., send a request to update the profile in the backend)
    //     toggleEditMode();
    // };

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
        //setShowSchoolYearPopup(!showSchoolYearPopup);
    };

    const toggleAccountSettings = () => {
        setShowAccountSettings(!showAccountSettings);
    };

    // stats to get data from API'S
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

    // const toggleEmailListPopup = () => {
    //     setShowEmailListPopup(!showEmailListPopup);
    // };

    // const openEmailFormPopup = (email) => {
    //     setSelectedEmail(email);
    //     setShowEmailFormPopup(true);
    // };

    // const closeEmailFormPopup = () => {
    //     setSelectedEmail("");
    //     setShowEmailFormPopup(false);
    // };

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

        // [
        //     { id: 1, name: 'Alice', attendance: [] },
        //     { id: 2, name: 'Bob', attendance: [] },
        //     { id: 3, name: 'Charlie', attendance: [] },
        //     { id: 4, name: 'David', attendance: [] },
        //     { id: 5, name: 'Eve', attendance: [] },
        // ];
    };
    console.log("users", users)
    // const handleSchoolYearSelect = (schoolYear) => {
    //     setSelectedYear(schoolYear);
    //     setStudents(setDefaultStudents());
    //     setShowSchoolYearPopup(false);
    //     setContentToShow('attendance');
    // };

    // const toggleCourses = async () => {

    // };
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





    // const handleSendEmail = (e) => {
    //     e.preventDefault();
    //     // Implement your email sending logic here
    //     console.log("Email sent to:", selectedEmail);
    //     closeEmailFormPopup();
    // };



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

    // const toggleEmailList = () => {
    //     setShowEmailList(!showEmailList);
    //     setShowProfile(false);
    //     setShowContentText(false);
    // };
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
            // Replace this URL with the actual API endpoint
            // const apiUrl = 'https://your-backend-api/class-dates';
            // const response = await fetch(apiUrl);
            // if (!response.ok) {
            //     throw new Error(`Failed to fetch class dates: ${response.statusText}`);
            // }
            // const dates = await response.json();
            // setClassDates(dates);
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
                alert("updated !")


            })
            .catch(err =>
                alert("Error:" + err)
            )

        // const apiUrl = 'https://your-backend-api/attendance';

        // try {
        //     const response = await fetch(apiUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ students }),
        //     });

        //     if (!response.ok) {
        //         throw new Error(`Failed to save attendance data: ${response.statusText}`);
        //     }

        //     console.log('Attendance data saved successfully');
        // } catch (error) {
        //     console.error('Error while saving attendance data:', error);
        // }
    };

    // const handlePictureClick = () => {
    //     console.log("Clicked to change profile picture");
    //     // Handle picture change event here (e.g., open file picker, upload and update the picture)
    // };

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

    return (
        <div className='professorPage'>
            <div className='dashboard-professor'>
                <header>
                    {/* <img className='profile-pic-ofProfessor' src={picture} alt='Profile' /> */}
                    <h1>Welcome!</h1>
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
                    {/* <li onClick={handleContactClick}>
                        <a href="#">
                            <i className='bx bx-list-ul' ></i>
                            <span className="links_name">Contact</span>
                        </a>
                    </li> */}
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
                                                    onClick={() => handleAttendance(student?.status?.studentId, 'present')}
                                                >
                                                    Present
                                                </button>
                                                <button
                                                    className={`status-btn ${student?.status?.status?.includes('excused') ? 'excused' : ''}`}
                                                    onClick={() => handleAttendance(student?.status?.studentId, 'excused')}
                                                >
                                                    Excused
                                                </button>
                                                <button
                                                    className={`status-btn ${student?.status?.status?.includes('absent') ? 'absent' : ''}`}
                                                    onClick={() => handleAttendance(student?.status?.studentId, 'absent')}
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

                {/* {showSchoolYearPopup && (
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
                )} */}

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


                {/* {showEmailFormPopup && (
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
                )} */}
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
                {contentToShow === 'attendanceDates' && (
                    <div className='attendance-dates'>
                        <h2>Attendance Dates</h2>
                        <ul>



                            {classDates.map((el, index) => (
                                <li key={index} onClick={() => downloadAttendanceData(el)}>
                                    <a href='#'>{el?.date.slice(0, 10)}</a>
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
                            <button type='button' onClick={toggleProfile}>Cancel</button>                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Professor;