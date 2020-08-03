<template>

    <v-toolbar fixed color="white">
        <v-toolbar-title>
            <router-link class="site-logo" to="./" v-show="true">
                <img src="https://i.imgur.com/gf3pl49.png" alt="">
            </router-link>

        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down8">
            <v-btn flat v-if="!isOnBasepage" to="/">Home</v-btn>
            <v-btn flat to="./team">Team</v-btn>
            <v-btn flat to="./projects">Projects</v-btn>
            <v-btn flat to="./contact">Contact</v-btn>
        </v-toolbar-items>


    </v-toolbar>




</template>

<script>

    export default {
        name: 'MainHeader',
        computed: {
          isOnBasepage(){
              console.log("pathname",this.$route )
              return this.$route.path == "/"
          }
        }
    }
</script>

<style scoped lang="scss">
    img {
        width: 150px;
    }


</style>

