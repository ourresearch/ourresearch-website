import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Loc from './views/Loc'
import Faq from './views/Faq'

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
            path: '/faq',
            component: Faq
        },

        {
            path: '/loc/:id',
            component: Loc
        }
    ]
})
