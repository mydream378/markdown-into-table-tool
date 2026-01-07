export interface AcademicProfile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  contact: {
    email: string;
    orcid: string;
    linkedin: string;
    github: string;
    twitter: string;
  };
  researchInterests: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'ongoing' | 'completed' | 'planned';
  startDate: string;
  endDate?: string;
  collaborators?: string[];
  funding?: string;
  methodology?: string;
  expectedOutcomes?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  authorsFull?: Array<{ family: string; given: string }>;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pdfUrl?: string;
  abstract?: string;
  keywords?: string[];
  pmid?: string;
  pubmedUrl?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites?: string[];
  sections: Array<{
    title: string;
    content: string;
    codeExamples?: Array<{
      language: string;
      code: string;
    }>;
  }>;
}

export interface SiteContent {
  profile: AcademicProfile;
  projects: Project[];
  publications: Publication[];
  tutorials: Tutorial[];
}
