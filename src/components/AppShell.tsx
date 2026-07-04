'use client';

import { useState } from 'react';
import { LoadingScreen } from '@/components/loading/LoadingScreen';
import { SystemDock } from '@/components/ui/SystemDock';
import { useLenis } from '@/hooks/useLenis';
import { Hero } from '@/components/hero/Hero';
import { HardwareSection } from '@/components/hardware/HardwareSection';
import { SteamSection } from '@/components/steam/SteamSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { StatisticsSection } from '@/components/statistics/StatisticsSection';
import { ContactsSection } from '@/components/contacts/ContactsSection';

export function AppShell() {
  const [isBooted, setIsBooted] = useState(false);
  useLenis();

  return (
      <>
        <LoadingScreen onComplete={() => setIsBooted(true)} />
        {isBooted && (
            <>
              <SystemDock />
              <main>
                <Hero />
                <HardwareSection />
                <SteamSection />
                <ProjectsSection />
                <SkillsSection />
                <StatisticsSection />
                <ContactsSection />
              </main>
            </>
        )}
      </>
  );
}