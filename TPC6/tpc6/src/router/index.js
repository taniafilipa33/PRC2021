import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/pubs",
    name: "Pubs",
    component: () => import(/* webpackChunkName: "pubs" */ "../views/Pubs.vue"),
  },
  {
    path: "/pubs/:idPub",
    name: "Pub",
    component: () => import(/* webpackChunkName: "pub" */ "../views/Pub.vue"),
  },
  {
    path: "/auts",
    name: "Auts",
    component: () =>
      import(/* webpackChunkName: "authors" */ "../views/Auts.vue"),
  },
  {
    path: "/auts/:idAut",
    name: "Aut",
    component: () =>
      import(/* webpackChunkName: "author" */ "../views/Aut.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
