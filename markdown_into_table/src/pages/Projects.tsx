import React from 'react';
import { Clock, CheckCircle, PlayCircle, Users, Calendar, ExternalLink } from 'lucide-react';
import projectsData from '../data/projects.json';

const ProjectsPage: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <PlayCircle className="h-5 w-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'planned':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exploring the frontiers of neuroimaging through innovative research and collaborative projects
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(project.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {project.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {project.collaborators && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <Users className="h-4 w-4" />
                    <span>Collaborators:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.collaborators.map((collaborator, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {collaborator}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4" />
                <span>{project.startDate} - {project.endDate || 'Present'}</span>
              </div>
              
              {project.funding && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Funding: </span>
                  <span className="text-sm text-gray-600">{project.funding}</span>
                </div>
              )}
              
              {project.methodology && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Methodology: </span>
                  <span className="text-sm text-gray-600">{project.methodology}</span>
                </div>
              )}
              
              {project.expectedOutcomes && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Expected Outcomes: </span>
                  <span className="text-sm text-gray-600">{project.expectedOutcomes}</span>
                </div>
              )}
              
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <ExternalLink className="h-4 w-4" />
                <span>Learn More</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;