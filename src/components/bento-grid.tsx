'use client';

import { motion, Variants } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
}

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 18,
    },
  },
};

export function BentoGrid({
  children,
}: BentoGridProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-7 2xl:gap-8"
    >
      {children}
    </motion.section>
  );
}

export function BentoGridItem({
  children,
  className = '',
}: BentoGridItemProps) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{
        scale: 1.008,
        y: -1,
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 24,
        mass: 0.6,
      }}
      className={`relative overflow-hidden rounded-3xl border border-white/5 bg-[#0c0c14]/95 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_top,white,transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.025] mix-blend-soft-light pointer-events-none bg-[url('/noise.png')]" />
      <div className="relative z-1 h-full p-4 lg:p-5">
        {children}
      </div>
    </motion.article>
  );
}