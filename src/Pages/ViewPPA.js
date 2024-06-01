// SearchAndUpload.js
import React from 'react';
import '../../../App.css'; // Assume we have separate CSS for this component

const SearchAndUpload = () => {
    return (
        <div className="search-and-upload">
            <header className="header">AILMS</header>
            <div className="search-area">
                <SearchDropdown placeholder="Select Faculty" />
                <SearchDropdown placeholder="Select Semester" />
                <SearchBar placeholder="Search Module" />
                <SearchBar placeholder="Search Course" />
                <button className="search-button">Search</button>
            </div>
            <div className="file-area">
                <FileDisplay
                    sender="You"
                    filename="Tech design requirements.pdf"
                    filesize="200 KB"
                    timestamp="Friday 2:20pm"
                />
                <FileDisplay
                    sender="You"
                    filename="Tech design requirements.pdf"
                    filesize="200 KB"
                    timestamp="Friday 2:20pm"
                />
            </div>
        </div>
    );
};

const SearchDropdown = ({ placeholder }) => (
    <div className="search-dropdown">
        <select>
            <option value="">{placeholder}</option>
            {/* Options would be dynamically populated here */}
        </select>
    </div>
);

const SearchBar = ({ placeholder }) => (
    <div className="search-bar">
        <input type="text" placeholder={placeholder} />
    </div>
);

// FileDisplay is now a separate component, potentially reusable.
const FileDisplay = ({ sender, filename, filesize, timestamp }) => (
    <div className="file-display">
        <span>{sender}</span>
        <div className="file-info">
            <p>{filename}</p>
            <p>{filesize}</p>
        </div>
        <span>{timestamp}</span>
    </div>
);

export default SearchAndUpload;
