import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Heart, Activity } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
                <div className="lg:max-w-2xl">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Advanced Respiratory</span>
                    <span className="block text-blue-600">Disease Detection</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Upload respiratory sound data and get instant AI-powered analysis for accurate disease detection. Helping doctors make informed decisions.
                  </p>
                  <div className="mt-5 sm:mt-8 flex justify-center lg:justify-start">
                    <Link to="/signup" className="rounded-md shadow">
                      <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="mt-12 lg:mt-0 lg:ml-8">
                  <img
                    className="w-full max-w-lg mx-auto rounded-lg shadow-xl lg:max-w-md"
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Doctor with stethoscope"
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Advanced Healthcare Solutions
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
                <Stethoscope className="h-12 w-12 text-blue-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">Sound Analysis</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Advanced AI algorithms analyze respiratory sounds for accurate diagnosis
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
                <Heart className="h-12 w-12 text-blue-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">Patient Care</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Comprehensive patient management and monitoring system
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
                <Activity className="h-12 w-12 text-blue-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">Real-time Results</h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Instant analysis results and detailed reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;