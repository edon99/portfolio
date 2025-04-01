<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isMenuOpen = ref(false); 

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const smoothScroll = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    isMenuOpen.value = false; 
  }
};
</script>

<template>
  <nav class="bg-white dark:bg-egray fixed w-full z-20 top-0 start-0 shadow-2xl">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <RouterLink to="/">
          <img src="../assets/images/logo.png" class="h-12" alt="Logo" />
        </RouterLink>
      </div>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <a 
            href='../../public/cv.pdf'
            target="_blank" 
            class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            
          >
            Resume
          </a>
           <!-- <RouterLink
            to="/resume" 
            class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Resume
          </RouterLink> -->
        <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>


      <div :class="{ hidden: !isMenuOpen }" class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-egray md:dark:bg-egray dark:border-gray-700">
          <li>
            <RouterLink to="/" class="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-secondary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Home
            </RouterLink>
          </li>
          <li>
            <a @click.prevent="smoothScroll('about')" class="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-secondary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              About
            </a>
          </li>
          <li>
            <a @click.prevent="smoothScroll('services')" class="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-secondary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Services
            </a>
          </li>
          <li>
            <a @click.prevent="smoothScroll('projects')" class="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-secondary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Projects
            </a>
          </li>
          <li>
            <a @click.prevent="smoothScroll('contact')" class="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-secondary dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="fixed right-4 top-1/4 flex flex-col gap-3">
    <font-awesome-icon
        size="3x"
        class="block h-16 mx-2 w-auto shadow-2xl text-white cursor-pointer hover:text-blue-600 transition-all ease-in-out transform hover:translate-y-1"
        :icon="['fab', 'linkedin']"
    />
  
    <font-awesome-icon
        size="3x"
        class="block h-16 mx-2 w-auto shadow-2xl text-white cursor-pointer hover:text-blue-600 transition-all ease-in-out transform hover:translate-y-1"
        :icon="['fas', 'envelope']"
    />
  
    <font-awesome-icon
        size="3x"
        class="block h-16 mx-2 w-auto shadow-2xl text-white cursor-pointer hover:text-blue-600 transition-all ease-in-out transform hover:translate-y-1"
        :icon="['fab', 'github']"
    />
    <div class="ml-7 mt-5 w-1 h-64 bg-blue-700"></div>
</div>

</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
