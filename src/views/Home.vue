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


        <section style="padding: 50px 0;">
            <v-container fluid class="px-0 pt-0 pb-2" style="background:#555;">
                <v-layout row align-center class="py-4">
                    <v-flex class="text-xs-center display-1 font-weight-light white--text">These are our values:
                    </v-flex>
                </v-layout>
                <v-layout fill-height row v-bind="valuesLayout">
                    <v-flex xs12 v-for="value in values">
                        <div class="my-card px-3 py-5 white--text" :style="{background: value.color}">
                            <h3 class=" value-name  display-1 py-3">
                                <img :src="getImgUrl(value.img)" alt="">
                                {{value.name}}

                            </h3>
                            <div class="pb-5">
                                {{value.text}}
                            </div>

                        </div>

                    </v-flex>
                </v-layout>


            </v-container>

        </section>


        <v-container class="py-5 my-5">
            <v-layout row align-center>
                <v-flex class="display-2 text-xs-center">This is what we build:</v-flex>
            </v-layout>
            <v-container fluid grid-list-lg>
                <v-layout wrap justify-center>
                    <v-flex class="my-card" xs12 sm6>
                        <v-card>
                            <v-layout fill-height>
                                <v-flex xs4 style="background: #42a0f2">
                                    <v-container fill-height>
                                        <v-layout align-center justify-center>
                                            <div>depsy</div>
                                        </v-layout>
                                    </v-container>
                                </v-flex>
                                <v-flex xs8>
                                    Lorem ipsum dolor amet sriracha pug distillery chicharrones banh mi, next level tofu edison bulb gluten-free portland vice art party heirloom venmo chia. Locavore yuccie live-edge, green juice cold-pressed pickled mixtape taiyaki beard air plant pabst unicorn biodiesel truffaut gentrify. Single-origin coffee letterpress green juice schlitz enamel pin hot chicken kombucha celiac leggings. Swag etsy before they sold out, blog kogi chicharrones pop-up meh live-edge jean shorts portland seitan. Trust fund palo santo pug, man braid kogi craft beer bitters williamsburg kinfolk locavore hoodie.

Whatever waistcoat scenester lyft locavore thundercats. Marfa vaporware bicycle rights pinterest kogi roof party. Selfies enamel pin post-ironic twee 90's vexillologist. Before they sold out messenger bag pug, church-key austin knausgaard prism paleo man bun chillwave narwhal. Drinking vinegar scenester swag, pabst cardigan umami air plant try-hard vinyl. Affogato farm-to-table direct trade irony, wayfarers raclette seitan ramps pork belly small batch scenester.


                                </v-flex>
                            </v-layout>

                        </v-card>

                    </v-flex>






<!--                    <v-flex sm12 md3>-->
<!--                        <v-card>-->
<!--                            <v-img src="https://i.imgur.com/05HieLu.png"></v-img>-->
<!--                            <v-card-text>Lorem ipsum dolor amet pok pok normcore seitan umami, pickled freegan iceland-->
<!--                                asymmetrical crucifix jianbing.-->
<!--                            </v-card-text>-->
<!--                        </v-card>-->

<!--                    </v-flex>-->


<!--                    <v-flex sm12 md3>-->
<!--                        <v-card>-->
<!--                            <v-img src="https://i.imgur.com/xLwYhap.png"></v-img>-->
<!--                            <v-card-text>Lorem ipsum dolor amet pok pok normcore seitan umami, pickled freegan iceland-->
<!--                                asymmetrical crucifix jianbing.-->
<!--                            </v-card-text>-->

<!--                        </v-card>-->

<!--                    </v-flex>-->

<!--                    <v-flex sm12 md3>-->
<!--                        <v-card>-->
<!--                            <v-img src="https://i.imgur.com/4WLDRPI.png"></v-img>-->
<!--                            <v-card-text>Lorem ipsum dolor amet pok pok normcore seitan umami, pickled freegan iceland-->
<!--                                asymmetrical crucifix jianbing.-->
<!--                            </v-card-text>-->

<!--                        </v-card>-->
<!--                    </v-flex>-->

<!--                    <v-flex sm12 md3>-->
<!--                        <v-card>-->
<!--                            <v-img src="https://i.imgur.com/xFLO2H5.png"></v-img>-->
<!--                            <v-card-text>Lorem ipsum dolor amet pok pok normcore seitan umami, pickled freegan iceland-->
<!--                                asymmetrical crucifix jianbing.-->
<!--                            </v-card-text>-->

<!--                        </v-card>-->
<!--                    </v-flex>-->


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
                    img: "white-star-top-left.png",
                    color: "#427F21",
                    text: "We work for Open: scholarly articles, datasets, metadata, and software. And we make our own code and data open, too."
                },
                {
                    name: "Progress",
                    color: "#C94430",
                    img: "white-star-top.png",
                    text: "We build infrastructure to power faster, more connected, web-native ways of creating knowledge. We push beyond the paper."
                },
                {
                    name: "Pragmatism",
                    color: "#419CCD",
                    img: "white-star-top-right.png",
                    text: "We'd rather build it than talk about it. We try to make what's possible, right now, and keep improving it over time."
                },
                {
                    name: "Sustainability",
                    color: "#D57433",
                    img: "white-star-bottom-right.png",
                    text: "We're a lean, hustling, resilient nonprofit. After 8yrs, we're now 100% self-sustaining via earned revenue."
                },
                {
                    name: "Community",
                    color: "#C84A75",
                    img: "white-star-bottom-left.png",
                    text: "We believe research communication infrastructure should be open, nonprofit, and responsive to the research community."
                },
            ]
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
                console.log("looking for", pic)
                if (pic){
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
