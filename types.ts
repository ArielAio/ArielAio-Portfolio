export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  githubRepo?: string;
  type?: 'technical' | 'leadership'; // NEW: Project type for styling
  badge?: string; // NEW: Badge text (e.g., "🚀 Em Produção")
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  details?: string[];
  projectLink?: string; // NEW: Link to related project (e.g., Memoryiit)
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Skill {
  name: string;
  time: string;
  description: string;
  category: 'frontend' | 'backend' | 'tools';
}
