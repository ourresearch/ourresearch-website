



<template>
    <v-footer  height="auto" class="site-footer d-block pa-3">


        <div class="pb-2 pt-4 headline text-xs-center">
            <a class="mr-2" href="https://twitter.com/our_research">
                <i class="fab fa-twitter"></i>
            </a>
            <a class="mx-2" href="mailto:team@ourresearch.org">
                <i class="far fa-envelope"></i>
            </a>
            <a class="mx-2" href="https://github.com/ourresearch">
                <i class="fab fa-github"></i>
            </a>

        </div>




        <div class="text-xs-center nonprofit">
            Our Research is proud to be a 501(c)3 nonprofit.
        </div>



    </v-footer>
</template>

<script>
    export default {
        name: "MainFooter"
    }
</script>

<style scoped lang="scss">
    .v-footer {
        font-size: 14px;
        color: #777;
        .nonprofit {
            color: #999;
        }
    }
    a {
        color: #555;
        &.faq {
            text-decoration: none;
            font-weight: bold;
            font-size: 75%;
        }
    }

</style>