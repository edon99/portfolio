<script setup>
import { ref, onMounted } from 'vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'




const { pdf} = usePDF('../../public/cv.pdf')



const error = ref(null)
onMounted(() => {
  if (!pdf.value) {
    error.value = 'Failed to load PDF'
  }
})
</script>

<template>
    <div class="py-80">
  <div v-if="error" class="error">{{ error }}</div>
  <div v-else-if="!pdf">Loading PDF...</div>
  <VuePDF v-else :pdf="pdf" />

  

</div>
</template>

<style>
.error {
  color: red;
  font-weight: bold;
}
</style>