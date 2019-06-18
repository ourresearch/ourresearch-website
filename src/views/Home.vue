<template>
    <div class="home">


        <section class="top">
            <v-container style="height: 90vh;">
                <v-layout fill-height align-center justify-center>


                    <v-flex xs12 sm6>


                        <v-img class="main" src="https://i.imgur.com/hQEffrN.png" alt=""></v-img>
                        <div class="headline pt-5 text-xs-center">
                            We build digital tools to make scholarly research more open, connected, and reusable&mdash;for
                            everyone.

                        </div>
                    </v-flex>

                </v-layout>
            </v-container>
        </section>


        <section style="padding: 50px 0 0 0;">
            <v-container fluid class="px-0 pt-0 pb-2" style="background:#eee;">
                <v-layout row align-center class="py-4">
                    <v-flex class="text-xs-center display-1 font-weight-light ">These are our values:
                    </v-flex>
                </v-layout>
                <v-layout fill-height row v-bind="valuesLayout">
                    <v-flex xs12 v-for="value in values">
                        <div class="my-card px-3 py-5 white--text" :style="{background: value.color}">
                            <v-layout class="pb-3" fill-height align-center>
                                <v-flex shrink class="pr-3">
                                    <img :src="getImgUrl(value.img)" style="height: 50px;">
                                </v-flex>
                                <v-flex class="headline">
                                    {{value.name}}

                                </v-flex>
                            </v-layout>
                            <div class="pb-5">
                                {{value.text}}
                            </div>

                        </div>

                    </v-flex>
                </v-layout>


            </v-container>

        </section>

        <section>


            <v-container class="py-5" >


                <v-layout row align-center>
                    <v-flex class="display-2 text-xs-center">This is what we build:</v-flex>
                </v-layout>
                <v-container fluid grid-list-lg>
                    <v-layout wrap justify-center>

                        <v-flex class="my-card" xs12 sm4 v-for="project in projects">
                            <v-layout class="header">
                                <v-flex>
                                    <img :src="getImgUrl('logos/' + project.id + '.png')" style="height: 50px;" >
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <div>
                                    {{project.name}}
                                </div>
                            </v-layout>
                            <div class="body">

                            </div>
                        </v-flex>






                    </v-layout>

                </v-container>

            </v-container>
        </section>


        <section style="height: 100vh">

        </section>


    </div>
</template>

<script>
    import {projectsList} from "../data/projectDescriptions";
    import {valuesList} from "../data/valueDescriptions";


    export default {
        name: 'home',
        data: () => ({
            projects: projectsList,
            values: valuesList,
        }),
        computed: {
            valuesLayout() {
                const ret = {}
                if (!this.$vuetify.breakpoint.mdAndUp) ret.wrap = true
                return ret
            }
        },
        methods: {
            getImgUrl(pic) {
                if (pic){
                    let url = "../assets/" + pic
                    console.log("getting this", url)
                    return require('../assets/' + pic)
                }
            }
        }
    }
</script>


<style scoped lang="scss">

    div.home {
        .value-name {
            img {
                height: 30px;
            }
        }

    }


</style>
