<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>
<template>
  <div id="app" class="bg-egray">
    <NavBar/>
    <router-view/>
    <Footer/>
  </div>
</template>