import React from 'react';
import { UploadCloud } from 'lucide-react';

const PatientSoundUpload = () => {
  const handleRedirect = () => {
    window.open("http://127.0.0.1:5000/", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10 transform transition duration-500 hover:scale-105">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-blue-100 rounded-full">
            <UploadCloud className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Upload Respiratory Sound
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Click below to open the upload portal and analyze the respiratory sound.
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <button
            onClick={handleRedirect}
            className="w-full py-3 px-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md hover:shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-105"
          >
            Open Upload Portal
          </button>
        </div>

        <div className="mt-4 sm:mt-6 text-center text-xs text-gray-500">
          By proceeding, you agree to our <a href="#" className="underline text-blue-600 hover:text-blue-700">Terms of Service</a> and <a href="#" className="underline text-blue-600 hover:text-blue-700">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default PatientSoundUpload;
