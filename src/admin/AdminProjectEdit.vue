<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase, IMAGE_BUCKET } from '../lib/supabase';
import DeviceFrame from '../components/DeviceFrame.vue';
import { STACKS, iconUrl } from '../lib/stacks';

const route = useRoute();
const router = useRouter();

const isNew = computed(() => route.params.id === undefined);

const form = ref({
  title: '',
  link: '',
  slug: '',
  description: '',
  type: 'web',
  device: 'none', // 'none' | 'laptop' | 'phone' — CSS mockup frame on the public site
  stack: [], // array of Simple Icons slugs (see lib/stacks.js)
  image_url: '',
});

const toggleStack = (value) => {
  const i = form.value.stack.indexOf(value);
  if (i === -1) form.value.stack.push(value);
  else form.value.stack.splice(i, 1);
};

const file = ref(null);
const loading = ref(false);
const saving = ref(false);
const error = ref('');

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const load = async () => {
  if (isNew.value) return;
  loading.value = true;
  const { data, error: err } = await supabase
    .from('projects')
    .select('*')
    .eq('id', route.params.id)
    .single();
  loading.value = false;
  if (err) {
    error.value = err.message;
    return;
  }
  form.value = {
    title: data.title ?? '',
    link: data.link ?? '',
    slug: data.slug ?? '',
    description: data.description ?? '',
    type: data.type ?? 'web',
    device: data.device ?? 'none',
    stack: Array.isArray(data.stack) ? [...data.stack] : [],
    image_url: data.image_url ?? '',
  };
};

const localPreview = ref('');
const onFileChange = (e) => {
  file.value = e.target.files?.[0] ?? null;
  localPreview.value = file.value ? URL.createObjectURL(file.value) : '';
};

// Image shown in the live mockup preview: newly picked file, else the saved one.
const previewUrl = computed(() => localPreview.value || form.value.image_url);

const uploadImage = async () => {
  if (!file.value) return form.value.image_url;
  const ext = file.value.name.split('.').pop();
  const path = `${Date.now()}-${slugify(form.value.title || 'project')}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, file.value, { upsert: true });
  if (upErr) throw upErr;
  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
};

const save = async () => {
  error.value = '';
  saving.value = true;
  try {
    const image_url = await uploadImage();
    const payload = {
      title: form.value.title,
      link: form.value.link || null,
      slug: form.value.slug || slugify(form.value.title),
      description: form.value.description,
      type: form.value.type,
      device: form.value.device,
      stack: form.value.stack,
      image_url,
    };

    if (isNew.value) {
      // Append new projects to the end of the custom order.
      const { data: last } = await supabase
        .from('projects')
        .select('sort_order')
        .order('sort_order', { ascending: false, nullsFirst: false })
        .limit(1)
        .maybeSingle();
      payload.sort_order = (last?.sort_order ?? 0) + 1;
    }

    const { error: err } = isNew.value
      ? await supabase.from('projects').insert(payload)
      : await supabase.from('projects').update(payload).eq('id', route.params.id);

    if (err) throw err;
    router.push('/admin');
  } catch (e) {
    error.value = e.message;
  } finally {
    saving.value = false;
  }
};

onMounted(load);
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <h1 class="text-3xl font-extrabold">{{ isNew ? 'New project' : 'Edit project' }}</h1>

    <p v-if="loading" class="text-gray-400">Loading…</p>

    <form v-else @submit.prevent="save" class="space-y-5">
      <div>
        <label class="block text-sm text-gray-300 mb-1">Title</label>
        <input v-model="form.title" required class="input" />
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm text-gray-300 mb-1">Type</label>
          <select v-model="form.type" class="input">
            <option value="web">web</option>
            <option value="mobile">mobile</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-300 mb-1">Mockup frame</label>
          <select v-model="form.device" class="input">
            <option value="none">None</option>
            <option value="browser">Browser window</option>
            <option value="laptop">Laptop (silver)</option>
            <option value="laptop-dark">Laptop (dark)</option>
            <option value="tablet">Tablet</option>
            <option value="phone">Phone (notch)</option>
            <option value="phone-punch">Phone (punch-hole)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-gray-300 mb-1">Slug (auto if blank)</label>
          <input v-model="form.slug" class="input" :placeholder="slugify(form.title)" />
        </div>
      </div>

      <div>
        <label class="block text-sm text-gray-300 mb-1">Live link (optional)</label>
        <input v-model="form.link" type="url" class="input" placeholder="https://…" />
      </div>

      <div>
        <label class="block text-sm text-gray-300 mb-1">Description</label>
        <textarea v-model="form.description" rows="4" class="input"></textarea>
      </div>

      <div>
        <label class="block text-sm text-gray-300 mb-2">
          Stack <span class="text-gray-500">({{ form.stack.length }} selected — click to toggle)</span>
        </label>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          <button
            v-for="s in STACKS"
            :key="s.value"
            type="button"
            @click="toggleStack(s.value)"
            class="flex flex-col items-center gap-1.5 rounded-lg border p-2 transition cursor-pointer"
            :class="form.stack.includes(s.value)
              ? 'border-blue-500 bg-blue-500/15'
              : 'border-white/10 bg-white/5 hover:border-white/30'"
          >
            <img :src="iconUrl(s.value)" :alt="s.label" class="h-7 w-7 object-contain" loading="lazy" />
            <span class="text-[11px] text-gray-300 leading-tight text-center">{{ s.label }}</span>
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm text-gray-300 mb-1">Image</label>
        <div v-if="previewUrl" class="mb-3 max-w-md">
          <DeviceFrame :src="previewUrl" alt="" :device="form.device" />
          <p class="text-xs text-gray-500 mt-2">Preview with the “{{ form.device }}” frame.</p>
        </div>
        <input type="file" accept="image/*" @change="onFileChange" class="text-sm" />
        <p class="text-xs text-gray-500 mt-1">Leave empty to keep the current image.</p>
      </div>

      <p v-if="error" class="text-red-400">{{ error }}</p>

      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="bg-blue-700 hover:bg-blue-800 disabled:opacity-60 cursor-pointer font-bold rounded-lg px-5 py-2.5"
        >{{ saving ? 'Saving…' : 'Save' }}</button>
        <RouterLink to="/admin" class="bg-white/10 hover:bg-white/20 rounded-lg px-5 py-2.5">Cancel</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  border-radius: 0.5rem;
  background-color: #1f1f1f;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.5rem 0.75rem;
  color: white;
}
.input:focus {
  outline: none;
  border-color: #3b82f6;
}
</style>
