'use client';

import React, { useState } from 'react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import {
  Activity,
  Clock,
  ChevronRight,
} from 'lucide-react';

interface GridCell {
  day: number;
  week: number;
  hours: number;
  date: string;
}

const MONTHS = [
  'Feb',
  'Mar',
  'Apr',
  'May',
];

const WEEKS = 18;

const GRID_DATA: GridCell[] = (() => {
  const cells: GridCell[] = [];

  const base = new Date(2026, 1, 1);

  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const offset = w * 7 + d;

      const date = new Date(base);

      date.setDate(base.getDate() + offset);

      const seed =
        (w * 13 + d * 37) % 100;

      let hours = 0;

      if (seed > 30) {
        if (seed > 85) hours = 4.5;
        else if (seed > 65) hours = 3;
        else if (seed > 45) hours = 1.5;
        else hours = 0.5;
      }

      if (
        w >= WEEKS - 2 &&
        d !== 0 &&
        d !== 6
      ) {
        hours =
          d % 3 === 0 ? 4 : 2.5;
      }

      cells.push({
        day: d,
        week: w,
        hours,

        date: date.toLocaleDateString(
          'en-US',
          {
            month: 'short',
            day: 'numeric',
          }
        ),
      });
    }
  }

  return cells;
})();

function getCellColor(hours: number) {
  if (hours === 0) {
    return 'bg-white/[0.02] border-white/[0.03]';
  }

  if (hours <= 1) {
    return 'bg-indigo-950/50 border-indigo-900/20';
  }

  if (hours <= 2.5) {
    return 'bg-indigo-700/35 border-indigo-600/25';
  }

  if (hours <= 3.5) {
    return 'bg-indigo-500/55 border-indigo-400/30';
  }

  return 'bg-cyan-400/70 border-cyan-400/40';
}

export default function ActivityTile() {
  const [hovered, setHovered] =
    useState<GridCell | null>(null);

  return (
    <section className="flex flex-col h-full">
      <header className="flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          
          <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-indigo-500/15 bg-indigo-500/10 text-indigo-400">
            <Activity className="w-4 h-4" />
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-white">
              Learning Activity
            </h3>

            <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-500">
              Last 18 Weeks
            </p>
          </div>
        </div>

        <div className="min-h-6">
          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key="tooltip"
                initial={{
                  opacity: 0,
                  y: 4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 4,
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/15 bg-indigo-500/10 px-2.5 py-1 text-[10px] text-indigo-300"
              >
                <Clock className="w-3 h-3 text-cyan-400" />

                <span>{hovered.date}</span>

                <strong className="text-white">
                  {hovered.hours}h
                </strong>
              </motion.div>
            ) : (
              <motion.div
                key="legend"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="flex items-center gap-1.5 text-[9px] text-slate-500"
              >
                <span>Less</span>

                {[0, 0.5, 1.5, 3, 4.5].map(
                  (v, i) => (
                    <span
                      key={i}
                      className={`w-2.5 h-2.5 rounded-sm border ${getCellColor(
                        v
                      )}`}
                    />
                  )
                )}

                <span>More</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <div className="flex items-start gap-3 py-6 overflow-x-auto">
        <div
          className="flex flex-col justify-between text-[9px] font-semibold text-slate-600 py-1 shrink-0"
          style={{
            height: '110px',
          }}
        >
          <span>M</span>
          <span>W</span>
          <span>F</span>
        </div>

        <div className="flex flex-col flex-1 min-w-70 gap-2">
          <div className="flex justify-between text-[9px] font-semibold text-slate-600 px-0.5">
            {MONTHS.map((month) => (
              <span key={month}>
                {month}
              </span>
            ))}
          </div>
          <div
            className="grid grid-flow-col grid-rows-7 gap-1"
            style={{
              height: '110px',
            }}
          >
            {GRID_DATA.map((cell, i) => (
              <motion.span
                key={i}
                onMouseEnter={() =>
                  setHovered(cell)
                }
                onMouseLeave={() =>
                  setHovered(null)
                }
                whileHover={{
                  scale: 1.35,
                  zIndex: 20,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 18,
                }}
                className={`w-3 h-3 rounded-[3px] border cursor-pointer ${getCellColor(
                  cell.hours
                )}`}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-4 border-t border-white/4 flex items-center justify-between">
        
        <div>
          <span className="text-[18px] font-black text-white">
            142
          </span>

          <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
            Hours
          </span>
        </div>

        <div>
          <span className="text-[18px] font-black text-emerald-400">
            +18%
          </span>

          <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
            Growth
          </span>
        </div>

        <button className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
          Report

          <ChevronRight className="w-3 h-3" />
        </button>
      </footer>
    </section>
  );
}