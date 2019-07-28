<template>
    <div class="home">


        <v-container>
            <div class=" pl-3">
                <h1 class="display-1">Our projects</h1>
                <div>Updated August 2019</div>

            </div>
        </v-container>


        <v-container class="grid-list-xl">
            <v-layout column>
                <v-flex
                        v-for="project in projects"
                        :key="'tab-item'+project.id"
                        class="py-5"
                        style="border-bottom: 5px solid #fafafa"
                >

                    <v-card flat>
                        <v-card-text>
                            <v-layout>
                                <v-flex xs5 class="pt-4 mt-1 pr-4" hidden-sm-and-down>
                                    <v-img :src="project.screenshot" style="border: 1px solid #555"></v-img>
                                </v-flex>

                                <v-flex sm7>
                                    <v-container>
                                        <v-layout align-center class="body-1">
                                            <v-flex class="pa-0">
                                                <img :src="getImgUrl('logos/' + project.id + '.png')"
                                                     :style="{height: '50px'}">
                                            </v-flex>
                                            <v-spacer></v-spacer>
                                            <v-flex shrink>
                                                <span v-show="!project.datesActive[1]">
                                                    Active
                                                    (started {{project.datesActive[0]}})
                                                </span>

                                                <span v-show="project.datesActive[1]">
                                                    Concluded
                                                    ({{project.datesActive[0]}}&ndash;{{project.datesActive[1]}})
                                                </span>




                                            </v-flex>
                                        </v-layout>

                                        <v-layout>
                                            <div>
                                                <div class="headline pb-4">
                                                    {{ project.description }}.
                                                </div>
                                                <div>
                                                    <em>Goal:</em> {{project.goal}}
                                                </div>
                                                <div>
                                                    <em>Funded by:</em> {{project.funders.map(x=>x.name).join(', ')}}
                                                </div>



<!--                                                <div>-->
<!--                                                    <a :href="project.url">{{project.url.replace('https://', '').replace('http://','')}}</a>-->
<!--                                                </div>-->

                                            </div>

                                        </v-layout>

                                        <v-layout class="pt-3">
                                            <div>
                                                <div>
                                                    Press coverage
                                                </div>
                                                <div>
                                                    <ul>

                                                    <li v-for="coverageItem in project.press">
                                                        <div>
                                                                "{{coverageItem.title}}"
                                                        </div>
                                                        <div>
                                                            <a :href="coverageItem.link" class="ml-1">
                                                                {{coverageItem.source}}
                                                                <span class="body-1">
                                                                    <i class="fas fa-external-link-square-alt"></i>
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </li>
                                                    </ul>

                                                </div>

                                            </div>
                                        </v-layout>



                                    </v-container>



                                </v-flex>


                            </v-layout>




                        </v-card-text>

                    </v-card>
                </v-flex>

            </v-layout>




        </v-container>





    </div>
</template>

<script>
    import {projectsList} from "../data/projectDescriptions";
    import {valuesList} from "../data/valueDescriptions";


    export default {
        name: 'projects',
        data: () => ({
            projects: projectsList,
            tabCycleInterval: 3000
        }),
        computed: {
        },
        methods: {
            getImgUrl(pic) {
                if (pic) {
                    let url = "../assets/" + pic
                    return require('../assets/' + pic)
                }
            },

        },
        mounted() {


        }
    }
</script>


<style scoped lang="scss">



</style>
