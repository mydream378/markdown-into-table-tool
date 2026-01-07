import React, { useState } from 'react';
import { Clock, BookOpen, Code, Download, ChevronRight, ChevronDown } from 'lucide-react';
import tutorialsData from '../data/tutorials.json';

const TutorialsPage: React.FC = () => {
  const [expandedTutorial, setExpandedTutorial] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Neuroimaging Tutorials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Educational resources and step-by-step guides for neuroimaging analysis and computational neuroscience
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tutorial Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tutorial Topics</h3>
              <div className="space-y-2">
                {tutorialsData.map((tutorial) => (
                  <button
                    key={tutorial.id}
                    onClick={() => setExpandedTutorial(expandedTutorial === tutorial.id ? null : tutorial.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      expandedTutorial === tutorial.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{tutorial.title}</span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedTutorial === tutorial.id ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tutorial Content */}
          <div className="lg:col-span-2">
            {tutorialsData.map((tutorial) => (
              <div key={tutorial.id} className="mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{tutorial.title}</h2>
                      <p className="text-gray-600 mb-4">{tutorial.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{tutorial.estimatedTime}</span>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                          {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {tutorial.prerequisites && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Prerequisites:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {tutorial.prerequisites.map((prereq, index) => (
                          <li key={index}>{prereq}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {tutorial.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setExpandedSection(expandedSection === `${tutorial.id}-${sectionIndex}` ? null : `${tutorial.id}-${sectionIndex}`)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-500 transition-transform ${
                              expandedSection === `${tutorial.id}-${sectionIndex}` ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {expandedSection === `${tutorial.id}-${sectionIndex}` && (
                          <div className="p-4 border-t border-gray-200">
                            <div className="prose max-w-none text-gray-700 mb-4">
                              <p>{section.content}</p>
                            </div>
                            
                            {section.codeExamples && (
                              <div className="space-y-4">
                                {section.codeExamples.map((example, exampleIndex) => (
                                  <div key={exampleIndex} className="bg-gray-900 rounded-lg p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Code className="h-4 w-4 text-green-400" />
                                      <span className="text-sm text-green-400 font-mono">{example.language}</span>
                                    </div>
                                    <pre className="text-sm text-gray-300 overflow-x-auto">
                                      <code>{example.code}</code>
                                    </pre>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex space-x-4">
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <BookOpen className="h-4 w-4" />
                      <span>Start Tutorial</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download Materials</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;