'use client';

import { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { projects } from '@/lib/projects-data';
import { ProjectCard } from './ProjectCard';
import { ProjectWindow } from './ProjectWindow';
import type { Project } from '@/types';

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-5 py-20 sm:px-6 sm:py-24 md:px-16 md:py-32">
      <SectionHeader
        index="03 · ПРИЛОЖЕНИЯ"
        title="Проекты"
        subtitle="Каждый проект открывается как отдельное окно системы."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={i * 0.08}
            onOpen={() => setActiveProject(project)}
          />
        ))}
      </div>

      <ProjectWindow project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
