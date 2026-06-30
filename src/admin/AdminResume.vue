<script setup>
import { ref, onMounted } from 'vue';
import { supabase, IMAGE_BUCKET } from '../lib/supabase';

const currentUrl = ref('');
const file = ref(null);
const loading = ref(true);
const saving = ref(false);
const message = ref('');
const error = ref('');

const load = async () => {
  loading.value = true;
  const { data, error: err } = await supabase
    .from('site_settings')
    .select('resume_url')
    .eq('id', 1)
    .maybeSingle();
  loading.value = false;
  if (err) {
    error.value = err.message;
    return;
  }
  currentUrl.value = data?.resume_url ?? '';
};

const onFileChange = (e) => {
  file.value = e.target.files?.[0] ?? null;
};

const save = async () => {
  error.value = '';
  message.value = '';
  if (!file.value) {
    error.value = 'Pick a PDF first.';
    return;
  }
  saving.value = true;
  try {
    const path = `resume/cv-${Date.now()}.pdf`;
    const { error: upErr } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, file.value, { upsert: true, contentType: 'application/pdf' });
    if (upErr) throw upErr;

    const resume_url = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;

    const { error: dbErr } = await supabase
      .from('site_settings')
      .upsert({ id: 1, resume_url });
    if (dbErr) throw dbErr;

    currentUrl.value = resume_url;
    message.value = 'Resume updated. It is now live on /resume.';
    file.value = null;
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
    <h1 class="text-3xl font-extrabold">Resume</h1>

    <p v-if="loading" class="text-gray-400">Loading…</p>

    <template v-else>
      <div v-if="currentUrl" class="text-sm text-gray-300">
        Current file:
        <a :href="currentUrl" target="_blank" class="text-blue-400 hover:underline">open current resume ↗</a>
      </div>
      <p v-else class="text-sm text-gray-400">
        No resume uploaded yet — the site is using the bundled <code>cv.pdf</code> fallback.
      </p>

      <form @submit.prevent="save" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-300 mb-1">Upload new resume (PDF)</label>
          <input type="file" accept="application/pdf" @change="onFileChange" class="text-sm" />
        </div>

        <p v-if="error" class="text-red-400">{{ error }}</p>
        <p v-if="message" class="text-green-400">{{ message }}</p>

        <button
          type="submit"
          :disabled="saving"
          class="bg-blue-700 hover:bg-blue-800 disabled:opacity-60 cursor-pointer font-bold rounded-lg px-5 py-2.5"
        >{{ saving ? 'Uploading…' : 'Save resume' }}</button>
      </form>
    </template>
  </div>
</template>
