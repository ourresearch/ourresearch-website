<template>
      <v-card  width="200" class="mr-6 mb-6">
        <v-img :src="person.img" alt="" height="200px"/>
        <v-card-title>
          {{ person.name }}
        </v-card-title>
        <v-card-subtitle>
          {{ person.title }}
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer/>
          <v-dialog v-model="dialogIsOpen" width="400">
            <template v-slot:activator="{on, attrs}">
              <v-btn
                  text
                  v-bind="attrs"
                  v-on="on"
              >
                more
              </v-btn>
            </template>
            <v-card class="">
              <v-card-actions>
                  <v-spacer></v-spacer>
                <v-btn icon @click="dialogIsOpen=false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-actions>
              <div class="d-flex flex-column align-center ">
              <v-avatar height="200" width="200">
              <v-img :src="person.img" alt="" />

              </v-avatar>
              <v-card-title>
                {{ person.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ person.title }}
              </v-card-subtitle>

              </div>
              <div v-html="person.bio" class="px-5"></div>
              <ul v-if="person.links" class="ml-6 py-3">
                <li v-for="link in person.links">
                  <a :href="link.href">{{ link.anchor }}</a>
                </li>

              </ul>

              <v-card-actions class="">
                <v-btn text @click="dialogIsOpen=false">Close</v-btn>
              </v-card-actions>
            </v-card>

          </v-dialog>


        </v-card-actions>
      </v-card>
</template>
<script>

export default {
  name: "About",
  props: {
    person: Object,
  },
  data: () => ({
    dialogIsOpen: false,
  }),
  metaInfo() {
    return {
      title: "PersonCard"
    }
  },
}
</script>
<style lang="scss">

</style>