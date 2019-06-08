<template>

    <v-toolbar flat color="white">
        <v-toolbar-title>
            <a class="site-logo" href="/search">
                <img src="https://i.imgur.com/hp1oH5u.png" alt="">
            </a>

        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn flat>Values</v-btn>
            <v-btn flat>Projects</v-btn>
            <v-btn flat>Team</v-btn>
            <v-btn flat>Press</v-btn>
        </v-toolbar-items>


    </v-toolbar>




</template>

<script>

    export default {
        name: 'MainHeader',
        computed: {
          isOnBasepage(){
              return window.location.pathname == "/"
          }
        }
    }
</script>

<style scoped lang="scss">
    img {
        width: 200px;
    }
    .main-header {
        /*padding: 10px;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*.logo {*/
        /*    margin-right: 20px;*/
        /*}*/
    }


</style>

