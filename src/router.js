import Vue from 'vue'
import Router from 'vue-router'
import Geo from './views/Geo'
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
            redirect: "/geo"
        },
        {
            path: '/faq',
            component: Faq
        },

        {
            path: '/loc/:id',
            component: Loc
        },

        {
            path: '/geo',
            name: 'geo',
            component: Geo,
            reloadOnSearch: false
        }
    ]
})
