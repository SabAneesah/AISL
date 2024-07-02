// SearchAndUpload.js
import React, {useState , useContext} from 'react';
import '../PPA.css'; // Assume we have separate CSS for this component
import CollapsibleNavbar from "../Components/Flashcard/CollapsibleNavbar";
import Navbar from "../Components/NavBar";
import { DataContext } from "../routes/UserRoute";

const SearchAndUpload = () => {
    const [members, setMembers] = useState([]);
    const [searchText, setSearchText] = useState('');

    // useEffect(() => {
    //     // Fetch data from backend when component mounts
    //     axios.get('https://dulanga.sliit.xyz/api/innobothealth/code/getAll')
    //         .then(response => {
    //             setMembers(response.data);
    //             setFilteredMembers(response.data); // Set filtered members initially
    //         })
    //         .catch(error => {
    //             console.error('Error fetching members:', error);
    //         });
    // },[]);

    const data = useContext(DataContext);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // const handleSearch = (event) => {
    //     const searchText = event.target.value.toLowerCase();
    //     setSearchText(searchText);
    // };
    // const filteredData = members.filter(member =>
    //     member.codeType.toLowerCase().includes(searchText) ||
    //     member.codeName.toLowerCase().includes(searchText) ||
    //     member.codeTitle.toLowerCase().includes(searchText) ||
    //     member.description.toLowerCase().includes(searchText)
    // );
    //
    return (
        <div className="search-and-upload">
            <Navbar />
            <header className="header"  >Past Paper Analyzer</header>
            <div className="search-area">
                <SearchBar placeholder="Search Past Paper"  />
                {/*onChange={handleSearch}*/}
                <button className="search-button">Search</button>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                    <thead>
                    <tr className="text-center">

                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Faculty</th>
                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Course Name</th>
                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Module Name</th>
                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Years</th>
                        <th className="py-2 px-3 sticky top-0 border-b border-zinc-200 bg-zinc-100 text-gray-800 font-semibold">Action</th>
                    </tr>
                    </thead>
                    {/*<tbody className="bg-white dark:text-white">*/}
                    {/*{filteredData.map(member => (*/}
                    {/*    <tr key={member.id} className="text-zinc-700 dark:text-black">*/}
                    {/*        /!*<td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">*!/*/}
                    {/*        /!*    {member.memberId}*!/*/}
                    {/*        /!*</td>*!/*/}
                    {/*        <td className="px-8 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">*/}
                    {/*            {member.codeType}*/}
                    {/*        </td>*/}
                    {/*        <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">*/}
                    {/*            {member.codeName}*/}
                    {/*        </td>*/}
                    {/*        <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">*/}
                    {/*            {member.codeTitle}*/}
                    {/*        </td>*/}
                    {/*        <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">*/}
                    {/*            {member.description}*/}
                    {/*        </td>*/}
                    {/*        <td className="px-6 py-4 whitespace-no-wrap border-b border-text-black dark:border-zinc-200">*/}
                    {/*            <div className="flex items-center">*/}
                    {/*                <Link to={`/UpdatePnD/${member.id}`} className="bg-zinc-600 hover:bg-white-600 text-white font-bold py-2 px-4 rounded">*/}
                    {/*                    Edit*/}
                    {/*                </Link>*/}
                    {/*                <button onClick={() => handleDelete(member.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-5">*/}
                    {/*                    Delete*/}
                    {/*                </button>*/}
                    {/*            </div>*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}
                    {/*))}*/}
                    {/*</tbody>*/}
                </table>
            </div>
            <CollapsibleNavbar isNavOpen={isNavOpen} toggleNav={toggleNav}/>
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
