import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
      'Create a .env file (see .env.example) and set them in Netlify.'
  );
}

// Fall back to harmless placeholders so the app still boots before keys are
// configured (requests will simply fail rather than crashing on load).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

// Public storage bucket that holds project images.
export const IMAGE_BUCKET = 'images';
