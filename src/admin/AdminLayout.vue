<script setup>
import { useRouter, RouterLink, RouterView } from 'vue-router';
import { useAuth } from '../lib/useAuth';

const router = useRouter();
const { session, signOut } = useAuth();

const handleSignOut = async () => {
  await signOut();
  router.push('/admin/login');
};
</script>

<template>
  <div class="min-h-screen bg-egray text-white">
    <header class="border-b border-white/10">
      <div class="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <RouterLink to="/admin" class="text-xl font-extrabold">Dashboard</RouterLink>
          <RouterLink
            to="/admin"
            class="text-sm text-gray-300 hover:text-white"
            active-class="text-blue-400"
          >Projects</RouterLink>
          <RouterLink
            to="/admin/resume"
            class="text-sm text-gray-300 hover:text-white"
            active-class="text-blue-400"
          >Resume</RouterLink>
        </div>
        <div class="flex items-center gap-4">
          <a href="/" target="_blank" class="text-sm text-gray-300 hover:text-white">View site ↗</a>
          <button
            v-if="session"
            @click="handleSignOut"
            class="text-sm bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 cursor-pointer"
          >Sign out</button>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-8">
      <RouterView />
    </main>
  </div>
</template>
