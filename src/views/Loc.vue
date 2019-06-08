<template>
    <v-flex class="root">
        <v-container class="grid-list-lg">
            <v-layout>
                <h1 class="display-1">Welcome to {{locId}}</h1>
            </v-layout>

        </v-container>


    </v-flex>


</template>

<script>
    import {search} from "../search"


    export default {
        name: "Loc",
        data: () => ({
            locId:null,
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
        },
        methods: {},
        mounted() {
            this.locId = this.$route.params.id
        },
        watch: {

        }

    }
</script>

<style lang="scss">


</style>















