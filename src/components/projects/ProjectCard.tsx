'use client';

import Image from 'next/image';
import { GlassPanel } from '@/components/ui/GlassPanel';
import type { Project } from '@/types';

const STATUS_LABELS: Record<Project['status'], string> = {
  completed: 'Завершён',
  'in-progress': 'В разработке',
  archived: 'Архив'
};

export function ProjectCard({
  project,
  onOpen,
  delay = 0
}: {
  project: Project;
  onOpen: () => void;
  delay?: number;
}) {
  return (
    <GlassPanel delay={delay} className="cursor-pointer" >
      <button onClick={onOpen} className="flex w-full flex-col gap-4 text-left">
        <div className="flex items-center justify-between">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-surface">
            <Image src={project.logoUrl} alt={project.title} fill className="object-contain p-1.5" />
          </div>
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-text-secondary">
            {STATUS_LABELS[project.status]}
          </span>
        </div>
        <div>
          <h3 className="font-grotesk text-lg font-medium">{project.title}</h3>
          <p className="mt-1 text-sm text-text-secondary">{project.shortDescription}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs text-secondary">
              {tech}
            </span>
          ))}
        </div>
      </button>
    </GlassPanel>
  );
}
