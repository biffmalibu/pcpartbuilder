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
    path: "/psus",
    name: "psus",
    component: () => import("./components/PSUList")
  },
  {
    path: "/psus/:id",
    name: "psu-details",
    component: () => import("./components/PSU")
  },
  {
    path: "/gpus",
    name: "gpus",
    component: () => import("./components/GPUList")
  },
  {
    path: "/gpus/:id",
    name: "gpu-details",
    component: () => import("./components/GPU")
  },
  {
    path: "/coolers",
    name: "coolers",
    component: () => import("./components/CPUCoolerList")
  },
  {
    path: "/coolers/:id",
    name: "cooler-details",
    component: () => import("./components/CPUCooler")
  },
  {
    path: "/cases",
    name: "cases",
    component: () => import("./components/CaseList")
  },
  {
    path: "/cases/:id",
    name: "case-details",
    component: () => import("./components/Case")
  },
  {
    path: "/memory",
    name: "memory",
    component: () => import("./components/MemoryList")
  },
  {
    path: "/memory/:id",
    name: "memory-details",
    component: () => import("./components/Memory")
  },
  {
    path: "/motherboards",
    name: "motherboards",
    component: () => import("./components/MotherboardList")
  },
  {
    path: "/motherboards/:id",
    name: "motherboard-details",
    component: () => import("./components/Motherboard")
  },
  {
    path: "/storage",
    name: "storage",
    component: () => import("./components/StorageList")
  },
  {
    path: "/storage/:id",
    name: "storage-details",
    component: () => import("./components/Storage")
  },
  {
    path: "/selfbuilder",
    name: "selfbuilder",
    component: () => import("./components/SelfBuilder")
  },
  {
    path: "/autobuilder",
    name: "autobuilder",
    component: () => import("./components/AutoBuilder")
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