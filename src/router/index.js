// Imports
import Vue from "vue";
import Router from "vue-router";
import { trailingSlash } from "@/util/helpers";
import { layout, route } from "@/util/routes";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return { x: 0, y: 0 };
  },
  routes: [
    layout("Default", [
      route("Dashboard"),

      // Pages
      route("BeluvTvPage", null, "/play"),
      route("ReviewPage", null, "/review"),
    ]),
  ],
});

router.beforeEach((to, from, next) => {
  return to.path.endsWith("/") ? next() : next(trailingSlash(to.path));
});

export default router;
