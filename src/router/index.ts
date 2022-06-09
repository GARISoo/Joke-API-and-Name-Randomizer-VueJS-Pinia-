import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/jokes",
      name: "jokes",
      component: () => import("../views/JokesView.vue"),
    },
    {
      path: "/jokes/:id",
      name: "joke",
      component: () => import("../views/SingleJokeView.vue"),
    },
    {
      path: "/names",
      name: "names",
      component: () => import("../views/NameView.vue"),
    },
  ],
});

export default router;
