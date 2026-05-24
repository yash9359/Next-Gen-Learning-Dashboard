'use client';

import React from 'react';
import { motion } from 'framer-motion';

import {
  Blocks,
  Sparkles,
  Database,
  Palette,
  Zap,
  BookOpen,
  HelpCircle,
  ArrowUpRight,
} from 'lucide-react';

import { Course } from '@/lib/supabase';

const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Blocks,
  Sparkles,
  Database,
  Palette,
  Zap,
  BookOpen,
};

interface CourseTileProps {
  course: Course;
}

export default function CourseTile({
  course,
}: CourseTileProps) {
  const {
    title,
    progress,
    icon_name,
  } = course;

  const Icon =
    ICON_MAP[icon_name] || HelpCircle;

  const theme =
    progress >= 85
      ? {
          glow:
            'from-emerald-500/10 via-cyan-500/5 to-transparent',
          bar:
            'from-emerald-400 to-cyan-400',
          icon:
            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        }
      : progress < 30
      ? {
          glow:
            'from-amber-500/10 via-orange-500/5 to-transparent',
          bar:
            'from-amber-400 to-orange-400',
          icon:
            'bg-amber-500/10 text-amber-400 border-amber-500/20',
        }
      : {
          glow:
            'from-indigo-500/10 via-violet-500/5 to-transparent',
          bar:
            'from-indigo-400 to-violet-400',
          icon:
            'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        };

  return (
    <article className="relative flex flex-col h-full">
      <div
        className={`absolute inset-0 bg-linear-to-br ${theme.glow} opacity-80 rounded-2xl pointer-events-none`}
      />
      <header className="relative z-1 flex items-start justify-between">
        
        <div
          className={`flex items-center justify-center w-11 h-11 rounded-2xl border ${theme.icon}`}
        >
          <Icon className="w-5 h-5" />
        </div>

        <button className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-600 hover:text-indigo-300 hover:bg-white/3 transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </header>

      <div className="relative z-1 pt-7">
        
        <h3 className="text-[17px] leading-[1.4] font-semibold text-slate-200 max-w-[90%]">
          {title}
        </h3>

        <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
          Continue your learning journey and improve your progress.
        </p>
      </div>

      <footer className="relative z-1 mt-auto pt-7 space-y-2.5">
        
        <div className="flex items-center justify-between">
          
          <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-500">
            Progress
          </span>

          <span className="text-[13px] font-bold text-slate-300">
            {progress}%
          </span>
        </div>

        <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/4">
          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            style={{
              originX: 0,
              width: `${progress}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 14,
              delay: 0.15,
            }}
            className={`h-full rounded-full bg-linear-to-r ${theme.bar}`}
          />
        </div>
      </footer>
    </article>
  );
}