import React from 'react';

import {
  LayoutDashboard,
  Calendar,
} from 'lucide-react';

import { fetchCourses } from '@/lib/courses';

import HeroTile from '@/components/hero-tile';
import CourseTile from '@/components/course-tile';
import ActivityTile from '@/components/activity-tile';
import SupabaseAlert from '@/components/supabase-alert';

import {
  BentoGrid,
  BentoGridItem,
} from '@/components/bento-grid';

export const revalidate = 0;

export default async function DashboardPage() {
  const { courses, isDemo, error } =
    await fetchCourses();

  return (
    <section className="space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
            Dashboard
          </div>

          <h1 className="text-[30px] sm:text-[36px] leading-none font-black tracking-tight text-white">
            Command Center
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/5 bg-white/3 text-[11px] font-medium text-slate-400 w-max">
          <Calendar className="w-3.5 h-3.5" />

          {new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </header>

      <div className="mt-4 mb-2">
        <SupabaseAlert
          isDemo={isDemo}
          errorMsg={error}
        />
      </div>

      <div className="mt-2">
        <BentoGrid>
          <BentoGridItem className="xl:col-span-2 md:col-span-2 min-h-80">
            <HeroTile />
          </BentoGridItem>
          {courses.map((course) => (
            <BentoGridItem
              key={course.id}
              className="min-h-60"
            >
              <CourseTile course={course} />
            </BentoGridItem>
          ))}
          <BentoGridItem className="xl:col-span-2 md:col-span-2 min-h-67.5">
            <ActivityTile />
          </BentoGridItem>
        </BentoGrid>
      </div>
    </section>
  );
}