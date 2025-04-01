<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { sanityClient } from '../sanity/sanity';
import { ref, onMounted, computed } from 'vue';


const showAll = ref(false)
const projects = ref([]);
const props = defineProps({
  title : String,
  projectType : String
})

const fetchProjects = async () => {
  try {
    const query = props.projectType 
    ? `*[_type == "project" && type == "${props.projectType}"] | order(_createdAt asc) {title, description, link, type, stack, "imageUrl": image.asset->url}`
    : `*[_type == "project"] | order(_createdAt asc) {title, description, link, type, stack, "imageUrl": image.asset->url}`;
    const data = await sanityClient.fetch(query);  
    projects.value = data;
  
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

const visibleProjects = computed(() => projects.value.slice(0, 4));
const hiddenProjects = computed(() => projects.value.slice(4));

onMounted(fetchProjects);
</script>

<template>
  <section class="py-24  mb-20 lg:mb-0 sm:mb-20" id="projects">
  <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
    <h1 class="bg-white dark:bg-egray mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{{ title }}</span></h1>
  
    <div>
    <div v-for="(project, index) in visibleProjects" :key="project.id" :class="index % 2 === 0 ? 'left' : 'right'" class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
      <img v-if="index % 2 === 0" class="w-full max-w-xl mx-auto" :src="project.imageUrl" :alt="project.title">
      <div class="mt-4 md:mt-0">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{ project.title }}</h2>
        <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{{ project.description }}</p>
        <h1 class="text-2xl text-white font-bold">Stack used:</h1>

        <div class="flex space-x-4 mt-2">
  <template v-for="tech in project.stack" :key="tech">
    <font-awesome-icon 
      v-if="tech !== 'django' && tech !== 'tailwindcss' && tech !== 'livewire'" 
      size="3x" 
      class="h-14 w-auto text-white" 
      :icon="['fab', tech]" 
    />
    <img 
      v-else-if="tech === 'django'" 
      class="logo h-12 mx-3 w-auto" 
      src="https://cdn.simpleicons.org/django/092E20" 
      alt="Django"
    />
    <img 
      v-else-if="tech === 'tailwindcss'"
      class="logo h-12 mx-3 w-auto" 
      src="https://cdn.simpleicons.org/tailwindcss/38B2AC" 
      alt="Tailwind"
    />
    <img 
      v-else-if="tech === 'livewire'"
      class="logo h-12 mx-3 w-auto" 
      src="https://cdn.simpleicons.org/livewire/38B2AC" 
      alt="Tailwind"
    />
  </template>
</div>

        
        <a v-if="project.link" :href="project.link" target="_blank" class="mt-7 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-l px-5 py-2.5 text-center dark:focus:ring-primary-900">
          Live
          <font-awesome-icon class="block h-6 mx-2 w-auto text-white" :icon="['fas', 'arrow-up-right-from-square']" />
        </a>
      
      </div>
      <img v-if="index % 2 !== 0" class="w-full" :src="project.imageUrl" :alt="project.title">
    </div>
    
    <transition name="expand">
      <div v-show="showAll">
        <div v-for="(project, index) in hiddenProjects" :key="project.id" :class="index % 2 === 0 ? 'left' : 'right'" class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img v-if="index % 2 === 0" class="w-full max-w-xl mx-auto" :src="project.imageUrl" :alt="project.name">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{ project.title }}</h2>
            <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{{ project.description }}</p>
            <h1 class="text-2xl text-white font-bold">Stack used:</h1>

<div class="flex space-x-4 mt-2">
<template v-for="tech in project.stack" :key="tech">
<font-awesome-icon 
v-if="tech !== 'django' && tech !== 'tailwindcss' && tech !== 'livewire'" 
size="3x" 
class="h-14 w-auto text-white" 
:icon="['fab', tech]" 
/>
<img 
v-else-if="tech === 'django'" 
class="logo h-12 mx-3 w-auto" 
src="https://cdn.simpleicons.org/django/092E20" 
alt="Django"
/>
<img 
v-else-if="tech === 'tailwindcss'"
class="logo h-12 mx-3 w-auto" 
src="https://cdn.simpleicons.org/tailwindcss/38B2AC" 
alt="Tailwind"
/>
<img 
v-else-if="tech === 'livewire'"
class="logo h-12 mx-3 w-auto" 
src="https://cdn.simpleicons.org/livewire/38B2AC" 
alt="Tailwind"
/>
</template>
</div>

            <a v-if="project.link" :href="project.link" target="_blank" class="mt-8 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-l px-5 py-2.5 text-center dark:focus:ring-primary-900">
              Live
              <font-awesome-icon class="block h-6 mx-2 w-auto text-white" :icon="['fas', 'arrow-up-right-from-square']" />
            </a>
          </div>
          <img v-if="index % 2 !== 0" class="w-full" :src="project.image" :alt="project.name">
        </div>
      </div>
    </transition>
    
  </div>
      <div v-show="projects.length > 4" class=" flex justify-center mt-5">     
        <button @click="showAll = !showAll" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold cursor-pointer rounded-lg text-l px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <span v-if="!showAll">View More</span>
          <span v-else>View Less</span> 
        </button>
      </div>

  </div>

  </section>
</template>



<style>

.expand-enter-active,
.expand-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-200px);
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1000px;
}
.logo{
    filter: brightness(0) invert(1);
  }
</style>