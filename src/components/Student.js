import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Student.css';
import 'boxicons/css/boxicons.min.css';
import { Pie } from 'react-chartjs-2';
import axios from "../axios"
const Student = ({ name, picture }) => {
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showContentText, setShowContentText] = useState(true);
    const [contentToShow, setContentToShow] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showCourses, setShowCourses] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [courses, setCourses] = useState([]);


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

    const [editBody, setEditBody] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        yearOfEnrollment: ""
    });

    const handleProfileChange = (e, type) => {
        const { name, value } = e.target;

        // Update the editBody object based on the input change
        setEditBody(prevEditBody => ({ ...prevEditBody, [type]: value }));
    };

    async function handleEditPost(e) {
        e.preventDefault();
        await axios.put(`/profile/edit/${student_id}`, editBody)
            .then((res) => {
                console.log('resPUT', res)
            })
            .catch(err =>
                alert("Error:" + err)
            )
    }
    console.log('editBody', editBody)
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        // Handle saving changes here (e.g., send a request to update the profile in the backend)
        toggleEditMode();
    };
    const toggleAccountSettings = () => {
        setShowAccountSettings(!showAccountSettings);
    };


    // stats to get data from API'S
    const [userData, setUserData] = useState(null)


    console.log("resprofile", userData)

    const student_id = window.localStorage.getItem("user_id")
    const toggleProfile = async (e) => {
        e.preventDefault();
        if (contentToShow !== 'profile') {
            await axios.get(`/profile/${student_id}`)
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

    const handleLogout = () => {
        // Perform any logout actions, e.g., remove tokens, clear user data
        window.localStorage.clear()
        window.location.assign('/');
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
        // fetchMessages();
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

    const handlePictureClick = () => {
        console.log("Clicked to change profile picture");
        // Handle picture change event here (e.g., open file picker, upload and update the picture)
    };

    const toggleCourses = async () => {
        await axios.get(`/courses/find_courses`)
            .then((res) => {
                setCourses(res.data)
                console.log('allCourses', res.data)
            })
            .catch(err =>
                alert("Error:" + err)
            )
        if (contentToShow !== 'courses') {
            setContentToShow('courses');
            setShowContentText(false);
        } else {
            setContentToShow('');
            setShowContentText(true);
        }
    };

    const renderCourses = () => {
        return (

            courses?.map((el) => (
                < div
                    key={el?._id}
                    className="course-row course-box"
                    onClick={() => displayCourseStats(el._id, el?.course_date)}
                >
                    <div className="course-name">{el?.name}</div>
                </div >
            )))
    };


    const displayCourseStats = async (course_id, course_date) => {
        const attendedClasses = [];
        const missedClasses = [];
        const body = {
            course_id: course_id,
            student_id: student_id,
            course_date: course_date
        }
        await axios.get(`/attendances/find_specific_status`, { params: body })
            .then((res) => {
                console.log('body', body)
                attendedClasses.push(res?.data?.filter((el) => el?.status == "present"));
                missedClasses.push(res?.data?.filter((el) => el?.status == "absent"));
                setSelectedCourse(res.data?._id)
                console.log('res.data', res.data[0])

            })
            .catch(err =>
                alert("Error:" + err)
            )
        console.log('classesa', attendedClasses)
        console.log('classesm', missedClasses)



        setPieChartData({
            labels: ['Attended', 'Missed'],
            datasets: [
                {
                    data: [attendedClasses[0].length, missedClasses[0].length],
                    backgroundColor: ['#4BC0C0', '#FF6384'],
                    hoverBackgroundColor: ['#4BC0C0', '#FF6384'],
                },
            ],
        });
    };

    return (
        <div className='studentPage'>

            <div className='dashboard-student'>
                <header>
                    <img className='profile-pic-ofStudent' src={picture} alt='Profile' />
                    <h1>Hello {userData?.firstName}!</h1>
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
                    <li onClick={toggleMessages}>
                        <a href="#">
                            <i className='bx bx-message' ></i>
                            <span className="links_name">Messages</span>
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
            <div className='content-ofStudent'>
                {contentToShow === 'profile' && (
                    <div className={`student-profile ${isEditMode ? "edit-mode" : ""}`}>
                        <div className="profile-picture">
                            <img src={picture} alt="Profile" />
                            <i className="bx bx-camera camera-icon" onClick={handlePictureClick}></i>
                        </div>
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
                                    Year of Enrollment: <input type="text" name='yearEnrolled' defaultValue={userData.yearOfEnrollment} onChange={(e) => handleProfileChange(e, "yearOfEnrollment")} />
                                </label>
                                <label>
                                    Current Password: <input name='currentPassword' onChange={(e) => handleProfileChange(e, "currentPassword")} />
                                </label>
                                <label>
                                    New Password: <input name='newPassword' onChange={(e) => handleProfileChange()} />
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
                                <p><strong>Year of Enrollment:</strong> {userData?.yearOfEnrollment}</p>
                                {/* Add Edit button */}
                                <button className="edit-profile-btn" onClick={toggleEditMode}>Edit Profile</button>
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

                {!showProfile && !showContentText && contentToShow === 'courses' && (
                    <div className="coursesToShow">
                        {selectedCourse === null ? (
                            renderCourses()
                        ) : (
                            pieChartData && (

                                <div class="pie-chart-container">
                                    <div class="pie-chart-content">
                                        <div className="course-stats">
                                            <h3>Course Statistics</h3>
                                            <Pie data={pieChartData} />
                                            {/* Add the diagram box here
                                        <div id="course-stats"></div> */}
                                        </div>
                                        <div className='wrapperOfButton'>
                                            <h4>Hover on the chart to see the number of you missed or attended classes</h4>
                                        </div>
                                    </div>
                                    <button className='back-to-courses-button' onClick={() => setSelectedCourse(null)}>Go back to courses list</button>
                                </div>

                            )
                        )}


                    </div>
                )}
            </div>
        </div>
    );
};

export default Student;
