export const STORAGE_KEY = 'focusboard_tasks_v1';

export const INITIAL_TASKS = [
  {
    id: 'task-101',
    title: 'Finalize Q4 Design System Tokens',
    description:
      'Audit color contrast ratios, spacing scale, and button border radii across desktop and mobile Figma frames.',
    category: 'Design',
    status: 'In progress',
    priority: 'High',
    dueDate: '2026-11-24',
  },
  {
    id: 'task-102',
    title: 'Implement Responsive Task Filtering & Search',
    description:
      'Combine case-insensitive title search with status tab filters and priority dropdown without mutating state.',
    category: 'Engineering',
    status: 'Completed',
    priority: 'High',
    dueDate: '2026-11-21',
  },
  {
    id: 'task-103',
    title: 'Prepare Sprint Review Presentation Deck',
    description:
      'Summarize velocity metrics, completed user stories, and upcoming Q1 product roadmap milestones.',
    category: 'Product',
    status: 'To do',
    priority: 'Medium',
    dueDate: '2026-11-26',
  },
  {
    id: 'task-104',
    title: 'Accessibility Audit & Keyboard Navigation Check',
    description:
      'Verify ARIA attributes, focus rings, Escape key modal dismissal, and screen-reader announcements.',
    category: 'QA',
    status: 'In progress',
    priority: 'High',
    dueDate: '2026-11-25',
  },
  {
    id: 'task-105',
    title: 'Optimize Bundle Size & Lighthouse Performance',
    description:
      'Analyze Vite production chunks, lazy-load secondary dialogs, and ensure 98+ Lighthouse performance score.',
    category: 'Engineering',
    status: 'To do',
    priority: 'Low',
    dueDate: '2026-11-29',
  },
  {
    id: 'task-106',
    title: 'Update Onboarding Tooltip Copy',
    description:
      'Refine microcopy for first-time dashboard users explaining localStorage auto-save and quick status toggles.',
    category: 'Marketing',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2026-11-20',
  },
];

export const FOCUS_NOTES_SLIDES = [
  {
    id: 'slide-1',
    badge: 'Focus Note 01 • Deep Work',
    title: 'Prioritize High-Impact Deliverables First',
    description:
      'Block 90 minutes each morning for your highest-priority task before checking messages. Completing one key milestone early builds momentum across the entire sprint.',
    accent: 'from-indigo-600 to-violet-600',
    tag: 'Morning Ritual',
  },
  {
    id: 'slide-2',
    badge: 'Focus Note 02 • Sprint Rhythm',
    title: 'Keep Active Work-in-Progress Lean',
    description:
      'Limit tasks in "In progress" to 2 or 3 items at a time. Closing out near-finished work reduces context switching and keeps completion velocity predictable.',
    accent: 'from-blue-600 to-cyan-600',
    tag: 'Flow State',
  },
  {
    id: 'slide-3',
    badge: 'Focus Note 03 • Weekly Reset',
    title: 'Review Due Dates & Clear Stale Backlog',
    description:
      'Every Friday afternoon, re-evaluate overdue items, archive completed work, and set clear priorities so Monday starts with zero friction.',
    accent: 'from-emerald-600 to-teal-600',
    tag: 'Weekly Cadence',
  },
];

export const CATEGORIES = ['Design', 'Engineering', 'Product', 'Marketing', 'QA', 'Operations'];
export const STATUSES = ['To do', 'In progress', 'Completed'];
export const PRIORITIES = ['High', 'Medium', 'Low'];
