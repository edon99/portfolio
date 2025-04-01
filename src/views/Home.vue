<script setup>

import Hero from '../components/Hero.vue';
import About from '../components/About.vue';
import Services from '../components/Services.vue';
import Projects from '../components/Projects.vue';
import Contact from '../components/Contact.vue';


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








