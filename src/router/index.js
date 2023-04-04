import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: () =>
      import(/*webpackChunkName:HomeView */ "@/views/HomeView.vue"),
  },

  {
    path: "/destination/:slug",
    name: "DestinationDetails",

    props: true,
    component: () =>
      import(
        /* webpackChunkName:'DestinationDetails' */ "@/views/DestinationDetails.vue"
      ),
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,

        component: () =>
          import(
            /*webpackChunkName: "ExperienceDetails"*/ "@/views/ExperienceDetails"
          ),
      },
    ],

    beforeEnter(to, from, next) {
      let exists = store.destinations.find(
        (destination) => destination.slug === String(to.params.slug)
      );

      if (exists) {
        next();
      } else {
        next({ name: "notExists" });
      }
    },
  },

  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "User" */ "@/views/User.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () =>
      import(/* webpackChunkName: "Invoices" */ "@/views/Invoices"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404",
    name: "notExists",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "@/views/NotFound"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "@/views/NotFound"),
  },
];

const router = createRouter({
  mode: "history",
  linkExactActiveClass: "vue-school-active-class",
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {

          position.offset = {  y: 140 };
        }

        if (document.querySelector(to.hash)) {

          return position;
        }

        return false;
      }
    }
  },

});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
