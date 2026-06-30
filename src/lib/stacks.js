// Single source of truth for selectable tech stacks.
// `value` is stored in the DB AND used as the Simple Icons slug, so the picker
// and the public site always render the exact same icon.
// Browse/verify slugs at https://simpleicons.org
export const STACKS = [
  { value: 'vuedotjs', label: 'Vue' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'react', label: 'React' },
  { value: 'nextdotjs', label: 'Next.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodedotjs', label: 'Node.js' },
  { value: 'express', label: 'Express' },
  { value: 'php', label: 'PHP' },
  { value: 'laravel', label: 'Laravel' },
  { value: 'livewire', label: 'Livewire' },
  { value: 'python', label: 'Python' },
  { value: 'django', label: 'Django' },
  { value: 'html5', label: 'HTML5' },
  { value: 'css', label: 'CSS' },
  { value: 'tailwindcss', label: 'Tailwind' },
  { value: 'bootstrap', label: 'Bootstrap' },
  { value: 'flutter', label: 'Flutter' },
  { value: 'dart', label: 'Dart' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'swift', label: 'Swift' },
  { value: 'openjdk', label: 'Java' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'supabase', label: 'Supabase' },
  { value: 'git', label: 'Git' },
  { value: 'github', label: 'GitHub' },
  { value: 'figma', label: 'Figma' },
  { value: 'vite', label: 'Vite' },
];

// White icons to match the existing monochrome look on the dark site.
export const iconUrl = (slug, color = 'ffffff') =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

export const labelFor = (slug) =>
  STACKS.find((s) => s.value === slug)?.label ?? slug;
