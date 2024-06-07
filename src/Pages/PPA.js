// SubmissionForm.js
import React, { useState } from 'react';
import '../../../App.css'; // Make sure to have a dedicated CSS file for this component

const SubmissionForm = () => {
    const faculties = ['Faculty 1', 'Faculty 2'];
    const semesters = ['Semester 1', 'Semester 2'];
    const [faculty, setFaculty] = useState('');
    const [semester, setSemester] = useState('');
    const [courseName, setCourseName] = useState('');
    const [moduleName, setModuleName] = useState('');

    const handleFacultyChange = (e) => setFaculty(e.target.value);
    const handleSemesterChange = (e) => setSemester(e.target.value);
    const handleCourseNameChange = (e) => setCourseName(e.target.value);
    const handleModuleNameChange = (e) => setModuleName(e.target.value);

    const handleSubmit = () => {
        console.log(faculty, semester, courseName, moduleName);
    };

    return (
        <div className="app">
            <header className="header">AISLS</header>
            <div className="form-container">
                <Dropdown
                    options={faculties}
                    value={faculty}
                    onChange={handleFacultyChange}
                    placeholder="Select Faculty"
                />
                <Dropdown
                    options={semesters}
                    value={semester}
                    onChange={handleSemesterChange}
                    placeholder="Select Semester"
                />
                <Input value={courseName} onChange={handleCourseNameChange} placeholder="Enter Course Name" />
                <Input value={moduleName} onChange={handleModuleNameChange} placeholder="Enter Module Name" />
                <div className="file-upload-area">
                    {Array.from({ length: 4 }, (_, index) => (
                        <FileUpload key={index} />
                    ))}
                </div>
                <button className="submit-button" onClick={handleSubmit}>Upload and Analyse</button>
            </div>
        </div>
    );
};

const Dropdown = ({ options, value, onChange, placeholder }) => (
    <select value={value} onChange={onChange} className="dropdown">
        <option value="">{placeholder}</option>
        {options.map((option) => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
);

const Input = ({ value, onChange, placeholder }) => (
    <input
        type="text"
        className="text-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

const FileUpload = () => (
    <div className="file-upload">
        {/* This would be replaced with actual file upload logic */}
        <div className="file-upload-content">
            <span>+</span>
            <p>Browse and choose the files you want to upload from your computer</p>
        </div>
    </div>
);

export default SubmissionForm;
