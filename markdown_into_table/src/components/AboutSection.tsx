import React from 'react';
import { BookOpen, Users, Calendar, Award } from 'lucide-react';
import profileData from '../data/profile.json';

const AboutSection: React.FC = () => {
  const profile = profileData;
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Research Interests</h3>
            <div className="space-y-4">
              {profile.researchInterests.map((interest, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{interest}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Education</h3>
            <div className="space-y-6">
              {profile.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">{edu.degree}</h4>
                  </div>
                  <p className="text-gray-700 mb-1">{edu.institution}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{edu.year}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 px-6 py-3 rounded-lg">
            <Users className="h-5 w-5" />
            <span>Open to collaborations and research opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;