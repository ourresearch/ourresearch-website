<template>
    <div class="home">


        <v-container>
            <div class=" pl-1">
                <h1 class="display-1">Our projects</h1>
                <div>Since 2011, we've been building and maintaining open-source, open-data tools to help power the <a
                        href="https://en.wikipedia.org/wiki/Open_science">Open Science</a> revolution:
                </div>

            </div>
        </v-container>


        <v-container class="grid-list-xl">
            <v-layout column>
                <v-flex
                        v-for="project in projects"
                        :key="'tab-item'+project.id"
                        :id="project.id"
                        class="py-5 mb-5"
                        style="border-bottom: 5px solid #fafafa"
                >

                    <v-card flat>
                        <v-card-text>
                            <v-layout align-flex-start>
                                <v-flex class="pa-0 pb-2">
                                    <img :src="getImgUrl('logos/' + project.id + '.png')"
                                         :style="{height: '40px'}">
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-flex shrink class="body-1">
                                                <span v-show="!project.datesActive[1]">
                                                    <strong>Active</strong>
                                                    (started {{project.datesActive[0]}})
                                                </span>

                                    <span v-show="project.datesActive[1]">
                                                    <strong>Concluded</strong>
                                                    ({{project.datesActive[0]}}&ndash;{{project.datesActive[1]}})
                                                </span>
                                </v-flex>
                            </v-layout>

                            <v-layout class="pb-4">
                                <div class="headline">
                                    {{ project.description }}.
                                </div>
                            </v-layout>


                            <v-layout>
                                <v-flex xs5 class=" pr-4" hidden-sm-and-down>
                                    <v-img :src="project.screenshot" style="border: 1px solid #555"></v-img>
                                </v-flex>

                                <v-flex sm7>
                                    <v-container>
                                        <v-layout>
                                            <div>
                                                <div>
                                                    <em>Goal:</em> {{project.goal}}.
                                                </div>
                                                <div>
                                                    <em>Funded by:</em> {{project.funders.map(x=>x.name).join(', ')}}
                                                </div>


                                                <!--                                                <div>-->
                                                <!--                                                    <a :href="project.url">{{project.url.replace('https://', '').replace('http://','')}}</a>-->
                                                <!--                                                </div>-->

                                            </div>

                                        </v-layout>

                                        <v-layout class="">
                                            <div>
                                                <div>
                                                    <em>
                                                    Read more:
                                                    </em>
                                                </div>
                                                <div>
                                                    <ul>

                                                        <li v-for="coverageItem in project.press" class="pb-2" style="line-height: 1.2; font-size:80%;">
                                                            <div>
                                                                "{{coverageItem.title}}"
                                                            </div>
                                                            <div>
                                                                <a :href="coverageItem.link" class="">
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

                                        <v-layout class="pt-5">
                                            <v-btn :href="project.url" depressed color="primary">
                                                <div>
                                                    <i class="fas fa-desktop pr-1"></i>  website
                                                </div>
                                            </v-btn>
                                            <v-btn :href="project.apiUrl" depressed >
                                                <div>
                                                    <i class="fas fa-cogs pr-1"></i> open api
                                                </div>

                                            </v-btn>
                                            <v-btn :href="project.githubUrl" depressed >
                                                <div>
                                                    <i class="fab fa-github pr-1"></i> open source
                                                </div>
                                            </v-btn>
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
        computed: {},
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
