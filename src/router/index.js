import { createRouter, createWebHistory } from 'vue-router'

import HomeVue from '../views/Home.vue'
import ProjectsVue from '../views/Projects.vue'
import DevVue from '../views/projects/DevProjects.vue'
import MobileVue from '../views/projects/MobileProjects.vue'
import VideoEditingVue from '../views/projects/VideoEditingProjects.vue'
import ResumeVue from '../views/Resume.vue'

import AdminLayout from '../admin/AdminLayout.vue'
import AdminLogin from '../admin/AdminLogin.vue'
import AdminProjects from '../admin/AdminProjects.vue'
import AdminProjectEdit from '../admin/AdminProjectEdit.vue'
import AdminResume from '../admin/AdminResume.vue'

import { useAuth } from '../lib/useAuth'

const routes = [
  { path: '/', component: HomeVue },
  { path: '/projects', component: ProjectsVue },
  { path: '/projects/Dev', component: DevVue },
  { path: '/projects/mobile', component: MobileVue },
  { path: '/projects/video-editing', component: VideoEditingVue },
  { path: '/resume', component: ResumeVue },

  { path: '/admin/login', component: AdminLogin },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: AdminProjects },
      { path: 'projects/new', component: AdminProjectEdit },
      { path: 'projects/:id', component: AdminProjectEdit },
      { path: 'resume', component: AdminResume },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true

  const { session, waitForReady } = useAuth()
  await waitForReady()

  if (!session.value) {
    return { path: '/admin/login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
