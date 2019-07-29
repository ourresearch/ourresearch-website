<template>
    <div class="home">


        <section class="top">
            <v-container grid-list-xl>
                <v-layout fill-height align-center justify-center class="py-5">


                    <v-flex xs12 sm8>


                        <!--                        <v-img class="main" src="https://i.imgur.com/hQEffrN.png" alt="" style="max-width:200px"></v-img>-->
                        <div class="display-2 font-weight-light">
                            We build tools to make scholarly research more open, connected, and reusable&mdash;for
                            everyone.
                        </div>

                        <div class="pt-3 tools-list">
                            Our free, open-source tools serve millions of API requests every day, and are relied on by research funders, universities, researchers, and thousands of academic libraries worldwide. Our projects include
                            <a href="https://unpaywall.org">Unpaywall,</a>
                            <a href="https://gettheresearch.org">GetTheResearch,</a>
                            <a href="https://paperbuzz.org">PaperBuzz,</a>
                            <a href="https://citeas.org">CiteAs,</a> and
                            <a href="http://depsy.org">Depsy</a>&mdash;and more are on the way :).
                        </div>

                        <div>
                            <v-btn color="primary" class="ml-0 mt-3" depressed to="./projects">
                                learn more about our projects
                            </v-btn>
                        </div>
                    </v-flex>


                </v-layout>
            </v-container>
        </section>




        <section style="padding: 50px 0 0 0;">
            <v-container fluid class="px-0 pt-0 pb-2" style="background:#333;">
                <v-layout row align-center class="py-4">
                    <v-flex class="text-xs-center display-1  white--text ">We're a nonprofit that values:
                    </v-flex>
                </v-layout>
                <hr style="opacity: .05">
                <v-layout fill-height row v-bind="valuesLayout" style="background: #333">
                    <v-flex xs12 v-for="value in values">
                        <div class="my-card px-3 py-5 white--text" :style="{background: '#333'}">
                            <v-layout class="pb-3" fill-height align-center>
                                <v-flex shrink class="pr-3">
                                    <img :src="getImgUrl('venn/' + value.img)" style="height: 50px;">
                                </v-flex>
                                <v-flex class="headline font-weight-bold" :style="{color: value.color}">
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
            activeTab: 0,
            userHasClickedAnyTab: false,
            tabCycleInterval: 3000
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
                if (pic) {
                    let url = "../assets/" + pic
                    return require('../assets/' + pic)
                }
            },
            cycleActiveTab() {
                let numProjects = this.projects.length
                if (this.activeTab + 1 < numProjects) {
                    this.activeTab += 1
                } else {
                    this.activeTab = 0
                }
            }

        },
        mounted() {

            let that = this
            let tick = function () {
                if (that.userHasClickedAnyTab) {
                    return false
                }


                console.log("tick!")
                that.cycleActiveTab()
                setTimeout(function () {
                    return tick()
                }, that.tabCycleInterval)
            }

            // setTimeout(tick, that.tabCycleInterval)

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
        .tools-list {
            a {
                margin-left: 5px;
            }
        }

    }


</style>
