import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  githubRepo?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  details?: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<any>;
}

export interface Skill {
  name: string;
  time: string;
  description: string;
  category: 'frontend' | 'backend' | 'tools';
}