<template>
    <v-app>
        <main-header></main-header>
        <v-content>
            <v-content>
                    <router-view></router-view>

            </v-content>
        </v-content>
        <main-footer></main-footer>
    </v-app>

</template>

<script>
    import MainHeader from './components/MainHeader'
    import MainFooter from './components/MainFooter'

    export default {
        name: 'App',
        components: {
            MainHeader,
            MainFooter
        },
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Our Research'
        }
    }
</script>

<style lang="scss">


    @import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");
    @import url("https://fonts.googleapis.com/css?family=Lato:100,300,400,700,400italic");


    html {
        &.noscroll {
            overflow: hidden !important;
        }
    }

    body {
        background: #fff;
        font-size: 18px;
        .application {
            font-family: Lato!important;
            .body-1, .body-2, .headline, .title, .display-1, .display-2, .display-3 {
                font-family: Lato!important;
            }

        }

        &.noscroll {
            overflow: hidden !important;
        }
    }

    .theme--light.application {
        background: #fff !important;
    }


</style>
