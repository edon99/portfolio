<script setup>

import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import Services from '../components/Services.vue';
import Projects from '../components/Projects.vue';
import Contact from '../components/Contact.vue';

import { onMounted } from 'vue';



onMounted(() => {
 
    const borders = document.querySelectorAll('.border-anim')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('w-fit')
        } else {
          
          entry.target.classList.remove('w-fit')
        }
      })
    },
    { threshold: 0.5 }
  )

  borders.forEach((el) => observer.observe(el))
});
</script>
<template>
  <main class="space-y-24 bg-egray">
    
    <Hero/>
    <About/>
    <Services title = 'Services'/>
    <Projects projectType = '' title = 'Projects'/>
    <Contact/>
    
  </main>
  
</template>








