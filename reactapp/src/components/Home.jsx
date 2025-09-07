import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-black text-white py-16 md:py-20 px-4 md:px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-2xl">
                        Welcome to Faster Bike Taxi
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                        Apply now to become a bike taxi driver and start earning!
                    </p>
                    <Link 
                        to="/apply" 
                        className="inline-block py-3 px-8 bg-white text-black rounded-lg font-medium transition-all hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Apply Now
                    </Link>
                </div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-opacity-5 bg-white rounded-full -mb-20 -mr-20 z-0"></div>
            </div>

            <div className="py-16 md:py-20 px-4 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
                        Why Choose Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        <div className="p-6 md:p-8 border border-gray-200 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1">
                            <h3 className="text-xl font-semibold mb-4 text-black">Fast Service</h3>
                            <p className="text-gray-600">Quick pickup and drop-off for your convenience</p>
                        </div>
                        <div className="p-6 md:p-8 border border-gray-200 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1">
                            <h3 className="text-xl font-semibold mb-4 text-black">Safe Rides</h3>
                            <p className="text-gray-600">Experienced and verified bike taxi drivers</p>
                        </div>
                        <div className="p-6 md:p-8 border border-gray-200 rounded-xl transition-all hover:shadow-xl hover:-translate-y-1">
                            <h3 className="text-xl font-semibold mb-4 text-black">Best Rates</h3>
                            <p className="text-gray-600">Competitive pricing for all your rides</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;