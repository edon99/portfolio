<script setup>
// device: 'none' | 'browser' | 'laptop' | 'laptop-dark' | 'tablet' | 'phone' | 'phone-punch'
defineProps({
  src: String,
  alt: String,
  device: { type: String, default: 'none' },
});
</script>

<template>
  <!-- Browser window -->
  <div v-if="device === 'browser'" class="browser">
    <div class="browser-bar">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span class="url"></span>
    </div>
    <img :src="src" :alt="alt" class="browser-screen" />
  </div>

  <!-- Laptop (silver) / Laptop dark -->
  <div
    v-else-if="device === 'laptop' || device === 'laptop-dark'"
    class="laptop"
    :class="{ 'laptop--dark': device === 'laptop-dark' }"
  >
    <div class="laptop-screen">
      <img :src="src" :alt="alt" />
    </div>
    <div class="laptop-base"></div>
  </div>

  <!-- Tablet -->
  <div v-else-if="device === 'tablet'" class="device-center">
    <div class="tablet">
      <img :src="src" :alt="alt" class="tablet-screen" />
    </div>
  </div>

  <!-- Phone (notch) / Phone (punch-hole) -->
  <div v-else-if="device === 'phone' || device === 'phone-punch'" class="device-center">
    <div class="phone">
      <div v-if="device === 'phone'" class="phone-notch"></div>
      <div v-else class="phone-punch"></div>
      <img :src="src" :alt="alt" class="phone-screen" />
    </div>
  </div>

  <!-- No frame -->
  <img v-else :src="src" :alt="alt" class="w-full max-w-xl mx-auto" />
</template>

<style scoped>
.device-center {
  display: flex;
  justify-content: center;
}

/* Browser */
.browser {
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #2a2a2a;
  box-shadow: 0 20px 45px -15px rgba(0, 0, 0, 0.6);
}
.browser-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1f1f1f;
  padding: 10px 14px;
}
.browser-bar .dot {
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  display: inline-block;
}
.dot.red { background: #ff5f57; }
.dot.yellow { background: #febc2e; }
.dot.green { background: #28c840; }
.browser-bar .url {
  flex: 1;
  height: 18px;
  margin-left: 10px;
  background: #2e2e2e;
  border-radius: 9999px;
}
.browser-screen {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
}

/* Laptop */
.laptop {
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
}
.laptop-screen {
  background: #0b0b0b;
  border: 2px solid #2a2a2a;
  border-radius: 14px;
  padding: 10px;
  box-shadow: 0 20px 45px -15px rgba(0, 0, 0, 0.6);
}
.laptop-screen img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top center;
  border-radius: 4px;
}
.laptop-base {
  position: relative;
  width: 114%;
  margin: 0 -7%;
  height: 16px;
  background: linear-gradient(#e5e7eb, #9ca3af);
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.5);
}
.laptop-base::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 18%;
  height: 7px;
  background: #6b7280;
  border-radius: 0 0 8px 8px;
}
/* Dark variant */
.laptop--dark .laptop-base {
  background: linear-gradient(#3a3a3a, #1c1c1c);
}
.laptop--dark .laptop-base::after {
  background: #000;
}

/* Tablet */
.tablet {
  width: 360px;
  max-width: 85%;
  background: #0b0b0b;
  border: 12px solid #1f1f1f;
  border-radius: 26px;
  padding: 6px;
  box-shadow: 0 20px 45px -15px rgba(0, 0, 0, 0.6);
}
.tablet-screen {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: top center;
  border-radius: 12px;
}

/* Phone */
.phone {
  position: relative;
  width: 250px;
  max-width: 70%;
  background: #0b0b0b;
  border: 10px solid #1f1f1f;
  border-radius: 38px;
  padding: 6px;
  box-shadow: 0 20px 45px -15px rgba(0, 0, 0, 0.6);
}
.phone-screen {
  display: block;
  width: 100%;
  aspect-ratio: 9 / 19.5;
  object-fit: cover;
  object-position: top center;
  border-radius: 26px;
}
.phone-notch {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 18px;
  background: #1f1f1f;
  border-radius: 0 0 12px 12px;
  z-index: 2;
}
.phone-punch {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: #000;
  border-radius: 9999px;
  z-index: 2;
}
</style>
