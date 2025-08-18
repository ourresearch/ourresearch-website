import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Accessibility from "../views/Accessibility";
import Transparency from "../views/Transparency";
import Projects from "../views/Projects";
import Policies from "../views/Policies";
import WaldenQA from "../views/WaldenQA";
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {path: '/about', redirect: "/team"},
    {path: '/accessibility', component: Accessibility},
    {path: '/transparency', component: Transparency},
    {path: '/policies', component: Policies},
    {path: '/projects', component: Projects},
    {
        path: '/team',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {path: "/qa/walden", component: WaldenQA},
]

const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) {
            return goTo(to.hash, {
                offset: 75,
            });
        } else if (savedPosition) {
            return savedPosition;
        }
        else {
            return {x: 0, y: 0};
        }

    },
})


export default router;
