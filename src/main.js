import { createApp } from 'vue';
import App from './App.vue'
import Vue3Marquee from 'vue3-marquee'
import'../src/style.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons'; 
import router from './router'
import {
    faLaravel,
    faPhp,
    faPython,
    faVuejs,
    faReact,
    faJs,
    faHtml5,
    faCss3Alt,
    faBootstrap,
    faGitAlt,
    faGithub,
    faJava,
    faFlutter,
    faDartLang,
    faLinkedin,
    faLinkedinIn

  } from '@fortawesome/free-brands-svg-icons';
  import{faGraduationCap,faBriefcase,faArrowUpRightFromSquare,faEnvelope, faArrowDown} from '@fortawesome/free-solid-svg-icons'

  library.add(
    faLaravel,
    faPhp,
    faPython,
    faVuejs,
    faReact,
    faJs,
    faHtml5,
    faCss3Alt,
    faBootstrap,
    faGitAlt,
    faGithub,
    faJava,
    faDatabase,
    faFlutter,
    faDartLang,
    faGraduationCap,
    faBriefcase,
    faArrowUpRightFromSquare,
    faEnvelope,
    faLinkedin,
    faLinkedinIn,
    faArrowDown
  );


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)
app.use(Vue3Marquee).mount('#app')