<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import VuePdfEmbed from "vue-pdf-embed";

const pdfWidth = ref("90vw"); // Default to 90% of viewport width

const pdfSource = 'cv.pdf'

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
  updatePdfWidth(); 
  window.addEventListener("resize", updatePdfWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePdfWidth);
});
</script>

<template>
  <div class="py-32">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h1 class="bg-white dark:bg-egray mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">My Resume</span></h1>
    </div>
      <div class="flex flex-col justify-center items-center gap-5 w-full">
    <VuePdfEmbed 
      :style="{width: pdfWidth}"
      :source="pdfSource" 
    />
    <a 
      href="/cv.pdf"
      class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-12 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      download="ofoura_resume"
    >
      Download
    </a>
  </div>
</div>
</template>
