<template>
    <div class="carousel overflow-hidden">
      <div class="banner2 bg-blue-800 h-24 overflow-hidden relative z-0 top-24"></div>
      <div class="banner z-10 overflow-hidden bg-blue-700 py-5 shadow-lg">
        <Vue3Marquee :duration="15" :pause-on-hover="true">
          <font-awesome-icon size="4x" class="block h-16 mx-3 w-auto text-white" :icon="['fab', 'laravel']" />
          <font-awesome-icon size="4x" class="h-20 mx-3 w-auto text-white" :icon="['fab', 'php']" />
          <img class="logo h-12 mx-3 w-auto" src="https://cdn.simpleicons.org/django/092E20" alt="Django">
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'python']" />
          <font-awesome-icon size="4x" class="h-16 mx-3 w-auto text-white" :icon="['fab', 'vuejs']" />
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'react']" />
            <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'node-js']" />
           <img class="logo mx-3 h-16 w-auto" src="https://cdn.simpleicons.org/express/38B2AC" alt="ExpressJs">
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'flutter']" />
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'dart-lang']" />
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'java']" />
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'js']" />
          <img class="logo mx-3 h-16 w-auto" src="https://cdn.simpleicons.org/tailwindcss/38B2AC" alt="Tailwind">
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'html5']" />
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'css3-alt']" />
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'bootstrap']" />
          <font-awesome-icon size="4x" class="h-16 mx-3 w-auto text-white" :icon="['fab', 'git-alt']" />
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fab', 'github']" />
          <img class="logo h-20 mx-3 w-auto" src="https://cdn.simpleicons.org/mysql/4479A1" alt="MySQL">
          <img class="logo h-14 mx-3 w-auto" src="https://cdn.simpleicons.org/postgresql/4169E1" alt="PostgreSQL">
          <font-awesome-icon size="4x" class="h-14 mx-3 w-auto text-white" :icon="['fas', 'database']" />
        </Vue3Marquee>
      </div>
    </div>
  </template>
  
  <script setup>
    import { Vue3Marquee } from 'vue3-marquee';
    // import { faLaravel } from '@fortawesome/free-brands-svg-icons';
    // library.add(faLaravel)
    
  </script>

  <style>
  .logo{
    filter: brightness(0) invert(1);
  }
  
.banner {
  transform: translateX(0) rotate(1deg);
}

.banner2 {
  transform: translateX(0) rotate(-1deg);
}</style>
  
  
