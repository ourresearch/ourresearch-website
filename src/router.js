import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Team from './views/Team'
import Contact from './views/Contact'
import Projects from './views/Projects'
import Accessibility from "./views/Accessibility";

import Meta from 'vue-meta'


Vue.use(Router)
Vue.use(Meta)


export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/team',
            component: Team
        },
        {
            path: '/contact',
            component: Contact
        },
        {
            path: '/accessibility',
            component: Accessibility
        },
        {
            path: '/projects',
            component: Projects
        }
    ]
})
