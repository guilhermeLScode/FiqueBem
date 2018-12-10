import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Mapa from "./components/Mapa.vue";
import Habitos from "./components/Habitos.vue";
import Revista from "./components/Revista.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/mapa',
      name: 'Mapa',
      component: Mapa,
    },
    {
      path: '/psicotropedia',
      name: 'Revista',
      component: Revista,
    },
    {
      path: '/habitos',
      name: 'Habitos',
      component: Habitos,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
