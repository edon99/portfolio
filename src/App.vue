<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>
<template>
  <div id="app" class="bg-egray font-sans">
    <html class="dark">
    <NavBar/>
    <router-view/>
    <Footer/>
    </html>
  </div>
</template>