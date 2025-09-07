import React from 'react';

function AboutUs() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-black text-white py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
                    <p className="text-xl max-w-2xl">Making urban transportation affordable and accessible to everyone.</p>
                </div>
            </div>
            
            {/* Mission Section */}
            <div className="py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
                            <p className="mb-4 text-gray-700 text-lg">
                                We're transforming the way people move around cities with bike taxis that are faster, 
                                more affordable, and easier to use.
                            </p>
                            <p className="text-gray-700 text-lg">
                                As a student project, we're learning how to create solutions for real-world problems 
                                while building technical skills in web development and app design.
                            </p>
                        </div>
                        <div className="bg-gray-100 rounded-lg overflow-hidden h-80">
                            <img 
                                src="https://images.unsplash.com/photo-1564694202883-46e7448c1b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                                alt="Bike in city traffic" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* How We Work Section */}
            <div className="py-16 px-4 md:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">How We Work</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg border border-gray-100">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Request a Ride</h3>
                            <p className="text-gray-700">
                                Open the app, enter your destination, and request a bike taxi with just a few taps.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg border border-gray-100">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Match with a Driver</h3>
                            <p className="text-gray-700">
                                We'll connect you with a nearby driver who'll arrive at your location quickly.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg border border-gray-100">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Enjoy Your Journey</h3>
                            <p className="text-gray-700">
                                Hop on and reach your destination while avoiding traffic congestion.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Project Goals Section */}
            <div className="py-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Project Goals</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-900">For Riders</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Provide a fast alternative to traffic-congested roads</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Offer affordable rates that beat traditional taxis</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Ensure safety with verified drivers</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Create a simple, user-friendly booking experience</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-900">For Drivers</h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Create flexible earning opportunities</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Provide an easy-to-use driver app</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Offer competitive commission rates</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Support driver growth with training resources</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Learning Journey Section */}
            <div className="py-16 px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Learning Journey</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        This project represents our learning journey in web development, UI/UX design, 
                        and building real-world applications. We're applying classroom knowledge to create 
                        a solution that could make a difference in urban transportation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="py-3 px-8 bg-black text-white rounded-lg font-medium">
                            Try Our Demo
                        </button>
                        <a 
                            href="/contact" 
                            className="py-3 px-8 border border-black text-black rounded-lg font-medium"
                        >
                            Give Feedback
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
