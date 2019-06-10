<template>
    <div class="home">


        <section class="top">
            <v-container style="height: 90vh;">
                <v-layout fill-height align-center justify-center>


                    <v-flex xs12 sm6>


                                <v-img  class="main" src="https://i.imgur.com/hQEffrN.png" alt=""></v-img>
                        <div class="headline pt-5 text-xs-center">
                                We build digital tools to make scholarly research more open, connected, and reusable&mdash;for everyone.

                        </div>
                    </v-flex>

                </v-layout>
            </v-container>
        </section>



        <section style="background: #333; padding: 50px 0;">
            <v-container>
                <v-layout row align-center class="pb-4">
                        <v-flex class="display-2 text-xs-center white--text">These are our values:</v-flex>
                </v-layout>
                <v-container fluid grid-list-lg>
                    <v-layout wrap  justify-center>
                        <v-flex sm12 md4 v-for="value in values">
                            <v-card flat dark :color="value.color">
                                <v-card-title class="pb-0">
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
                <v-flex class="display-2 text-xs-center">This is what we build:</v-flex>
            </v-layout>
            <v-container fluid grid-list-lg>
                <v-layout wrap justify-center>
                    <v-flex sm12 md3>
                        <v-card >
                            <v-img src="https://i.imgur.com/05HieLu.png"></v-img>
                            <v-card-text>Lorem ipsum dolor amet pok pok normcore seitan umami, pickled freegan iceland asymmetrical crucifix jianbing.</v-card-text>
                        </v-card>

                    </v-flex>


                    <v-flex sm12 md3>
                        <v-card >
                            <v-img src="https://i.imgur.com/xLwYhap.png"></v-img>
                            <v-card-text>Lorem ipsum dolor amet pok pok normcore seitan umami, pickled freegan iceland asymmetrical crucifix jianbing.</v-card-text>

                        </v-card>

                    </v-flex>

                    <v-flex sm12 md3>
                        <v-card >
                            <v-img src="https://i.imgur.com/4WLDRPI.png"></v-img>
                            <v-card-text>Lorem ipsum dolor amet pok pok normcore seitan umami, pickled freegan iceland asymmetrical crucifix jianbing.</v-card-text>

                        </v-card>
                    </v-flex>

                    <v-flex sm12 md3>
                        <v-card >
                            <v-img src="https://i.imgur.com/xFLO2H5.png"></v-img>
                            <v-card-text>Lorem ipsum dolor amet pok pok normcore seitan umami, pickled freegan iceland asymmetrical crucifix jianbing.</v-card-text>

                        </v-card>
                    </v-flex>



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
                    text: "We work for Open: scholarly articles, datasets, metadata, and software. And we make our own code and data open, too."
                },
                {
                    name: "Progress",
                    color: "#C94430",
                    text: "We build infrastructure to power faster, more connected, web-native ways of creating knowledge. We push beyond the paper."
                },
                {
                    name: "Pragmatism",
                    color: "#419CCD",
                    text: "We'd rather build it than talk about it. We try to make what's possible, right now, and keep improving it over time."
                },
                {
                    name: "Community",
                    color: "#C84A75",
                    text: "We believe research communication infrastructure should be open, nonprofit, and responsive to the research community."
                },
                {
                    name: "Sustainability",
                    color: "#D57433",
                    text: "We're a lean, hustling, resilient nonprofit. After 8yrs, we're now 100% self-sustaining via earned revenue."
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
