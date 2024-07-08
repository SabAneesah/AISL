import { useState } from 'react';
import NavigationBar from '../pages/Nav.jsx';
import Footer from '../Components/Footer.js';

const topicsData = {
    "Computer Graphics": [
        "Introduction to Computer Graphics",
        "Graphics Hardware",
        "Rasterization and Rendering",
        "2D and 3D Transformations",
        "Viewing and Clipping",
        "Illumination and Shading Models",
        "Texture Mapping",
        "Ray Tracing",
        "Animation Techniques",
        "Graphics Software and APIs (OpenGL, DirectX)"
    ],
    "Computer Networks": [
        "Introduction to Computer Networks",
        "Network Models (OSI, TCP/IP)",
        "Data Transmission and Communication",
        "Network Topologies",
        "Networking Devices (Routers, Switches, Hubs)",
        "IP Addressing and Subnetting",
        "Protocols (HTTP, FTP, SMTP, DNS)",
        "Wireless Networks and Mobile Communication",
        "Network Security (Firewalls, Encryption)",
        "Network Troubleshooting and Management"
    ],
    "Web Development": [
        "Introduction to Web Development",
        "HTML, CSS, and JavaScript",
        "Responsive Web Design",
        "Web Hosting and Domain Names",
        "Front-end Frameworks (React, Angular, Vue.js)",
        "Back-end Development (Node.js, Django, Ruby on Rails)",
        "Databases (SQL, NoSQL)",
        "RESTful APIs and Web Services",
        "Web Security (HTTPS, CORS, Authentication)",
        "Version Control with Git and GitHub"
    ],
    "Database Management Systems": [
        "Introduction to DBMS",
        "Database Models (Relational, NoSQL)",
        "SQL Basics (Queries, DDL, DML)",
        "Database Design (Normalization, ER Diagrams)",
        "Transactions and Concurrency Control",
        "Indexing and Optimization",
        "Stored Procedures and Triggers",
        "Database Security and Backup",
        "Distributed Databases",
        "Big Data and Data Warehousing"
    ],
    "Data Structure and Algorithms": [
        "Introduction to DSA using Java",
        "Arrays and Strings",
        "Linked Lists (Singly, Doubly, Circular)",
        "Stacks and Queues",
        "Trees (Binary Trees, BST, AVL Trees)",
        "Heaps and Priority Queues",
        "Graphs (Representation, Traversal, Shortest Path)",
        "Sorting Algorithms (Quick Sort, Merge Sort, etc.)",
        "Searching Algorithms (Binary Search, Interpolation Search, etc.)",
        "Dynamic Programming (Memoization, Tabulation)"
    ],
    "Deductive Reasoning and Logic Programming": [
        "Introduction to Deductive Reasoning",
        "Propositional Logic",
        "Predicate Logic",
        "Logical Inference and Proof Techniques",
        "Resolution and Unification",
        "Logic Programming with Prolog",
        "Constraint Logic Programming",
        "Non-monotonic Reasoning",
        "Automated Theorem Proving",
        "Applications of Logic Programming"
    ],
    "Mathematical Methods": [
        "Linear Algebra",
        "Calculus (Differential and Integral)",
        "Discrete Mathematics",
        "Complex Analysis",
        "Numerical Methods",
        "Fourier and Laplace Transforms",
        "Ordinary Differential Equations",
        "Partial Differential Equations",
        "Vector Calculus",
        "Optimization Techniques"
    ],
    "Statistical Inference": [
        "Introduction to Statistical Inference",
        "Probability Distributions",
        "Point Estimation",
        "Interval Estimation",
        "Hypothesis Testing",
        "Maximum Likelihood Estimation",
        "Bayesian Inference",
        "Non-parametric Methods",
        "Analysis of Variance (ANOVA)",
        "Regression Analysis"
    ]
};

const SubmitResource = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [topicsList, setTopicsList] = useState([]);

    const handleSubjectChange = (e) => {
        const selectedSubject = e.target.value;
        setSubject(selectedSubject);
        setTopicsList(topicsData[selectedSubject] || []);
        setTopic('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const KEY = "s3cR3tK3y@1234567890abcdefGHIJKLMNOpqrstu!";
        console.log('Submitting resource with data:', { title, description, url, author, tags, subject, topic });

        try {
            const response = await fetch('http://localhost:3000/auth/SR', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${KEY}`
                },
                body: JSON.stringify({ title, description, url, author, tags, subject, topic }),
            });
            if (response.ok) {
                alert('Resource submitted successfully!');
                setTitle('');
                setDescription('');
                setUrl('');
                setAuthor('');
                setTags('');
                setSubject('');
                setTopic('');
            } else {
                alert('Failed to submit resource');
            }
        } catch (error) {
            console.error('Error submitting resource:', error);
            alert('Failed to submit resource');
        }
    };



    return (
        <div className="flex flex-col min-h-screen">
            <NavigationBar />
            <div className="flex min-h-screen">
                <aside className="bg-gray-900 text-white w-64 p-6 flex-shrink-0">
                    <div className="text-xl font-bold mb-4">Admin Dashboard</div>
                    <nav>
                        <ul>
                            <li className="mb-3">
                                <a href="/users" className="hover:bg-indigo-600">
                                    Manage Users
                                </a>
                            </li>
                            <li className="mb-3">
                                <a href="/RE" className="hover:bg-indigo-600">
                                    Course Modules
                                </a>
                            </li>
                            <li className="mb-3">
                                <a href="/SR" className="hover:bg-indigo-600">
                                    Add a new resource
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="flex-1 p-14 bg-white">
                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-black text-white shadow-md rounded">
                        <h2 className="flex items-center justify-center text-2xl font-bold mb-4">Submit a Resource</h2>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block">Course Module</label>
                            <select
                                id="subject"
                                value={subject}
                                onChange={handleSubjectChange}
                                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm"
                                required
                            >
                                <option value="">Select Course Module</option>
                                {Object.keys(topicsData).map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                        {subject && (
                            <div className="mb-4">
                                <label htmlFor="topic" className="block ">Topic</label>
                                <select
                                    id="topic"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm"
                                    required
                                >
                                    <option value="">Select Topic</option>
                                    {topicsList.map(topic => (
                                        <option key={topic} value={topic}>{topic}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="title" className="block ">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Title"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block ">Description</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Description"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="url" className="block ">URL</label>
                            <input
                                type="text"
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="URL"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="author" className="block ">Author</label>
                            <input
                                type="text"
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Author"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="tags" className="block ">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Tags (comma separated)"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700">
                            Submit Resource
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SubmitResource;
