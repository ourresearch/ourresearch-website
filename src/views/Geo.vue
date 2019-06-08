<template>
    <v-flex class="root">
        <v-container class="grid-list-lg">
            <v-layout>
                <v-flex>
                    <v-card flat>
                        <v-card-title class="title pb-0 mb-0">
                            OA Type
                        </v-card-title>
                        <v-card-text>

                            <v-checkbox
                                    v-for="choice in search.userInputs.oa.choices"
                                    :key="choice"
                                    class="ma-0 py-1"
                                    hide-details
                                    v-model="search.userInputs.oa.selected"
                                    :label="choice"
                                    :value="choice"
                            ></v-checkbox>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex>
                    <v-card flat>
                        <v-card-title class="title pb-0 mb-0">
                            Year
                        </v-card-title>
                        <v-card-text>
                            <span @click="search.decrementYear()"><-</span>
                            <span class="headline">{{search.userInputs.year.selected}}</span>
                            <span @click="search.incrementYear()">-></span>


                            <v-radio-group v-if="false" class="ma-0" v-model="search.userInputs.year.selected">
                                <v-radio
                                        v-for="choice in search.userInputs.year.choices"
                                        :key="choice"
                                        :label="choice"
                                        :value="choice"
                                ></v-radio>
                            </v-radio-group>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex>
                    <v-card flat>
                        <v-card-title class="title pb-0 mb-0">
                            Grouping
                        </v-card-title>
                        <v-card-text>
                            <v-radio-group class="ma-0" v-model="search.userInputs.geoType.selected">
                                <v-radio
                                        v-for="choice in search.userInputs.geoType.choices"
                                        :key="choice"
                                        :label="choice"
                                        :value="choice"
                                ></v-radio>
                            </v-radio-group>


                        </v-card-text>
                    </v-card>

                </v-flex>
            </v-layout>

            <v-layout>
                <v-flex>
                    <v-tabs v-model="selectedTab">

                        <v-tab key="0">Map</v-tab>
                        <v-tab key="1">List</v-tab>
                    </v-tabs>

                    <div v-show="selectedTab===0">
                        <div id="map-container"></div>
                    </div>

                    <div v-show="selectedTab===1">
                        <div v-for="geo in geos" class="py-1">
                            <v-layout>
                                <v-flex v-if="geo.iso2" shrink>
                                    <flag :squared="false" :iso="geo.iso2"></flag>
                                </v-flex>
                                <v-flex grow class="px-2">
                                    <div class="name">
                                        {{ geo.name }}
                                    </div>
                                    <div class="stats body-1">
                                        {{ geo.num_distinct_articles }} articles
                                        <div class="perc-global" v-show="geo.percentGlobal > 1">
                                            {{ geo.percentGlobal }}% of global output

                                        </div>
                                    </div>
                                </v-flex>
                                <v-flex shrink class="oa-value">
                                    <v-layout>
                                        <v-flex class="headline">
                                            {{ geo.percentOa }}
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </div>
                    </div>


                </v-flex>


            </v-layout>


        </v-container>


    </v-flex>


</template>

<script>
    import {search} from "../search"
    import {datamap} from "../datamap"
    import * as d3 from 'd3'



    export default {
        name: "Geo",
        data: () => ({
            error: null,
            search: search,
            selectedTab: 0,
            dialogs: {
                subscribe: {
                    show: false,
                    email: null
                }
            },
            snackbar: {
                text: "",
                show: false
            },
        }),
        components: {},
        computed: {
            apiUrl() {
                return search.apiQueryUrl()
            },
            geos() {
                return search.getProcessedResults()
            },
            geosDict() {
                let ret = {}
                this.geos.forEach(geo => {
                    ret[geo.id] = geo
                })
                return ret
            }
        },
        methods: {},
        mounted() {
            search.setUserInputsFromUrl(this.$route.query)
            search.fetchResults()
            datamap.draw(this.$router)
        },
        watch: {
            // when *any* user input changes, update the URL
            "search.userInputs": {
                handler: function () {
                    this.$router.push({
                        query: search.getUserInputsForUrl()
                    });
                },
                deep: true
            },
            "geos": function (to) {
                if (to.length) {
                    datamap.update(this.geosDict)
                }
            },
            "selectedTab": function (to, from) {
                if (to === 0) { // map tab
                    console.log("changed to map tab", to)
                    let that = this
                    // setTimeout(function(){
                    //     drawMap(that.$router, that.geosDict)
                    // })

                } else {
                    console.log("changed to list tab", to)
                    // deleteMap()
                }
            }

        }

    }
</script>

<style lang="scss">
    #map-container {
        position: relative;
        width: 1000px;
        width: 100%;
        height: 500px;
        


    }
    .datamaps-subunit {
        cursor: pointer !important;
    }

    .oa-value {

    }


</style>















