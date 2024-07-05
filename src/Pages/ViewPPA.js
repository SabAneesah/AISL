// SearchAndUpload.js
import React, {useState , useContext, useEffect} from 'react';
import axios from 'axios';
import '../PPA.css'; // Assume we have separate CSS for this component
import CollapsibleNavbar from "../Components/Flashcard/CollapsibleNavbar";
import Navbar from "../Components/NavBar";
import { DataContext } from "../routes/UserRoute";

const SearchAndUpload = () => {
    const [members, setMembers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [setFilteredMembers] = useState([]);

    const data = useContext(DataContext);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    useEffect(() => {
        // Fetch data from backend when component mounts
        axios.get('http://localhost:8000/get_all')
            .then(response => {
                setMembers(response.data);
                setFilteredMembers(response.data); // Initialize filtered data
            })
            .catch(error => {
                console.error('Error fetching members:', error);
            });
    },[]);

    
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleSearch = (event) => {
        const searchText = event.target.value.toLowerCase();
        setSearchText(searchText);
    };

    const filteredMembers = members.filter(member =>
        member.faculty.toLowerCase().includes(searchText) ||
        member.course.toLowerCase().includes(searchText) ||
        member.module.toLowerCase().includes(searchText) ||
        member.year.toString().toLowerCase().includes(searchText)
    );

    const handleView = (pdf_id) => {
        window.open(`http://localhost:8000/view/${pdf_id}`, '_blank');
    };

    const handleDownload = (pdf_id) => {
        window.open(`http://localhost:8000/download/${pdf_id}`, '_blank');
    };

    return (
        <div className="search-and-upload">
            <Navbar />
            <header className="header ms-4"  >Past Paper Analyzer</header>
            <div className="search-area">
                <input type="text" placeholder="Type to Search" className="form-input block w-full mt-1 border-zinc-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md ml-4" onChange={handleSearch} />
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                    <thead>
                    <tr className="text-center">

                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Faculty</th>
                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Course Name</th>
                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Module Name</th>
                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Years</th>
                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">File</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                        {filteredMembers.map(member => (
                            <tr key={member.pdf_id} className="text-zinc-700 dark:text-black">
                                <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                    {member.faculty}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                    {member.course}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                    {member.module}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">
                                    {member.year}
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200 ">
                                    <div className=" items-center space-x-2">
                                        <button
                                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded "
                                            onClick={() => handleView(member.pdf_id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDownload(member.pdf_id)}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CollapsibleNavbar isNavOpen={isNavOpen} toggleNav={toggleNav}/>
        </div>
    );
};

const SearchBar = ({ placeholder }) => (
    <div className="search-bar">
        <input type="text" placeholder={placeholder} />
    </div>
);

export default SearchAndUpload;
