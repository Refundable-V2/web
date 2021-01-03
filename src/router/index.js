import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: { pathing: "base" }
  },
  {
    path: "/viewer",
    name: "Viewer",
    component: Home,
    props: route => ({ query: route.query.uid })
  }
];
/*
{
    path: "*",
    name: "NotFound",
    component: NotFound
  }
*/
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
