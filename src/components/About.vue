<script setup>
import LogoCarousel from './LogoCarousel.vue';
import { Vue3Marquee } from 'vue3-marquee';

function getAge(yearOfBirth) {
    const today = new Date();
    return today.getFullYear() - yearOfBirth;
}



</script>
<template>
  <section class="py-24 lg:py-24 sm:py-24 mb-0" id="about">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
    
      <h1 class="bg-white dark:bg-egray mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">About</span></h1>
      <p class=" max-w-full lg:max-w-3/4 font-bold text-gray-300 md:text-xl lg:text-xl">
        {{getAge(2002)}} year old Full Stack Web Engineer with experience in developing SaaS applications, eCommerce platforms and dynamic web applications.
         My journey started during my master's in university where i applied my skills through freelancing and school project.<br>
        I love learning about new technologies, especially from skilled people and professionals in the field, which makes me a great team player.<br>

Beyond coding, I’m passionate about video editing, and creating cool visuals for different things.
 I also enjoy football, both playing and watching. And whenever I can, I like being out in nature, taking in the fresh air and good views.
        
        </p>
      <div class="px-20 py-8 ">
      
    </div>
    <div class="px-20">
    </div>

      <ol class="relative border-s border-gray-200 dark:border-gray-700">     
        <li class="mb-4 p-2 ms-6">
              <span class="absolute p-2.5 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <font-awesome-icon class="block h-16 mx-3 w-auto text-white" :icon="['fas', 'briefcase']" />
              </span>
              <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Fullstack Web Developer<span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 ms-3">Ongoing</span></h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">January 2024</time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">Codev IT Consulting Algeria</p>
          </li>             
          
          <li class="mb-4 p-2 ms-6">
              <span class="absolute p-2.5 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <font-awesome-icon class="block h-16 mx-3 w-auto text-white" :icon="['fas', 'graduation-cap']" />
              </span>
              <h3 class="mb-1 mr-3 text-lg font-semibold text-gray-900 dark:text-white">Masters degree in
      Information Systems and
      Web Technologies</h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023 - 2024</time>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">Abdelhamid Mehri University, Constantine.</p>
          </li>
          <li class="ms-6 p-2">            
              <span class="absolute p-2.5 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <font-awesome-icon class="block h-16 mx-3 w-auto text-white" :icon="['fas', 'graduation-cap']"/>
              </span>
              <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Bachelor degree in software engineering</h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2019 - 2022</time>
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Abdelhamid Mehri University, Constantine.</p>
              
          </li>
      </ol>


    
    
  </div>
  <LogoCarousel/>
  </section>
</template>





