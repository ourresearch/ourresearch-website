<template>
  <div>
    <v-container>
      <div class="d-flex  justify-center flex-column"  style="min-height: 80vh;">
        <div class="text-h3 font-weight-light" style="line-height: 1.3;">
<!--          We build tools to make scholarly research more open, connected, and reusable.-->
<!--          We make tools for a more open research system.-->
          We make tools  that make research more open.
        </div>
        <div class="py-6 text-h5">
          Our free, open-source tools are used by millions every day, in universities, businessess, and libraries worldwide, to uncover, connect, and analyze research products.
        </div>
        <div class="text-h5 d-none">
          Our goal: to help research belong to all of us.
        </div>
        <div class="d-none">
          <v-btn large>See our projects</v-btn>
        </div>
      </div>
    </v-container>
      <v-card class="values-section" flat dark tile color="#333" >
        <v-container>
          <div class="text-h3">
            Our values
          </div>
          <v-divider class="my-4"/>
          <v-row>
            <v-col cols="12" md="4" v-for="value in values">
              <v-card dark color="#444" class="pa-3">
                <div class="d-flex align-center pb-3">
                  <img :src="getImgUrl('venn/' + value.img)" style="height: 50px;">
                  <div class="text-h4  pl-3" :style="{color: value.color}">
                    {{ value.name }}
                  </div>
                </div>
                <div class="pb-5">
                  {{ value.text }}
                </div>
              </v-card>

            </v-col>

          </v-row>
        </v-container>
      </v-card>
    <v-container class="projects-section">
      <div class="text-h3  mt-12">
        Our projects
      </div>
      <v-divider class="my-4"/>

      <v-row>
        <v-col
            v-for="project in projects"
            :key="'project-'+project.id"
            class="project"
            cols="12"
            md="4"
        >
          <v-card
              class="pa-3"
              :to="`/projects#${project.id}`"
          >
            <div>
              <img :src="getImgUrl('logos/' + project.id + '.png')" :style="{height: '40px'}">
            </div>
            <div>
              {{ project.description }}.

            </div>
          </v-card>
        </v-col>
      </v-row>
            <v-divider class="my-4"/>

      <v-btn x-large color="primary" class="" to="/projects">
        Learn more
      </v-btn>
    </v-container>


  </div>

</template>

<script>
import {projectsList} from "../data/projectDescriptions";
import {valuesList} from "../data/valueDescriptions";

export default {
  name: 'home',
  data: () => ({
    projects: projectsList,
    values: valuesList,
  }),
  metaInfo() {
    return {
      title: "OurResearch: Tools to make research more open",
      titleTemplate: undefined, // have to override this or it'll get the site title template
    }
  },
  computed: {
    valuesLayout() {
      const ret = {}
      if (!this.$vuetify.breakpoint.mdAndUp) ret.wrap = true
      return ret
    }
  },
  methods: {
    getImgUrl(pic) {
      if (pic) {
        return require('../assets/' + pic)
      }
    },

  },
  mounted() {
  }
}
</script>
<style lang="scss">
.values-section {
  padding: 50px 0 80px;
}
.projects-section {
  padding: 70px 0 100px;
}
</style>
