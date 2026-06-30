import { ref } from 'vue';
import { supabase } from './supabase';

// Shared reactive auth state across the app.
const session = ref(null);
const ready = ref(false);

let initialized = false;

function init() {
  if (initialized) return;
  initialized = true;

  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    ready.value = true;
  });

  supabase.auth.onAuthStateChange((_event, newSession) => {
    session.value = newSession;
  });
}

export function useAuth() {
  init();

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  // Resolves once the initial session has been loaded (used by the router guard).
  const waitForReady = () =>
    new Promise((resolve) => {
      if (ready.value) return resolve();
      const stop = setInterval(() => {
        if (ready.value) {
          clearInterval(stop);
          resolve();
        }
      }, 20);
    });

  return { session, ready, signIn, signOut, waitForReady };
}
