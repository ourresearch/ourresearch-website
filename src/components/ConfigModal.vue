<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title class="text-h5">
        Custom Configuration
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      
      <v-card-text>
        <p class="mb-4">Select the fields to include in the comparison:</p>
        
        <v-tabs v-model="activeTab">
          <v-tab>Flat Fields</v-tab>
          <v-tab>Nested Fields</v-tab>
          <v-tab>Array Count Fields</v-tab>
        </v-tabs>
        
        <v-tabs-items v-model="activeTab">
          <!-- Flat Fields -->
          <v-tab-item>
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="field in availableFields" :key="field">
                  <v-checkbox
                    v-model="selectedFields"
                    :label="field"
                    :value="field"
                    hide-details
                    class="my-1"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          
          <!-- Nested Fields -->
          <v-tab-item>
            <v-container fluid>
              <div v-for="(group, index) in availableNestedFields" :key="index" class="mb-4">
                <v-subheader class="font-weight-bold">{{ group.group }}</v-subheader>
                <v-row>
                  <v-col cols="12" sm="6" md="4" v-for="field in group.availableFields" :key="`${group.group}-${field}`">
                    <v-checkbox
                      v-model="group.selectedFields"
                      :label="field"
                      :value="field"
                      hide-details
                      class="my-1"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-tab-item>
          
          <!-- Array Count Fields -->
          <v-tab-item>
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="field in availableArrayFields" :key="field">
                  <v-checkbox
                    v-model="selectedArrayFields"
                    :label="field"
                    :value="field"
                    hide-details
                    class="my-1"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="close">
          Cancel
        </v-btn>
        <v-btn color="primary" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfigModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentConfig: {
      type: Object,
      required: true
    },
    configType: {
      type: String,
      required: true,
      validator: value => ['openalex', 'unpaywall'].includes(value)
    }
  },
  data() {
    return {
      activeTab: 0,
      selectedFields: [],
      selectedArrayFields: [],
      availableNestedFields: [],
      
      // Config maps for different types
      configMaps: {
        openalex: {
          availableFields: [
            'id',
            'doi',
            'title',
            'display_name',
            'publication_year',
            'publication_date',
            'type',
            'cited_by_count',
            'is_retracted',
            'is_paratext',
            'cited_by_api_url'
          ],
          availableArrayFields: [
            'authorships',
            'concepts',
            'mesh',
            'locations'
          ],
          nestedFieldGroups: [
            {
              group: 'primary_location',
              fields: [
                'source.display_name',
                'source.type',
                'source.is_oa',
                'source.is_in_doaj',
                'version',
                'license'
              ]
            },
            {
              group: 'best_oa_location',
              fields: [
                'source.display_name',
                'source.type',
                'source.is_oa',
                'source.is_in_doaj',
                'version',
                'license'
              ]
            }
          ]
        },
        unpaywall: {
          availableFields: [
            'doi',
            'doi_url',
            'title',
            'genre',
            'is_paratext',
            'published_date',
            'year',
            'journal_name',
            'journal_issns',
            'journal_issn_l',
            'journal_is_oa',
            'journal_is_in_doaj',
            'publisher',
            'is_oa',
            'oa_status',
            'has_repository_copy',
            'data_standard',
            'updated'
          ],
          availableArrayFields: [
            'z_authors',
            'oa_locations',
            'oa_locations_embargoed'
          ],
          nestedFieldGroups: [
            {
              group: 'best_oa_location',
              fields: [
                'url',
                'url_for_pdf',
                'url_for_landing_page',
                'host_type',
                'version',
                'license',
                'is_best',
                'updated'
              ]
            },
            {
              group: 'first_oa_location',
              fields: [
                'url',
                'url_for_pdf',
                'url_for_landing_page',
                'host_type',
                'version',
                'license',
                'is_best',
                'updated'
              ]
            }
          ]
        }
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    availableFields() {
      return this.configMaps[this.configType].availableFields
    },
    availableArrayFields() {
      return this.configMaps[this.configType].availableArrayFields
    },
    nestedFieldGroups() {
      return this.configMaps[this.configType].nestedFieldGroups
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.initializeFromConfig()
      }
    }
  },
  methods: {
    initializeFromConfig() {
      if (!this.currentConfig) return
      
      // Initialize flat fields
      this.selectedFields = [...this.currentConfig.fields || []]
      
      // Initialize array count fields
      this.selectedArrayFields = this.currentConfig.arrayCountFields 
        ? this.currentConfig.arrayCountFields.map(item => item.field || item)
        : []
      
      // Initialize nested fields
      this.availableNestedFields = []
      this.nestedFieldGroups.forEach(group => {
        const nestedGroup = {
          group: group.group,
          availableFields: group.fields,
          selectedFields: []
        }
        
        // Find selected nested fields for this group
        if (this.currentConfig.nestedFields) {
          const configGroup = this.currentConfig.nestedFields.find(g => g.group === group.group)
          if (configGroup) {
            nestedGroup.selectedFields = [...configGroup.fields]
          }
        }
        
        this.availableNestedFields.push(nestedGroup)
      })
    },
    
    close() {
      this.show = false
    },
    
    save() {
      const config = {
        fields: [...this.selectedFields],
        arrayCountFields: this.selectedArrayFields.map(field => ({ field })),
        nestedFields: this.availableNestedFields
          .filter(group => group.selectedFields.length > 0)
          .map(group => ({
            group: group.group,
            fields: [...group.selectedFields]
          }))
      }
      
      this.$emit('update:config', config)
      this.close()
    },
    
    formatDisplayName(field) {
      return field.split('.').pop().replace(/_/g, ' ')
    }
  }
}
</script>

<style scoped>
.v-subheader {
  height: auto;
  padding: 8px 0;
}
.v-tabs {
  margin-bottom: 16px;
}
</style>
