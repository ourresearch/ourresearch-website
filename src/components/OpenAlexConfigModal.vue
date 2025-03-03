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
  name: 'OpenAlexConfigModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0,
      selectedFields: [],
      selectedArrayFields: [],
      availableNestedFields: [],
      
      // All available fields from the OpenAlex API
      availableFields: [
        'id',
        'doi',
        'title',
        'display_name',
        'publication_year',
        'publication_date',
        'type',
        'type_crossref',
        'language',
        'is_retracted',
        'is_paratext',
        'has_fulltext',
        'cited_by_count',
        'apc_list',
        'apc_paid',
        'fwci',
        'citation_normalized_percentile',
        'indexed_in',
        'referenced_works_count',
        'countries_distinct_count',
        'institutions_distinct_count'
      ],
      
      availableArrayFields: [
        'authorships',
        'concepts',
        'keywords',
        'topics',
        'locations',
        'mesh',
        'grants',
        'datasets',
        'versions',
        'referenced_works',
        'related_works',
        'counts_by_year',
        'sustainable_development_goals'
      ],
      
      // Groups for nested fields
      nestedFieldGroups: [
        {
          group: 'primary_location',
          fields: [
            'is_oa',
            'landing_page_url',
            'pdf_url',
            'license',
            'license_id',
            'version',
            'is_accepted',
            'is_published'
          ]
        },
        {
          group: 'open_access',
          fields: [
            'is_oa',
            'oa_status',
            'oa_url',
            'any_repository_has_fulltext'
          ]
        },
        {
          group: 'best_oa_location',
          fields: [
            'is_oa',
            'landing_page_url',
            'pdf_url',
            'license',
            'license_id',
            'version',
            'is_accepted',
            'is_published'
          ]
        },
        {
          group: 'biblio',
          fields: [
            'volume',
            'issue',
            'first_page',
            'last_page'
          ]
        }
      ]
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.initializeFromConfig();
      }
    }
  },
  methods: {
    initializeFromConfig() {
      // Initialize flat fields
      this.selectedFields = [...this.currentConfig.fields];
      
      // Initialize array count fields
      this.selectedArrayFields = this.currentConfig.arrayCountFields.map(item => 
        typeof item === 'object' ? item.field : item
      );
      
      // Initialize nested fields
      this.availableNestedFields = this.nestedFieldGroups.map(group => {
        const configGroup = this.currentConfig.nestedFields.find(g => g.group === group.group);
        return {
          group: group.group,
          availableFields: group.fields,
          selectedFields: configGroup ? [...configGroup.fields] : []
        };
      });
    },
    
    close() {
      this.show = false;
    },
    
    save() {
      // Prepare the updated configuration
      const updatedConfig = {
        fields: [...this.selectedFields],
        arrayCountFields: this.selectedArrayFields.map(field => ({
          field,
          displayName: this.formatDisplayName(field)
        })),
        nestedFields: this.availableNestedFields
          .filter(group => group.selectedFields.length > 0)
          .map(group => ({
            group: group.group,
            fields: [...group.selectedFields]
          }))
      };
      
      // Emit the updated configuration
      this.$emit('save', updatedConfig);
      this.close();
    },
    
    formatDisplayName(field) {
      return field
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') + ' Count';
    }
  }
}
</script>

<style scoped>
.v-subheader {
  padding-left: 0;
}
</style>
