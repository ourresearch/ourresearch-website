<template>

    <v-container grid-list-xl>
        <v-layout>
            <h1 class="display-1 py-5">Team</h1>
        </v-layout>

        <v-layout wrap>
            <v-flex xs12>
                <v-card flat>
                    <v-layout row align-center>
                        <v-flex xs2>
                            <v-img
                                    src="https://i.imgur.com/eIhbvLm.png"
                                    aspect-ratio="1"
                            ></v-img>
                        </v-flex>
                        <v-flex xs10>
                            <v-card-title>
                                <div>
                                    <div class="headline">Heather Piwowar</div>
                                    <div>Co-founder</div>
                                    <div>
                                        <a href="https://twitter.com/researchremix">Twitter</a>
                                        |
                                        <a href="https://scholar.google.ca/citations?user=1YLq0XMAAAAJ&hl=en">Google Scholar</a>
                                        |
                                        <a href="https://docs.google.com/document/d/1S7aKmG_l3wJxAc4lb5gJYMwNVDnAT7HlQWcaXADwA1s/edit#">speaker bio</a>
                                    </div>
                                    <div class="body">
                                        A longtime advocate for Open Science, Dr. Heather Piwowar is also a leading researcher in research data availability and reuse, including a seminal paper measuring the citation benefit of publicly available research data.  Dr Piwowar has a bachelor’s and master’s degree from MIT in electrical engineering, 10 years of experience as a software engineer, and a Ph.D. in Biomedical Informatics.
                                    </div>
                                </div>
                            </v-card-title>

                        </v-flex>
                    </v-layout>

                </v-card>
            </v-flex>


            <!-- JASON -->
            <v-flex xs12>
                <v-card flat>
                    <v-layout align-center>
                        <v-flex xs2>
                            <v-img
                                    src="https://i.imgur.com/DjocEJI.png"
                                    aspect-ratio="1"
                            ></v-img>
                        </v-flex>
                        <v-flex xs10>
                            <v-card-title>
                                <div>
                                    <div class="headline">Jason Priem</div>
                                    <div>Co-founder</div>
                                    <div>
                                        <a href="https://twitter.com/jasonpriem">Twitter</a>
                                        |
                                        <a href="https://scholar.google.ca/citations?user=w32jC0YAAAAJ&hl=en">Google Scholar</a>
                                        |
                                        <a href="https://docs.google.com/document/d/1SkUuOYrpfUF-LC7aC1sBa_phG-_qN-f3hkL9fMooTm4/edit#">speaker bio</a>
                                    </div>
                                    <div class="body">
                                        As an Information Science PhD student at the University of North Carolina at Chapel Hill, Jason helped create the field of altmetrics--coining the term, authoring the influential Altmetrics Manifesto, and convening the first altmetrics workshops. He holds a BA in history and MEd in education, both from the University of Florida.
                                    </div>
                                </div>
                            </v-card-title>

                        </v-flex>
                    </v-layout>

                </v-card>
            </v-flex>

            <!-- RICHARD -->
            <v-flex xs12>
                <v-card flat>
                    <v-layout align-center>
                        <v-flex xs2>
                            <v-img
                                    src="https://i.imgur.com/N9WkG2x.png"
                                    aspect-ratio="1"
                            ></v-img>
                        </v-flex>
                        <v-flex xs10>
                            <v-card-title>
                                <div>
                                    <div class="headline">Richard Orr</div>
                                    <div>Lead developer, Unpaywall</div>
                                    <div>
                                        <a href="https://twitter.com/unpaywall_dev">Twitter</a>
                                    </div>
                                    <div class="body">
                                        Richard is a man of few words. He holds a BS in Computer Engineering from the University of Florida.
                                    </div>
                                </div>
                            </v-card-title>

                        </v-flex>
                    </v-layout>

                </v-card>
            </v-flex>


        </v-layout>


    </v-container>


</template>

<script>
    export default {
        name: "Team"
    }
</script>

<style scoped>

</style>