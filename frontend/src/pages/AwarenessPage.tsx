import React from 'react';
import { Settings as Lungs, AlertCircle, Heart, Activity } from 'lucide-react';

const AwarenessPage = () => {
  const diseases = [
    {
      name: 'Asthma',
      description: 'A chronic condition causing airways to become inflamed, narrow, and swell, making breathing difficult.',
      symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing'],
      icon: Lungs
    },
    {
      name: 'Chronic Bronchitis',
      description: 'Long-term inflammation of the bronchi, causing persistent cough and mucus production.',
      symptoms: ['Persistent cough', 'Mucus production', 'Wheezing', 'Fatigue'],
      icon: AlertCircle
    },
    {
      name: 'Pneumonia',
      description: 'Infection that inflames air sacs in one or both lungs, causing them to fill with fluid.',
      symptoms: ['Chest pain', 'Difficulty breathing', 'Fever', 'Cough with phlegm'],
      icon: Heart
    },
    {
      name: 'COPD',
      description: 'Chronic inflammatory lung disease causing obstructed airflow from the lungs.',
      symptoms: ['Shortness of breath', 'Chronic cough', 'Wheezing', 'Frequent respiratory infections'],
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Understanding Respiratory Diseases
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Learn about common respiratory conditions and their symptoms
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {diseases.map((disease) => (
              <div
                key={disease.name}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <disease.icon className="h-8 w-8 text-blue-600" />
                    <h3 className="ml-3 text-xl font-semibold text-gray-900">{disease.name}</h3>
                  </div>
                  <p className="mt-4 text-gray-500">{disease.description}</p>
                  <div className="mt-4">
                    <h4 className="text-lg font-medium text-gray-900">Common Symptoms:</h4>
                    <ul className="mt-2 list-disc list-inside text-gray-500">
                      {disease.symptoms.map((symptom) => (
                        <li key={symptom}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">When to Seek Medical Attention</h3>
          <p className="text-gray-700">
            If you experience any of the following symptoms, please consult a healthcare provider immediately:
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Severe difficulty breathing or shortness of breath
            </li>
            <li className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Chest pain or pressure
            </li>
            <li className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Coughing up blood
            </li>
            <li className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              High fever with respiratory symptoms
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AwarenessPage