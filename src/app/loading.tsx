import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export default function Loading() {
  return (
    <div className="space-y-6 select-none pointer-events-none">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-slate-700 text-[10px] font-semibold uppercase tracking-wider mb-1 skeleton-pulse">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </div>
          <div className="h-6 bg-white/4 rounded w-44 skeleton-pulse" />
        </div>
        <div className="h-8 w-28 bg-white/3 rounded-lg skeleton-pulse" />
      </header>

      <div className="h-14 w-full bg-white/2 rounded-xl border border-white/4 skeleton-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 w-full auto-rows-auto">
        <div className="xl:col-span-2 sm:col-span-2 col-span-1 min-h-65 glass-card rounded-2xl p-5 lg:p-6 skeleton-pulse flex flex-col justify-between">
          <div className="space-y-3">
            <div className="h-5 bg-white/4 rounded-full w-24" />
            <div className="h-9 bg-white/4 rounded w-72" />
            <div className="h-4 bg-white/4 rounded w-56" />
          </div>
          <div className="flex gap-3 mt-6">
            <div className="h-14 bg-white/3 rounded-xl flex-1" />
            <div className="h-14 bg-white/3 rounded-xl flex-1" />
          </div>
        </div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="min-h-57.5 glass-card rounded-2xl p-5 lg:p-6 skeleton-pulse flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/4" />
            <div className="h-4 bg-white/4 rounded w-3/4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-2.5 bg-white/4 rounded w-16" />
                <div className="h-2.5 bg-white/4 rounded w-8" />
              </div>
              <div className="w-full h-1.25 bg-white/4 rounded-full" />
            </div>
          </div>
        ))}

        <div className="xl:col-span-2 sm:col-span-2 col-span-1 min-h-60 glass-card rounded-2xl p-5 lg:p-6 skeleton-pulse flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/4" />
              <div className="space-y-1">
                <div className="h-3.5 bg-white/4 rounded w-28" />
                <div className="h-2.5 bg-white/4 rounded w-16" />
              </div>
            </div>
            <div className="h-4 bg-white/4 rounded w-28" />
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-[3px] h-[100px] my-3">
            {Array.from({ length: 126 }).map((_, i) => (
              <div key={i} className="w-[11px] h-[11px] rounded-[2px] bg-white/3" />
            ))}
          </div>
          <div className="flex justify-between border-t border-white/[0.04] pt-3">
            <div className="h-3 bg-white/4 rounded w-16" />
            <div className="h-3 bg-white/4 rounded w-20" />
            <div className="h-3 bg-white/4 rounded w-14" />
          </div>
        </div>
      </div>
    </div>
  );
}
