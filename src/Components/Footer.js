import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black p-4 w-full">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center h-16">
                    <p className="text-gray-300 text-sm">&copy; {new Date().getFullYear()} Byte Busters. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
