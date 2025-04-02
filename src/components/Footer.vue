<script setup>

var year = new Date()
</script>

<template>

<footer class="bg-white dark:bg-egray">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div class="lg:flex hidden items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="../assets/images/logo.png" class="h-12" alt="My Logo" />
            </div>
            <ul class="flex flex-wrap justify-center lg:items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#about" class="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#services" class="hover:underline me-4 md:me-6">Services</a>
                </li>
                <li>
                    <a href="#projects" class="hover:underline me-4 md:me-6">Projects</a>
                </li>
                <li>
                    <a href="#contact" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Oussama Foura © {{ year.getFullYear() }} All Rights Reserved.</span>
    </div>
</footer>


</template>

<style>

</style>