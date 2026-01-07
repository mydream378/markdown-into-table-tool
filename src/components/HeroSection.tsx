import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Twitter, Download } from 'lucide-react';
import profileData from '../data/profile.json';

const HeroSection: React.FC = () => {
  const profile = profileData;
  
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <span className="text-gray-500 text-sm">Profile Photo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 mb-6">
              {profile.title}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              {profile.bio}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </a>
            <a
              href="/cv.pdf"
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download CV</span>
            </a>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a
              href={profile.contact.github}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={profile.contact.linkedin}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={profile.contact.twitter}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;