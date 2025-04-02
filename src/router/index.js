import { createRouter, createWebHistory } from 'vue-router'

import HomeVue from '../views/Home.vue'
import ProjectsVue from '../views/Projects.vue'
import DevVue from '../views/projects/DevProjects.vue'
import MobileVue from '../views/projects/MobileProjects.vue'
import VideoEditingVue from '../views/projects/VideoEditingProjects.vue'
import ResumeVue from '../views/Resume.vue'

const routes = [
  { path: '/', component: HomeVue },
  { path: '/projects', component: ProjectsVue },
  { path: '/projects/Dev', component: DevVue },
  { path: '/projects/mobile', component: MobileVue },
  { path: '/projects/video-editing', component: VideoEditingVue },
  { path: '/resume', component: ResumeVue },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router