export const SUBJECTS: Record<string, { name: string; description: string }> = {
  CS: {
    name: 'Computer Science',
    description: 'Core CS courses including programming, algorithms, systems, and electives.',
  },
  MATH: {
    name: 'Mathematics',
    description: 'Math courses commonly taken by CS majors.',
  },
  STAT: {
    name: 'Statistics',
    description: 'Statistics courses for data science and probability.',
  },
  ECE: {
    name: 'Electrical & Computer Engineering',
    description: 'ECE courses for computer engineering.',
  },
  PHYS: {
    name: 'Physics',
    description: 'Physics courses for engineering majors.',
  },
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  'easy': 'bg-green-500',
  'medium': 'bg-yellow-500',
  'hard': 'bg-orange-500',
  'very-hard': 'bg-red-500',
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  'easy': 'Easy',
  'medium': 'Medium',
  'hard': 'Hard',
  'very-hard': 'Very Hard',
};

export const WORKLOAD_LABELS: Record<string, string> = {
  'light': '5-8 hrs/week',
  'moderate': '8-12 hrs/week',
  'heavy': '12-18 hrs/week',
  'very-heavy': '18+ hrs/week',
};