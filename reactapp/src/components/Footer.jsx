import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-black text-white py-12 md:py-16 px-4 md:px-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-gray-400">Email: support@fasterbiketaxi.com</p>
                        <p className="text-gray-400">Phone: (123) 456-7890</p>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://www.instagram.com/romeydeviller?igsh=bTEyZnEzYnBzYmNx" target="_blank" rel="noopener noreferrer" 
                               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                                FB
                            </a>
                            <a href="https://x.com/romeydeviiller" target="_blank" rel="noopener noreferrer"
                               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                                TW
                            </a>
                            <a href="https://www.instagram.com/romeydeviller?igsh=bTEyZnEzYnBzYmNx" target="_blank" rel="noopener noreferrer"
                               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                                IG
                            </a>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>&copy; 2025 Faster Bike Taxi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;