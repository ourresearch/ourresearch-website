<template>
    <div class="home">


        <section class="top">
            <v-container>
                <v-layout fill-height align-center justify-center>


                    <v-flex xs12 sm6>


                        <!--                        <v-img class="main" src="https://i.imgur.com/hQEffrN.png" alt="" style="max-width:200px"></v-img>-->
                        <div class="headline pt-5 text-xs-center">
                            We build digital tools to make scholarly research more open, connected, and reusable&mdash;for
                            everyone.

                        </div>
                    </v-flex>

                </v-layout>
            </v-container>
        </section>


        <section>
            <v-tabs
                    v-model="activeTab"
            >
                <v-tab
                        v-for="project in projects"
                        @click="userHasClickedAnyTab=true"
                        :key="''+project.id"
                        ripple
                >
                    {{ project.name }}

                </v-tab>

                <v-tab-item
                        v-for="project in projects"
                        :key="'tab-item'+project.id"
                >

                    <v-card>
                        <v-card-text>
                            <v-layout class="header" align-center justify-center
                                      style="min-height: 82px">
                                <v-flex >
                                    <img :src="getImgUrl('logos/' + project.id + '.png')"
                                         :style="{width: '200px'}">
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <div>
                                    {{project.description}}
                                </div>
                            </v-layout>
                            <v-layout>
                                <div>
                                    <em>Goal:</em>
                                    <span>
                                                {{project.goal}}
                                            </span>
                                </div>
                            </v-layout>

                            <v-layout>
                                <em>Funding:</em>
                                <div class="funder" v-for="funder in project.funders">

                                </div>
                            </v-layout>


                            <v-layout>
                                <div>
                                    <div>
                                        Read coverage in
                                        <span v-for="(coverageItem, index) in project.press">
                                            <a :href="coverageItem.link">
                                                {{coverageItem.source}}

                                                <template v-if="index+1 < project.press.length">,</template>

                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </v-layout>

                        </v-card-text>

                    </v-card>


                </v-tab-item>
            </v-tabs>


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

            setTimeout(tick, that.tabCycleInterval)

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
