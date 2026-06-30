<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../lib/useAuth';

const router = useRouter();
const route = useRoute();
const { signIn } = useAuth();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  const { error: err } = await signIn(email.value, password.value);
  loading.value = false;
  if (err) {
    error.value = err.message;
    return;
  }
  router.push(route.query.redirect?.toString() || '/admin');
};
</script>

<template>
  <div class="min-h-screen bg-egray text-white flex items-center justify-center px-6">
    <form
      @submit.prevent="handleLogin"
      class="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
    >
      <h1 class="text-2xl font-extrabold">Sign in</h1>

      <div>
        <label class="block text-sm text-gray-300 mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          required
          autocomplete="email"
          class="w-full rounded-lg bg-egray border border-white/15 px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm text-gray-300 mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          class="w-full rounded-lg bg-egray border border-white/15 px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 cursor-pointer font-bold rounded-lg px-5 py-2.5"
      >
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>
