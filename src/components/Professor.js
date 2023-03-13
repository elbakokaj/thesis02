import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Professor.css';

const Professor = ({ name, picture }) => {
    const [showSchoolYearPopup, setShowSchoolYearPopup] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    const toggleSchoolYearPopup = () => {
        setShowSchoolYearPopup(!showSchoolYearPopup);
    };

    const handleSchoolYearSelect = (schoolYear) => {
        setSelectedYear(schoolYear);
        // simulate fetching students from an API
        setStudents([{ id: 1, name: 'Alice', attendance: [] },
        { id: 2, name: 'Bob', attendance: [] },
        { id: 3, name: 'Charlie', attendance: [] },
        { id: 4, name: 'David', attendance: [] },
        { id: 5, name: 'Eve', attendance: [] },
        ]);

        // hide the popup
        setShowSchoolYearPopup(false);
    };

    const handleAttendance = (studentId, status) => {
        // find the student in the list
        const updatedStudents = students.map((student) => {
            if (student.id === studentId) {
                // update the attendance status
                const updatedAttendance = [...student.attendance];
                updatedAttendance.push(status);
                return { ...student, attendance: updatedAttendance };
            } else {
                return student;
            }
        });

        // update the state
        setStudents(updatedStudents);
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
                {students.length === 0 ? (
                    <div className='content-text'>
                        <p>Welcome to your professor dashboard!</p>
                        <p>Here you can access all of your important information and resources.</p>
                    </div>
                ) : (
                    <div className='attendance-list'>
                        <h2>Attendance for School Year {selectedYear}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Missed Classes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>
                                            <button
                                                className={`status-btn ${student.attendance.includes('present') ? 'present' : ''}`}
                                                onClick={() => handleAttendance(student.id, 'present')}
                                            >                   Present
                                            </button>
                                            <button
                                                className={`status-btn ${student.attendance.includes('late') ? 'late' : ''}`}
                                                onClick={() => handleAttendance(student.id, 'late')}
                                            >
                                                Late
                                            </button>
                                            <button
                                                className={`status-btn ${student.attendance.includes('absent') ? 'absent' : ''}`}
                                                onClick={() => handleAttendance(student.id, 'absent')}
                                            >
                                                Absent
                                            </button>
                                        </td>
                                        <td>{student.attendance.filter((status) => status !== 'present').length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {showSchoolYearPopup && (
                <div className='popup'>
                    <div className='popup-content'>
                        <h2>Select a School Year</h2>
                        <ul>
                            <li onClick={() => handleSchoolYearSelect('2022-2023')}>2022-2023</li>
                            <li onClick={() => handleSchoolYearSelect('2021-2022')}>2021-2022</li>
                            <li onClick={() => handleSchoolYearSelect('2020-2021')}>2020-2021</li>
                            <li onClick={() => handleSchoolYearSelect('2019-2020')}>2019-2020</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Professor;
