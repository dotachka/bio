'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectWindowProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectWindow({ project, onClose }: ProjectWindowProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 shadow-neon"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="h-3 w-3 rounded-full bg-secondary" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="ml-3 font-grotesk text-sm text-text-secondary">
                  {project.title}.exe
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Закрыть окно проекта"
                className="rounded-full p-1.5 text-text-secondary transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-surface">
                  <Image src={project.logoUrl} alt={project.title} fill className="object-contain p-2" />
                </div>
                <div>
                  <h3 className="font-grotesk text-2xl font-medium">{project.title}</h3>
                  <p className="text-sm text-text-secondary">{project.year}</p>
                </div>
              </div>

              <p className="mt-6 text-text-secondary">{project.fullDescription}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.screenshots.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {project.screenshots.map((src) => (
                    <div key={src} className="relative h-32 overflow-hidden rounded-xl bg-surface">
                      <Image src={src} alt={project.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-primary"
                  >
                    <Github size={16} /> GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium"
                  >
                    <ExternalLink size={16} /> Демо
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
