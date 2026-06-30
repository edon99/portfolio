<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { supabase } from "../lib/supabase";

const pdfWidth = ref("90vw");

// Falls back to the bundled CV until one is uploaded from the dashboard.
const pdfSource = ref('/cv.pdf');

const loading = ref(true);

const fetchResume = async () => {
  const { data } = await supabase
    .from('site_settings')
    .select('resume_url')
    .eq('id', 1)
    .maybeSingle();
  if (data?.resume_url) pdfSource.value = data.resume_url;
};

const updatePdfWidth = () => {
  const screenWidth = window.innerWidth;
  
  if (screenWidth >= 1280) {
    pdfWidth.value = "500px"; 
  } else if (screenWidth >= 1024) {
    pdfWidth.value = "500px";
  } else if (screenWidth >= 768) {
    pdfWidth.value = "400px"; 
  } else if (screenWidth >= 640) {
    pdfWidth.value = "100px"; 
  } else {
    pdfWidth.value = "90vw";
  }
};

onMounted(() => {
  fetchResume();
  updatePdfWidth();
  window.addEventListener("resize", updatePdfWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePdfWidth);
});
const handleRendering = () => {
  loading.value = false;
};
</script>

<template>
  <div class="py-32">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h1 class="bg-white dark:bg-egray mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">My Resume</span></h1>
    </div>
      <div class="flex flex-col justify-center items-center gap-5 w-full">
        <div
        v-if="loading"
        class="flex flex-col items-center justify-center text-blue-700 dark:text-blue-400 py-60"
      >
        <svg
          class="animate-spin h-10 w-10 mb-3 text-blue-700 dark:text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p class="text-lg font-medium">Loading PDF...</p>
      </div>
     
      
    <VuePdfEmbed 
      :style="{width: pdfWidth}"
      :source="pdfSource" 
      :class="['transition-opacity duration-700', loading ? 'opacity-0' : 'opacity-100']"
      @rendered="handleRendering"
    />
   
    <a
      :href="pdfSource"
      v-show="!loading"
      class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-12 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      download="ofoura_resume"
    >
      Download
    </a>
  </div>
</div>
</template>
