<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { supabase } from '../lib/supabase';

const projects = ref([]);
const loading = ref(true);
const error = ref('');

const load = async () => {
  loading.value = true;
  error.value = '';
  const { data, error: err } = await supabase
    .from('projects')
    .select('id, title, type, link, sort_order, created_at')
    .order('sort_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: true });
  loading.value = false;
  if (err) {
    error.value = err.message;
    return;
  }
  projects.value = data ?? [];
};

const reordering = ref(false);

// Swap a project's position with its neighbour and persist both sort_order values.
const move = async (index, dir) => {
  const target = index + dir;
  if (target < 0 || target >= projects.value.length || reordering.value) return;
  reordering.value = true;

  const a = projects.value[index];
  const b = projects.value[target];
  const [oa, ob] = [a.sort_order, b.sort_order];

  const { error: e1 } = await supabase.from('projects').update({ sort_order: ob }).eq('id', a.id);
  const { error: e2 } = await supabase.from('projects').update({ sort_order: oa }).eq('id', b.id);

  reordering.value = false;
  if (e1 || e2) {
    alert((e1 || e2).message);
    return;
  }
  await load();
};

const remove = async (project) => {
  if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
  const { error: err } = await supabase.from('projects').delete().eq('id', project.id);
  if (err) {
    alert(err.message);
    return;
  }
  await load();
};

onMounted(load);
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-extrabold">Projects</h1>
      <RouterLink
        to="/admin/projects/new"
        class="bg-blue-700 hover:bg-blue-800 font-bold rounded-lg px-4 py-2"
      >+ New project</RouterLink>
    </div>

    <p v-if="error" class="text-red-400">{{ error }}</p>
    <p v-if="loading" class="text-gray-400">Loading…</p>

    <div v-else-if="projects.length === 0" class="text-gray-400">
      No projects yet. Create your first one.
    </div>

    <table v-else class="w-full text-left border border-white/10 rounded-lg overflow-hidden">
      <thead class="bg-white/5 text-sm text-gray-300">
        <tr>
          <th class="px-4 py-3 w-px">Order</th>
          <th class="px-4 py-3">Title</th>
          <th class="px-4 py-3">Type</th>
          <th class="px-4 py-3">Link</th>
          <th class="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, index) in projects" :key="p.id" class="border-t border-white/10">
          <td class="px-4 py-3 whitespace-nowrap">
            <button
              @click="move(index, -1)"
              :disabled="index === 0 || reordering"
              class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer mr-1"
              title="Move up"
            >↑</button>
            <button
              @click="move(index, 1)"
              :disabled="index === projects.length - 1 || reordering"
              class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer"
              title="Move down"
            >↓</button>
          </td>
          <td class="px-4 py-3 font-medium">{{ p.title }}</td>
          <td class="px-4 py-3">
            <span class="text-xs bg-white/10 rounded-full px-2 py-1">{{ p.type }}</span>
          </td>
          <td class="px-4 py-3 max-w-[16rem] truncate text-blue-400">
            <a v-if="p.link" :href="p.link" target="_blank">{{ p.link }}</a>
          </td>
          <td class="px-4 py-3 text-right whitespace-nowrap">
            <RouterLink
              :to="`/admin/projects/${p.id}`"
              class="text-blue-400 hover:underline mr-4"
            >Edit</RouterLink>
            <button @click="remove(p)" class="text-red-400 hover:underline cursor-pointer">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
