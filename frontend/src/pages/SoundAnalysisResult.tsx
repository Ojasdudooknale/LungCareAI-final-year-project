import React from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface AnalysisResultProps {
  patientName?: string;  // Optional - only shown for doctors
  recordingDate: string;
  result: {
    condition: string;
    confidence: number;
    severity: 'mild' | 'moderate' | 'severe';
    recommendations: string[];
  };
}

const SoundAnalysisResult: React.FC<AnalysisResultProps> = ({
  patientName,
  recordingDate,
  result
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="h-6 w-6 text-white" />
                <h1 className="ml-2 text-xl font-bold text-white">Analysis Result</h1>
              </div>
              <span className="text-blue-100 text-sm">{recordingDate}</span>
            </div>
            {patientName && (
              <p className="mt-1 text-blue-100">Patient: {patientName}</p>
            )}
          </div>

          {/* Result Content */}
          <div className="px-6 py-8">
            {/* Condition and Confidence */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {result.condition}
                </h2>
                <span className="text-sm text-gray-500">
                  Confidence: {result.confidence}%
                </span>
              </div>
              <div className="mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                  {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                </span>
              </div>
            </div>

            {/* Recommendations */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommendations
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span className="text-gray-600">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 flex items-start bg-yellow-50 p-4 rounded-md">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-2" />
              <p className="text-sm text-yellow-700">
                This analysis is provided as a preliminary assessment. Please consult with a healthcare professional for a complete diagnosis and treatment plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundAnalysisResult;