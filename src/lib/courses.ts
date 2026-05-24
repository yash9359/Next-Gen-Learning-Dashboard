import { supabase, Course } from './supabase';

export interface FetchCoursesResult {
  courses: Course[];
  isDemo: boolean;
  error?: string;
}

export const MOCK_COURSES: Course[] = [
  {
    id: 'mock-1',
    title: 'Advanced React & Architecture',
    progress: 78,
    icon_name: 'Blocks',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Interactive Web Animations with Framer Motion',
    progress: 45,
    icon_name: 'Sparkles',
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Full-Stack Database Design with Supabase',
    progress: 92,
    icon_name: 'Database',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-4',
    title: 'Creative UI/UX & Generative Aesthetics',
    progress: 60,
    icon_name: 'Palette',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-5',
    title: 'Next.js Performance & Core Web Vitals',
    progress: 20,
    icon_name: 'Zap',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export async function fetchCourses(): Promise<FetchCoursesResult> {
  if (!supabase) {
    return {
      courses: MOCK_COURSES,
      isDemo: true,
      error: 'Supabase environment variables missing. Using local data.',
    };
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error:', error);
      return {
        courses: MOCK_COURSES,
        isDemo: true,
        error: `Supabase query error: ${error.message}. Using local data.`,
      };
    }

    if (!data || data.length === 0) {
      return {
        courses: MOCK_COURSES,
        isDemo: true,
        error: 'Database is empty. Using local data.',
      };
    }

    return {
      courses: data as Course[],
      isDemo: false,
    };
  } catch (err: unknown) {
    console.error('Unexpected connection error during database fetch:', err);
    return {
      courses: MOCK_COURSES,
      isDemo: true,
      error: `Unexpected error: ${err instanceof Error ? err.message : String(err)}. Using local data.`,
    };
  }
}
