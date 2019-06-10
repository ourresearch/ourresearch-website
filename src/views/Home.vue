<template>
    <div class="home">


        <section class="top">
            <v-container style="height: 90vh;">
                <v-layout fill-height align-center justify-center>


                    <v-flex xs12 sm4>
                                <v-img class="main" src="https://i.imgur.com/hQEffrN.png" alt=""></v-img>
                        <div class="headline mt-3">
                                Lorem ipsum dolor amet activated charcoal fingerstache.

                        </div>
                    </v-flex>

                </v-layout>
            </v-container>
        </section>



        <section style="background: #333; padding: 50px 0;">
            <v-container>
                <v-layout row align-center>
                        <v-flex class="display-2 text-xs-center white--text">We care about:</v-flex>
                </v-layout>
                <v-container fluid grid-list-lg>
                    <v-layout wrap  justify-center>
                        <v-flex sm12 md4 v-for="value in values">
                            <v-card flat dark :color="value.color">
                                <v-card-title>
                                    <h3 class="headline">{{value.name}}</h3>
                                </v-card-title>
                                <v-card-text>
                                    {{value.text}}
                                </v-card-text>
                            </v-card>

                        </v-flex>
                    </v-layout>
                </v-container>
            </v-container>

        </section>



        <v-container class="py-5 my-5">
            <v-layout row align-center>
                <v-flex class="display-2 text-xs-center">We build:</v-flex>
            </v-layout>
            <v-container fluid grid-list-lg>
                <v-layout wrap justify-center>



                </v-layout>

            </v-container>

        </v-container>



        <section style="height: 100vh">

        </section>


    </div>
</template>

<script>


    export default {
        name: 'home',
        data: () => ({
            values: [
                {
                    name: "Openness",
                    color: "#427F21",
                    text: "We want to set the default to open for scholarly articles, datasets, metadata, and software. And so of course all our own code and data are open, too."
                },
                {
                    name: "Progress",
                    color: "#C94430",
                    text: "We want to go push beyond the traditional paper. We build infrastructure to power faster, more connected, web-native ways of creating knowledge."
                },
                {
                    name: "Pragmatism",
                    color: "#419CCD",
                    text: "The perfect is the enemy of the good. We work to build infrastructure based on what's possible, right now, and keep improving it over time."
                },
                {
                    name: "Community",
                    color: "#C84A75",
                    text: "We believe research infrastructure (tools, data, and metadata) should be open, nonprofit, and responsive to the community."
                },
                {
                    name: "Sustainability",
                    color: "#D57433",
                    text: "We're a nonprofit, but we keep a lean, startup-style mindset. We are 100% self-sustaining via earned revenue."
                },
            ]
        }),
        methods: {
        }
    }
</script>


<style scoped lang="scss">

    div.home {
        .top {
        }

    }


</style>
