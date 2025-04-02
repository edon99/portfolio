<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isShaking = ref(false);
const isFullscreen = ref(false);
const isDismissed = ref(false);

const triggerShake = () => {
  
  isShaking.value = true;
  setTimeout(() => {
    isShaking.value = false;
  }, 500); 
};

const fullscreen = () => {
  
  isFullscreen.value = true;
  setTimeout(() => {
    isFullscreen.value = false;
  }, 500); 
};

const dismiss = () => {
  
  isDismissed.value = true;
  setTimeout(() => {
    isDismissed.value = false;
  }, 800); 
};

const props = defineProps({
  texts: {
    type: Array,
    required: true,
    default: () => ["Hello World :>", "sudo rm --no-preserve_root -rf /", ":/"]
  },
  typingSpeed: {
    type: Number,
    default: 100 
  },
  deletingSpeed: {
    type: Number,
    default: 50 
  },
  pauseBetween: {
    type: Number,
    default: 2000 
  }
});

const displayedText = ref('');
const currentTextIndex = ref(0);
let isDeleting = false;
let timeoutId = null;

const typeWriter = () => {
  const currentText = props.texts[currentTextIndex.value];
  const currentLength = displayedText.value.length;
  
  if (!isDeleting) {
    if (currentLength < currentText.length) {
      displayedText.value = currentText.substring(0, currentLength + 1);
      timeoutId = setTimeout(typeWriter, props.typingSpeed);
    } else {
      isDeleting = true;
      timeoutId = setTimeout(typeWriter, props.pauseBetween);
    }
  } else {
    if (currentLength > 0) {
      displayedText.value = currentText.substring(0, currentLength - 1);
      timeoutId = setTimeout(typeWriter, props.deletingSpeed);
    } else {
      isDeleting = false;
      currentTextIndex.value = (currentTextIndex.value + 1) % props.texts.length;
      timeoutId = setTimeout(typeWriter, props.typingSpeed);
    }
  }
};

onMounted(() => {
  typeWriter();
});

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
});

const smoothScroll = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};
</script>

<template>
  <section class="bg-white dark:bg-egray pt-24 lg:pt-24 sm:pt-24">
    <div class="grid max-w-screen-xl px-4 pt-8 mx-auto lg:gap-8 xl:gap-0 lg:pt-16 lg:grid-cols-12">
      <div class="place-self-center lg:col-span-7 pb-12 lg:pb-0">
            <p class="max-w-2xl font-bold text-blue-500 md:text-lg lg:text-xl dark:text-gray-200">My name is</p>
            <h1 class="max-w-md mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white border-b-8 border-blue-700">Oussama Foura</h1>
            <p class="max-w-2xl mb-6 font-bold text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300"><span class="text-white">Full stack web Engineer</span> with experience in building high performing web applications, SaaS Solutions, as well as smart systems using <span class="text-white">AI</span> and <span class="text-white">Machine learning</span>.</p>
            <a @click.prevent="smoothScroll('projects')" class="inline-flex cursor-pointer items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                My Projects
                <font-awesome-icon  class="block h-16 mx-2 w-auto text-white" :icon="['fas', 'arrow-down']" />
              </a>
            <a @click.prevent="smoothScroll('contact')" class="inline-flex cursor-pointer items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Contact me
            </a> 
        </div>
      <div class="lg:mt-0 lg:col-span-5 lg:flex">
        <div 
        :class="{ 
          'shake bg-red-500/10 transition-all': isShaking,
          'fullscreen bg-green-500/10': isFullscreen,
          'dismiss bg-yellow-500/10 ': isDismissed
         }"  class="w-full h-60 overflow-hidden rounded-xl bg-gray-900 shadow-2xl">
          <div class="flex bg-gray-800/40 ring-1 ring-white/5">
            <div class="mb-px flex text-sm/6 font-medium text-gray-400">
              <div class="bg-white/5 px-3 py-2 text-white flex flex-row gap-1">
                <div @click="triggerShake" class="rounded bg-red-500 h-2 w-2 cursor-pointer"></div>
                <div @click="dismiss" class="rounded bg-yellow-500 h-2 w-2 cursor-pointer"></div>
                <div @click="fullscreen" class="rounded bg-green-500 h-2 w-2 cursor-pointer"></div>
              </div>
            </div>
          </div>
          <div class="text-white px-6 pb-14 pt-6">
            <div class="typewriter">
              <span>> {{ displayedText || '&nbsp;' }}</span><span class="cursor">|</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.typewriter {
  font-family: monospace;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .15em;
  animation: blink-caret .75s step-end infinite;
  min-height: 1.2em; 
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1 }
  50% { opacity: 0 }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 80% { transform: translateX(-5px); }
  40%, 60% { transform: translateX(5px); }
}

.shake {
  animation: shake 0.3s ease-in-out;
}

@keyframes fullScreenShake {
  0% {
    transform: scale(1) translate(0, 0);
  }
  50% {
    transform: scale(5) translate(0, 0) rotate(10deg);
  }
  60% {
    transform: scale(1.2) translate(10px, 0) rotate(-10deg);
  }
  70% {
    transform: scale(1.5) translate(-10px, 0) rotate(10deg);
  }
  100% {
    transform: scale(1) translate(0, 0);
  }
}

.fullscreen {
  animation: fullScreenShake 3s ease forwards;
}

.dismiss {
  animation: dismissEffect 0.8s ease-in-out forwards;
}

@keyframes dismissEffect {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.5); opacity: 0; }
}
</style>