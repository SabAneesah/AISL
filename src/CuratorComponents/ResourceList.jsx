import { useState, useEffect } from "react";
import NavigationBar from '../pages/Nav.jsx';
import Footer from '../pages/Footer.jsx';

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

const ResourceList = () => {
    const [subjects] = useState(["Computer Graphics", "Computer Networks", "Web Development", "Database Management Systems", "Data Structure and Algorithms", "Deductive Reasoning and Logic Programming", "Mathematical Methods", "Statistical Inference"]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [resources, setResources] = useState([]);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            if (selectedSubject && selectedTopic) {
                try {
                    const response = await fetch(`http://localhost:3000/auth/RE?subject=${selectedSubject}&topic=${selectedTopic}`);
                    const data = await response.json();
                    setResources(data);
                } catch (error) {
                    console.error('Error fetching resources:', error);
                }
            }
        };

        fetchResources();
    }, [selectedSubject, selectedTopic]);

    const handleSubjectClick = (subject) => {
        setSelectedSubject(subject);
        setTopics(topicsData[subject]);
        setSelectedTopic(null);
        setResources([]);
    };

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    const handleDeleteResource = async (resourceId) => {
        try {
            await fetch(`http://localhost:3000/auth/links/${resourceId}`, {
                method: 'DELETE'
            });
            setResources(resources.filter(resource => resource._id !== resourceId));
        } catch (error) {
            console.error('Error deleting resource:', error);
        }
    };

    return (
        <>
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
                    <main className="flex-grow ">
                        <div className="max-w-4xl mx-auto p-6">
                            {selectedSubject === null ? (
                                <>
                                    <h2 className="text-3xl font-bold mb-8 text-center">Select a Course Module</h2>
                                    <ul className="grid gap-8 text-center">
                                        {subjects.map((subject) => (
                                            <li key={subject}
                                                className="bg-black text-white hover:bg-indigo-600 shadow-md rounded-md p-6 cursor-pointer"
                                                onClick={() => handleSubjectClick(subject)}>
                                                <h3 className="text-xl font-bold">{subject}</h3>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : selectedTopic === null ? (
                                <>
                                    <h2 className="text-3xl font-bold mb-8 text-center">{selectedSubject} Topics</h2>
                                    <button onClick={() => setSelectedSubject(null)}
                                            className="mb-4 text-indigo-600 underline">Change Course Module
                                    </button>
                                    <ul className="grid gap-8 text-center">
                                        {topics.map((topic, index) => (
                                            <li key={index} className="bg-black text-white hover:bg-indigo-600 shadow-md rounded-md p-6 cursor-pointer"
                                                onClick={() => handleTopicClick(topic)}>{topic}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-bold mb-8 text-center">{selectedTopic} Resources</h2>
                                    <button onClick={() => setSelectedTopic(null)}
                                            className="mb-4 text-indigo-600 underline">Change Topic
                                    </button>
                                    {resources.length === 0 ? (
                                        <p className="text-lg text-gray-600 text-center">No resources found</p>
                                    ) : (
                                        <ul className="grid gap-8">
                                            {resources.map((resource) => (
                                                <li key={resource._id} className="bg-white shadow-md rounded-md p-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-xl font-bold">{resource.title}</h3>
                                                        <button
                                                            onClick={() => handleDeleteResource(resource._id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <p className="mb-4">{resource.description}</p>
                                                    <a href={resource.url} target="_blank" rel="noopener noreferrer"
                                                       className="text-blue-500 underline mb-2">
                                                        {resource.url}
                                                    </a>
                                                    <p className="text-gray-700 mb-2">Author: {resource.author}</p>
                                                    <p className="text-gray-700">Tags: {resource.tags.join(', ')}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ResourceList;
