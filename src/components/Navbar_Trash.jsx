import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-6">
                <div className="text-2xl font-bold text-orange-500">markeezo</div>
                <button onClick={toggleMenu} className="lg:hidden text-gray-500" aria-label="Toggle navigation">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <nav className={`w-full lg:flex lg:items-center lg:space-x-4 ${isOpen ? '' : 'hidden'}`}>
                    <Link to="/" className="block py-2 lg:py-0 text-gray-600 hover:text-orange-500">Home</Link>
                    <Link to="/about" className="block py-2 lg:py-0 text-gray-600 hover:text-orange-500">About us</Link>
                    <Link to="/services" className="block py-2 lg:py-0 text-gray-600 hover:text-orange-500">Services</Link>
                    <Link to="/contact" className="block py-2 lg:py-0 text-gray-600 hover:text-orange-500">Contact us</Link>
                    <Link to="/get-started" className="block py-2 lg:py-0 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">Get Started</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
