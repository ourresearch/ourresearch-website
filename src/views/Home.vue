<template>
  <div>
    <div class="top-screen d-flex flex-column justify-center align-center">
      <v-img
          alt="OurResearch Logo"
          class="shrink mr-2 top-screen-img"
          contain
          src="@/assets/logos/ourresearch-logo-icon.png"
          transition="scale-transition"
      />
      <v-container class="top-screen-text elevation-3">
        <div class="text-h2 " style="line-height: 1.3;">
          We make tools that make <br> research more open.
        </div>
        <div class="pt-6 text-h5">
          Our open-source tools are used by millions every day, in universities, businesses, and libraries
          worldwide, to uncover, connect, and analyze research products.
        </div>
      </v-container>
    </div>

    <v-card class="values-section" flat dark tile color="#333" id="values">
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
    <v-container class="projects-section" id="projects">
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
.top-screen {
  min-height: 90vh;
  background-image: url(../assets/logos/ourresearch-logo-icon.png);
  background-position: 0% 50%;
  .top-screen-img {
    position: absolute;
    z-index: 1;
    display: none;
  }
  .top-screen-text{
    padding: 40px;
    background: rgba(255, 255, 255, .9);
    border-radius: 3px;
    //border: 1px solid #555;
  }
}

</style>
