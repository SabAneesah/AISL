import React, { useState , useRef } from 'react';
import '../PPA.css';
import axios from 'axios';
import Navbar from "../Components/NavBar";
import CollapsibleNavbar from "../Components/Flashcard/CollapsibleNavbar";
import { useNavigate } from "react-router-dom";

const UploadPPA = () => {
    const faculties = ['Information Technology', 'Engineering' , 'Architecture','Business','Medicine','Graduate Studies'];
    const [faculty, setFaculty] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [courseName, setCourseName] = useState('');
    const [moduleName, setModuleName] = useState('');
    const formRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);  // State to store the selected file
    const [uploadStatus, setUploadStatus] = useState('');  // State to store the upload status message

    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();

    const handleFacultyChange = (e) => setFaculty(e.target.value);
    const handleYearChange = (e) => setYear(e.target.value);
    const handleCourseNameChange = (e) => setCourseName(e.target.value);
    const handleModuleNameChange = (e) => setModuleName(e.target.value);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!faculty || !year || !courseName || !moduleName ) {
            alert('Please fill in all the fields');
            return;
        }

        if (year === '') {
            setError('Year is required.');
        } else if (!/^[0-9]+$/.test(year)) {
            setError('Year must be a number without symbols.');
        } else {
            setError('');
            alert('Form submitted successfully!');
        }

        const formData = new FormData();  // Create a FormData object to hold the file
        formData.append('pdf', selectedFile);  // Append the selected file to FormData
        formData.append('faculty',faculty);
        formData.append('year', year);
        formData.append('course', courseName);
        formData.append('module', moduleName);

        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST', // Set the method to POST
                body: formData, // Set the body to the form data
            });
            const data = await response.json(); // Parse the JSON response
            console.log('Response:', data); // Log the response
        } catch (error) {
            console.error('Error uploading file:', error); // Log any errors
        }
        console.log(faculty, year, courseName, moduleName);
    };

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];  // Get the selected file
        if (file && file.type === 'application/pdf') {  // Check if the file is a PDF
            setSelectedFile(file);  // Set the selected file
        } else {
            setUploadStatus('Please select a PDF file.');  // Set error message if the file is not a PDF
        }
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected.');  // Set error message if no file is selected
            return;
        }
    };


    return (
        <div className="relative">
            <Navbar />
            <div className="app">
                <header className="header">Past Paper Analyzer</header>
                <form name="PPAForm" id="PPAForm" ref={formRef}  onSubmit={handleSubmit}>
                <div className="form-container">
                        <Dropdown
                            options={faculties}
                            value={faculty}
                            onChange={handleFacultyChange}
                            placeholder="Select Faculty"
                            id="faculty"
                        />
                        <Input id="year" value={year} onChange={handleYearChange} placeholder="Enter Year(s)" />
                        <Input id="course" value={courseName} onChange={handleCourseNameChange} placeholder="Enter Course Name" />
                        <Input id="module" value={moduleName} onChange={handleModuleNameChange} placeholder="Enter Module Name" />
                        <div className="file-upload">
                            <div className="file-upload-content">
                                <input
                                    name="file"
                                    type="file"  // Input type for file selection
                                    accept="application/pdf"  // Accept only PDF files
                                    onChange={handleFileChange}  // Handle file selection
                                />
                                <button onClick={handleFileUpload}></button>
                                <p>Browse and choose the files you want to upload from your computer</p>
                            </div>
                        </div> 
                        <div></div>
                        <div className='btn'><button className="button1" onClick={handleSubmit}>Upload and Analyse</button></div>       
                 </div>
                </form>
                <CollapsibleNavbar isNavOpen={isNavOpen} toggleNav={toggleNav}/>
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



export default UploadPPA;
