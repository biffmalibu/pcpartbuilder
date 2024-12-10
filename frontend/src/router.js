import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    name: "home",
    component: () => import("./components/HomePage")
  },
  {
    path: "/cpus",
    name: "cpus",
    component: () => import("./components/CPUList")
  },
  {
    path: "/cpus/:id",
    name: "cpu-details",
    component: () => import("./components/CPU")
  },
  {
    path: "/selfbuilder",
    name: "selfbuilder",
    component: () => import("./components/SelfBuilder")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./components/AboutPage")
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("./components/NotFound")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;