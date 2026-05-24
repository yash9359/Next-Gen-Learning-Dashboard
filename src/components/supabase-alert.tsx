'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, AlertTriangle, X } from 'lucide-react';

interface SupabaseAlertProps {
  isDemo: boolean;
  errorMsg?: string;
}

export default function SupabaseAlert({ isDemo, errorMsg }: SupabaseAlertProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="w-full mt-2"
      >
        <div
          className={`glass-card rounded-xl p-3.5 flex items-center justify-between gap-3 ${
            isDemo
              ? 'border-amber-500/20 shadow-amber-900/5'
              : 'border-emerald-500/15 shadow-emerald-900/5'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`p-1.5 rounded-lg shrink-0 ${
                isDemo
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
              }`}
            >
              {isDemo ? <AlertTriangle className="w-3.5 h-3.5" /> : <Database className="w-3.5 h-3.5" />}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-slate-200 flex items-center gap-1.5">
                {isDemo ? 'Local Data' : 'Supabase Connected'}
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isDemo ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {isDemo
                  ? errorMsg || 'Missing .env.local — using local data.'
                  : 'Live data from your PostgreSQL database.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded text-slate-600 hover:text-slate-300 transition-colors outline-none cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
