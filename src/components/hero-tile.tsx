'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Trophy, Target } from 'lucide-react';

const STREAK_DAYS = [
  { label: 'M', done: true },
  { label: 'T', done: true },
  { label: 'W', done: true },
  { label: 'T', done: true },
  { label: 'F', done: true },
  { label: 'S', done: true },
  { label: 'S', done: false },
];

function useCountUp(target: number, duration = 1200, delay = 300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const steps = Math.ceil(duration / 16);
      let step = 0;

      const tick = () => {
        step++;

        const progress = Math.min(step / steps, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setValue(Math.round(eased * target));

        if (step < steps) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return value;
}

export default function HeroTile() {
  const xp = useCountUp(1240, 1400, 200);
  const streak = useCountUp(6, 800, 400);

  return (
  <div className="grid grid-cols-1 xl:grid-cols-[1fr_230px] gap-5 h-full w-full">
    <div className="flex flex-col justify-between h-full min-w-0">
      <div className="space-y-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] text-indigo-400 bg-indigo-500/10 border border-indigo-500/15 uppercase w-max">
          <Sparkles className="w-3 h-3" />
          Level 12
        </span>

        <div className="space-y-3 max-w-2xl mt-2">
          
          <h1 className="text-[34px] sm:text-[42px] leading-[0.95] font-black tracking-tight text-white">
            Welcome back,{` `}
            <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Yash
            </span>
          </h1>

          <p className="text-slate-400 text-[15px] leading-relaxed max-w-xl">
            You&apos;re in the top{' '}
            <span className="text-indigo-400 font-semibold">
              5%
            </span>{' '}
            of learners this week. Stay focused and keep building momentum.
          </p>

        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
        
        <article className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/3 border border-white/5 backdrop-blur-sm">
          
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
              XP Earned
            </span>

            <span className="text-[28px] leading-none font-black text-white mt-1">
              {xp.toLocaleString()}
            </span>
          </div>
        </article>

        <article className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/3 border border-white/5 backdrop-blur-sm">
          
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Target className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
              Goal
            </span>

            <span className="text-[28px] leading-none font-black text-white mt-1">
              88%
            </span>
          </div>
        </article>

      </div>
    </div>

    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-linear-to-b from-white/3 to-transparent p-5 flex flex-col justify-between">
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative z-1 flex items-center justify-between">
        
        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
          Streak
        </span>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            repeatDelay: 4,
          }}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/15 text-amber-400"
        >
          <Flame className="w-4 h-4" />
        </motion.div>
      </div>

      <div className="relative z-1 flex flex-col items-center">
        
        <div className="flex items-end gap-2">
          <span className="text-[72px] leading-none font-black tracking-tighter text-white">
            {streak}
          </span>

          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-3">
            Days
          </span>
        </div>

        <p className="text-[11px] text-slate-500 mt-1">
          1 more day to weekly goal
        </p>
      </div>

      <div className="relative z-1 flex justify-between gap-1.5">
        {STREAK_DAYS.map((day, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[8px] font-semibold text-slate-600">
              {day.label}
            </span>

            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold border ${
                day.done
                  ? 'bg-amber-500/15 border-amber-500/25 text-amber-400'
                  : 'bg-white/2 border-white/4 text-slate-700'
              }`}
            >
              {day.done ? '✓' : '·'}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}