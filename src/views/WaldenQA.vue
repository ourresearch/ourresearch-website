<template>
  <v-container class="unpaywall-qa">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">Walden QA</h1>

        <v-card class="comparison-controls pa-3 mb-6" color="grey lighten-3" :loading="isLoading || isLoadingResults">
          <v-card-title class="text-h5 d-flex align-center">
            Comparison:
            <v-radio-group
              v-model="activeComparisonType"
              row
              class="mt-0 ml-4"
              hide-details
            >
              <v-radio
                label="OpenAlex"
                value="openalex"
                class="mr-4"
              ></v-radio>
              <v-radio
                label="Unpaywall"
                value="doi"
              ></v-radio>
            </v-radio-group>
            
            <!-- Add Custom Config button for OpenAlex -->
            <v-btn
              v-if="activeComparisonType === 'openalex'"
              color="secondary"
              text
              class="ml-4"
              @click="showCustomConfig = true"
            >
              <v-icon left>mdi-cog</v-icon>
              Custom Config
            </v-btn>
          </v-card-title>

          <v-card-text>
            <div class="d-flex align-center">
              <!-- Random Sample Section -->
              <div class="d-flex align-center">
                <div style="width: 100px" class="mr-4">
                  <v-text-field
                    v-model="sampleSize"
                    label="Sample Size"
                    type="number"
                    min="1"
                    max="100"
                    outlined
                    background-color="white"
                    hide-details
                    density="comfortable"
                  ></v-text-field>
                </div>
                <v-btn
                  color="primary"
                  :disabled="isLoading || isLoadingResults"
                  @click="fetchRandomSample(activeComparisonType)"
                  large
                >
                  Random Sample
                </v-btn>
              </div>

              <v-divider vertical class="mx-8"></v-divider>

              <v-btn
                color="primary"
                :disabled="isLoading || isLoadingResults"
                @click="showBulkDialog = true"
                large
              >
                Bulk Compare
              </v-btn>

              <v-divider vertical class="mx-8"></v-divider>

              <div class="d-flex align-center">
                <div style="width: 400px;" class="mr-4">
                  <v-text-field
                    v-model="activeComparisonType === 'doi' ? doi : openAlexId"
                    :label="activeComparisonType === 'doi' ? 'Enter DOI' : 'Enter OpenAlex ID'"
                    outlined
                    background-color="white"
                    :disabled="isLoading || isLoadingResults"
                    @keyup.enter="compare(activeComparisonType)"
                    hide-details
                    density="comfortable"
                  ></v-text-field>
                </div>
                <v-btn
                  color="primary"
                  :disabled="isLoading || isLoadingResults"
                  @click="compare(activeComparisonType)"
                  large
                >
                  Compare
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <div class="mt-6">
          <div v-if="error" class="error--text mb-6">
            {{ error }}
          </div>

          <WaldenComparisonTable 
            v-if="comparisons.length > 0"
            :comparisons="comparisons"
            :config="activeComparisonType === 'openalex' && customOpenAlexConfig ? customOpenAlexConfig : comparisonConfigs[activeComparisonType]"
          />

          <!-- Only show individual comparisons in single mode -->
          <div v-if="!isBulkComparison">
            <div v-for="comparison in comparisons" :key="comparison.id" class="mb-8">
              <div class="text-h6 mb-4">
                <template v-if="isBulkComparison">{{ index + 1 }}. </template>
                {{ formatId(comparison.id) }}
              </div>
              <div v-if="comparison.error" class="error--text mb-4">
                {{ comparison.error }}
              </div>
              <v-card v-if="comparison.primaryData && comparison.secondaryData">
                <v-tabs v-model="comparison.activeTab" @change="updateDefaultTab">
                  <v-tab :value="0">Compare</v-tab>
                  <v-tab :value="1">Inline</v-tab>
                  <v-tab :value="2">List</v-tab>
                </v-tabs>
        
                <v-card-text class="pa-0">
                  <v-window v-model="comparison.activeTab">
                    <v-window-item :value="0">
                      <div class="inline-diff-view">
                        <div class="diff-header py-2">
                          <div class="column-headers">
                            <div class="left-header">
                              <span class="deletion-dot"></span>
                              <span><a :href="`https://api.unpaywall.org/${comparison.id}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">Unpaywall<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a></span>
                            </div>
                            <div class="right-header">
                              <span class="addition-dot"></span>
                              <span><a :href="`https://api.openalex.org/unpaywall/${comparison.id}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">OpenAlex<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a></span>
                            </div>
                          </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="diff-content" v-html="comparison.sideBySideDiff"></div>
                      </div>
                    </v-window-item>

                    <v-window-item :value="1">
                      <div class="inline-diff-view">
                        <div class="diff-header py-2">
                          <div class="d-flex">
                            <div>
                              <span class="deletion-dot"></span>
                              <span class="ml-1"><a :href="`https://api.unpaywall.org/${comparison.id}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">Unpaywall<i class="v-icon mdi mdi-open-in-new" style="font-size: 16px; vertical-align: text-bottom;"></i></a></span>
                            </div>
                            <div>
                              <span class="addition-dot"></span>
                              <span class="ml-1"><a :href="`https://api.openalex.org/unpaywall/${comparison.id}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">OpenAlex<i class="v-icon mdi mdi-open-in-new" style="font-size: 16px; vertical-align: text-bottom;"></i></a></span>
                            </div>
                          </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="diff-content pa-4" v-html="comparison.inlineJsonDiff"></div>
                      </div>
                    </v-window-item>

                    <v-window-item :value="2">
                      <div class="differences-list">
                        <div class="diff-header px-4 py-2 d-flex align-center justify-space-between">
                          <div class="font-weight-bold">{{ filteredDifferences(comparison).length }} Differences</div>
                          <div class="text-caption">
                            <span class="mr-3">
                              <span class="deletion-dot"></span> <a :href="`https://api.unpaywall.org/${comparison.id}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">Unpaywall<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a>
                            </span>
                            <span>
                              <span class="addition-dot"></span> <a :href="`https://api.openalex.org/unpaywall/${comparison.id}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">OpenAlex<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a>
                            </span>
                          </div>
                        </div>
                        <v-divider></v-divider>

                        <div class="differences-content px-8 py-2">
                          <div v-for="(diff, index) in filteredDifferences(comparison)" :key="index" class="mb-4">
                            <div class="text-subtitle-1 font-weight-bold">{{ diff.path.join('.') }}</div>
                            <div class="d-flex flex-column">
                              <div class="removed pa-2">
                                {{ formatValue(diff.lhs) }}
                              </div>
                              <div class="added pa-2">
                                {{ formatValue(diff.rhs) }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-window-item>
                  </v-window>
                </v-card-text>
              </v-card>
            </div>
          </div>

          <!-- Bulk Compare Dialog -->
          <v-dialog v-model="showBulkDialog" max-width="600px">
            <v-card>
              <v-card-title>Bulk Compare {{ comparisonConfigs[activeComparisonType].name }}</v-card-title>
              <v-card-text>
                <p class="mb-4">Enter {{ comparisonConfigs[activeComparisonType].idType === 'doi' ? 'DOIs' : 'OpenAlex IDs' }} one per line or comma separated:</p>
                <v-textarea
                  v-model="bulkIds"
                  outlined
                  rows="10"
                  :disabled="isLoading"
                  background-color="white"
                ></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="showBulkDialog = false"
                  :disabled="isLoading"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  @click="compare(activeComparisonType, true)"
                  :loading="isLoading"
                  :disabled="isLoading"
                >
                  Compare
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
    
    <!-- Add the OpenAlexConfigModal component -->
    <OpenAlexConfigModal
      v-model="showCustomConfig"
      :current-config="customOpenAlexConfig"
      @save="updateCustomConfig"
    />
  </v-container>
</template>

<script>
import WaldenComparisonTable from '../components/WaldenComparisonTable.vue'
import OpenAlexConfigModal from '../components/OpenAlexConfigModal.vue'
import axios from 'axios'
import { createTwoFilesPatch } from 'diff'
import { html as diff2html } from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'  // Import at component level

export default {
  name: 'WaldenQA',
  components: {
    WaldenComparisonTable,
    OpenAlexConfigModal
  },
  data() {
    return {
      activeComparisonType: 'openalex',
      doi: '',
      openAlexId: '',
      sampleSize: 25,
      showBulkDialog: false,
      bulkIds: '',
      error: null,
      isLoading: false,
      isLoadingResults: false,
      isBulkComparison: false,
      comparisons: [],
      defaultTab: 0,
      missingDoiSummary: {
        total: 0,
        missing: []
      },
      comparisonConfigs: {
        doi: {
          name: 'DOI Comparison',
          idType: 'doi',
          sampleEndpoint: 'https://api.openalex.org/works?filter=indexed_in:crossref&sample=:sampleSize',
          endpoints: {
            primary: 'https://api.unpaywall.org/',
            secondary: 'https://api.openalex.org/unpaywall/'
          },
          labels: {
            primary: 'Unpaywall',
            secondary: 'Walden'
          },
          fields: [
            'oa_status',
          ],
          nestedFields: [
            {
              group: 'best_oa_location',
              fields: [
                'license',
                'version'
              ]
            }
          ]
        },
        openalex: {
          name: 'OpenAlex ID Comparison',
          idType: 'openalex',
          sampleEndpoint: 'https://api.openalex.org/works?sample=:sampleSize&per-page=:sampleSize&select=id',
          endpoints: {
            primary: 'https://api.openalex.org/',
            secondary: 'https://api.openalex.org/v2/'
          },
          bulkEndpoints: {
            primary: 'https://openalex-elastic-api.herokuapp.com/works-batch',
            secondary: 'https://openalex-elastic-api.herokuapp.com/v2/works-batch'
          },
          labels: {
            primary: 'Prod',
            secondary: 'Walden'
          },
          fields: [
            'title',
            'publication_year',
            'is_retracted',
            'open_access.oa_status',
            'apc_list.value_usd',
            'primary_location.source.id',
          ],
          booleanFields: [
            'primary_location.source.id'
          ],
          arrayCountFields: [
            {
              field: 'locations',
              displayName: 'locations (count)'
            },
            {
              field: 'authorships',
              displayName: 'authorships (count)'
            },
            {
              field: 'authorships.raw_affiliation_strings',
              displayName: 'affiliations (count)'
            }
          ],
          nestedFields: [],
        }
      },
      showCustomConfig: false,
      customOpenAlexConfig: {
        fields: [
          'display_name',
          'publication_year',
          'publication_date',
          'type',
          'doi',
          'language',
        ],
        arrayCountFields: [],
        nestedFields: [
          {
            group: 'primary_location',
            fields: [
              'is_oa',
              'landing_page_url',
              'pdf_url',
            ]
          },
          {
            group: 'open_access',
            fields: [
              'is_oa',
              'oa_status',
              'oa_url'
            ]
          },
          {
            group: 'best_oa_location',
            fields: [
              'landing_page_url',
              'pdf_url',
            ]
          }
        ]
      }
    }
  },
  computed: {
    inlineJsonDiff() {
      if (!this.comparisons.length) return ''
      return this.comparisons[0].inlineJsonDiff
    },
    sideBySideDiff() {
      if (!this.comparisons.length) return ''
      return this.comparisons[0].sideBySideDiff
    }
  },
  created() {
    // Initialize customOpenAlexConfig with default values
    this.initializeCustomConfig();
  },
  methods: {
    // Helper function to get nested field values, including arrays
    getFieldValue(data, fieldPath) {

      if (!data) return undefined;
      
      const parts = fieldPath.split('.');
      let value = data;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (value === null || value === undefined) {
          return undefined;
        }
        
        // If we're trying to access a property of an array, handle it specially
        if (Array.isArray(value)) {
          // For the last part of the path, return all matching values from the array
          if (i === parts.length - 1) {
            const result = value.map(item => item[part]).filter(Boolean);
            return result;
          }
          
          // For intermediate parts, collect values from all array items
          const remainingPath = parts.slice(i + 1).join('.');

          const nestedValues = [];
          
          for (const item of value) {
            if (item && item[part]) {
              const nested = this.getFieldValue(item[part], remainingPath);
              if (nested !== undefined) {
                if (Array.isArray(nested)) {
                  nestedValues.push(...nested);
                } else {
                  nestedValues.push(nested);
                }
              }
            }
          }
          return nestedValues.length > 0 ? nestedValues : undefined;
        }
        value = value[part];
      }
      
      return value;
    },
    // General method to count items in nested arrays
    countNestedArrayItems(data, fieldPath) {
      if (!data) return 0;
      
      // If the field doesn't contain a dot, it's a simple array
      if (!fieldPath.includes('.')) {
        const value = data[fieldPath];
        if (Array.isArray(value)) {
          return value.length;
        }
        return 0;
      }

      console.log(`Counting nested array items for path: ${fieldPath}`);

      // Split the path into parts
      const parts = fieldPath.split('.');
      
      // For nested arrays, the first part is the outer array, and the second part is the inner array
      const outerArrayName = parts[0];
      const innerArrayName = parts[1];
      
      const outerArray = data[outerArrayName];
      
      // If the outer array doesn't exist or isn't an array, return 0
      if (!outerArray || !Array.isArray(outerArray)) {
        console.log(`Outer array ${outerArrayName} not found or not an array`);
        return 0;
      }
      
      // Count the total number of items in all inner arrays
      let totalCount = 0;
      //debugger;
      console.log(`Outer array ${outerArrayName}:`, outerArray);
      for (const item of outerArray) {
        if (item && item[innerArrayName] !== undefined) {
          if (Array.isArray(item[innerArrayName])) {
            // If the inner field is an array, add its length
            totalCount += item[innerArrayName].length;
            console.log(`Found array ${innerArrayName} with ${item[innerArrayName].length} items`);
          } 
        }
      }
      
      console.log(`Total count for nested array ${fieldPath}: ${totalCount}`);
      return totalCount;
    },
    initializeCustomConfig() {
      // Initialize customOpenAlexConfig with the default values from comparisonConfigs
      const defaultConfig = this.comparisonConfigs.openalex;
      this.customOpenAlexConfig = {
        ...JSON.parse(JSON.stringify(defaultConfig)), // Deep copy all properties
        fields: [...defaultConfig.fields],
        arrayCountFields: [...defaultConfig.arrayCountFields],
        nestedFields: defaultConfig.nestedFields.map(group => ({
          group: group.group,
          fields: [...group.fields]
        }))
      };
    },
    getDefaultTab() {
      return parseInt(localStorage.getItem('unpaywallQaDefaultTab') || '0')
    },
    updateDefaultTab(tab) {
      localStorage.setItem('unpaywallQaDefaultTab', tab.toString())
    },
    async compare(type, isBulk = false) {
      let id = type === 'openalex' ? this.openAlexId : this.doi;
      if (!isBulk && !id) return;
      if (isBulk && !this.bulkIds) return;
      
      // Normalize DOI case if it's a DOI comparison
      if (type === 'doi') {
        id = id.toLowerCase();
      }
      
      this.error = null;
      this.isLoadingResults = true;
      this.comparisons = []; // Reset comparisons immediately
      
      try {
        if (isBulk) {
          this.isBulkComparison = true;
          const ids = this.bulkIds.split('\n').filter(id => id.trim());
          
          // Process each ID and update the UI immediately
          for (const [index, id] of ids.entries()) {
            try {
              // Normalize DOI case for bulk comparisons too
              const normalizedId = type === 'doi' ? id.trim().toLowerCase() : id.trim();
              const comparison = await this.fetchComparison(normalizedId, type);
              this.comparisons = [...this.comparisons, comparison];
              
              // Stop loading after the first comparison is loaded
              if (index === 0) {
                this.isLoadingResults = false;
              }
            } catch (err) {
              this.comparisons = [...this.comparisons, {
                id: id.trim(),
                error: err.message
              }];
              
              // Stop loading after the first comparison attempt even if it failed
              if (index === 0) {
                this.isLoadingResults = false;
              }
            }
          }
          
          this.updateMissingDoiSummary(this.comparisons);
          this.bulkIds = '';
        } else {
          this.isBulkComparison = false;
          const comparison = await this.fetchComparison(id, type);
          this.comparisons = [comparison];
          this.openAlexId = '';
          this.doi = '';
          this.isLoadingResults = false;
        }
      } catch (err) {
        this.error = err.message;
        this.isLoadingResults = false;
      } finally {
        this.showBulkDialog = false;
      }
    },
    async fetchRandomSample(type) {
      this.error = null;
      this.isLoading = true;
      
      try {
        const sampleEndpoint = this.comparisonConfigs[type].sampleEndpoint.replace(/:sampleSize/g, this.sampleSize);
        const response = await axios.get(sampleEndpoint);
        const ids = type === 'doi'
          ? response.data.results.map(result => result.doi.replace('https://doi.org/', '')).join('\n')
          : response.data.results.map(result => `works/${result.id.split('/').pop()}`).join('\n');
        
        this.bulkIds = ids;
        this.activeComparisonType = type;
        this.isLoading = false;
        this.compare(type, true);
      } catch (err) {
        this.error = `Error fetching random sample: ${err.message}`;
        this.isLoading = false;
      }
    },
    async fetchComparison(id, type) {
      const config = this.comparisonConfigs[type];
      const comparison = {
        id,
        error: null,
        primaryData: null,
        secondaryData: null,
        fullPrimaryData: null,  // Store the full API response
        fullSecondaryData: null, // Store the full API response
        activeTab: this.getDefaultTab()
      };

      try {
        // Fetch both responses
        let secondaryUrl = `${config.endpoints.secondary}${id}?email=team@ourresearch.org`;
        
        const [primaryResponse, secondaryResponse] = await Promise.all([
          axios.get(`${config.endpoints.primary}${id}?email=team@ourresearch.org`).catch(err => ({ status: err.response?.status || 500 })),
          axios.get(secondaryUrl).catch(err => ({ status: err.response?.status || 500 }))
        ]);

        // Handle responses, including potential 404s
        if (primaryResponse.data) {
          comparison.fullPrimaryData = JSON.parse(JSON.stringify(primaryResponse.data)); // Store full response
          comparison.primaryData = primaryResponse.data;
        } else {
          comparison.primaryData = { error: `API returned ${primaryResponse.status}` };
          comparison.fullPrimaryData = { error: `API returned ${primaryResponse.status}` };
        }

        if (secondaryResponse.data) {
          comparison.fullSecondaryData = JSON.parse(JSON.stringify(secondaryResponse.data)); // Store full response
          comparison.secondaryData = secondaryResponse.data;
        } else {
          comparison.secondaryData = { error: `API returned ${secondaryResponse.status}` };
          comparison.fullSecondaryData = { error: `API returned ${secondaryResponse.status}` };
        }

        // Apply the custom configuration if it's an OpenAlex comparison
        if (type === 'openalex' && this.customOpenAlexConfig) {
          this.applyCustomConfig(comparison);
        }

        // Generate diffs
        const primaryJson = JSON.stringify(comparison.primaryData, null, 2);
        const secondaryJson = JSON.stringify(comparison.secondaryData, null, 2);

        const diff = createTwoFilesPatch(
          config.labels.primary,
          config.labels.secondary,
          primaryJson,
          secondaryJson,
          '',
          '',
          { context: 3 }
        );

        const htmlOutput = diff2html(diff, {
          drawFileList: false,
          matching: 'lines',
          outputFormat: 'side-by-side'
        });

        comparison.sideBySideDiff = htmlOutput;

        const inlineHtmlOutput = diff2html(diff, {
          drawFileList: false,
          matching: 'lines',
          outputFormat: 'line-by-line'
        });

        const isTruncated = diff.length > 50000;
        const truncationMessage = `
          <div class="truncation-message" style="padding: 10px; text-align: center; color: #666;">
            Remaining content identical. 
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 8px;">
              <a href="${config.endpoints.primary}${id}?email=team@ourresearch.org" target="_blank" rel="noopener">
                ${config.labels.primary} JSON <i class="v-icon mdi mdi-open-in-new" style="font-size: 16px; vertical-align: text-bottom;"></i>
              </a>
              <a href="${config.endpoints.secondary}${id}?email=team@ourresearch.org" target="_blank" rel="noopener">
                ${config.labels.secondary} JSON <i class="v-icon mdi mdi-open-in-new" style="font-size: 16px; vertical-align: text-bottom;"></i>
              </a>
            </div>
          </div>
        `;

        comparison.inlineJsonDiff = inlineHtmlOutput + (isTruncated ? truncationMessage : '');
        comparison.sideBySideDiff = htmlOutput + (isTruncated ? truncationMessage : '');
      } catch (err) {
        comparison.error = `Error fetching data for ${config.name} ${id}: ${err.message}`;
      }

      return comparison;
    },
    updateMissingDoiSummary(comparisons) {
      const summary = {
        total: comparisons.length,
        missing: []
      };
      
      for (const comparison of comparisons) {
        if (comparison.secondaryData?.error?.includes('Not found')) {
          summary.missing.push(comparison.id);
        }
      }
      
      this.missingDoiSummary = summary;
    },
    filteredDifferences(comparison) {
      if (!comparison?.differences) return [];
      
      // If we're using the generated differences from our custom config
      if (this.activeComparisonType === 'openalex' && this.customOpenAlexConfig) {
        return comparison.differences;
      }
      
      // Group differences by their base path
      const groupedDiffs = comparison.differences.reduce((groups, diff) => {
        const basePath = diff.path[0];
        if (!groups.has(basePath)) {
          groups.set(basePath, []);
        }
        groups.get(basePath).push(diff);
        return groups;
      }, new Map());
      
      // Process each group
      return Array.from(groupedDiffs).flatMap(([basePath, diffs]) => {
        // If group is large, create a summary
        if (diffs.length > 3 && diffs.every(d => d.path[0] === basePath)) {
          const sampleDiff = diffs[0];
          const toArray = val => Array.isArray(val) ? val : 
                              typeof val === 'object' ? [val] : 
                              val ? [val] : [];
          
          return [{
            path: [basePath],
            kind: 'E',
            lhs: `[${toArray(sampleDiff.lhs).length} items]`,
            rhs: `[${toArray(sampleDiff.rhs).length} items]`,
            summary: true
          }];
        }
        
        // Otherwise return individual diffs that have actual differences
        return diffs.filter(diff => !this.areValuesEffectivelyEqual(diff.lhs, diff.rhs, diff.path[0]));
      });
    },
    areValuesEffectivelyEqual(lhs, rhs, field) {
      // Handle null/undefined cases
      if ([null, undefined].includes(lhs) && [null, undefined].includes(rhs)) return true;
      
      // Check if the field is in booleanFields
      const config = this.activeComparisonType === 'openalex' ? 
        (this.customOpenAlexConfig || this.comparisonConfigs.openalex) : 
        this.comparisonConfigs.doi;
      
      // For boolean fields, compare based on nullness
      if (config.booleanFields && config.booleanFields.some(boolField => {
        // Handle exact match or if field is a nested path that starts with the boolean field
        return boolField === field || 
               (field.includes('.') && boolField.includes('.') && field.startsWith(boolField));
      })) {
        // For boolean fields, it's a match if the secondary value exists, regardless of primary
        const rhsExists = ![null, undefined, '-'].includes(rhs) && rhs !== '';
        return rhsExists;
      }
      
      // Special handling for DOI field to ensure case-insensitive comparison
      if (field === 'doi') {
        return String(lhs).toLowerCase() === String(rhs).toLowerCase();
      }
      
      // Convert to arrays if needed
      const isArrayLike = val => 
        Array.isArray(val) || 
        (typeof val === 'string' && val.trim().startsWith('['));
      
      if (isArrayLike(lhs) || isArrayLike(rhs)) {
        try {
          const toArray = val => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string' && val.trim().startsWith('[')) {
              return JSON.parse(val);
            }
            return val ? [val] : [];
          };
          
          const sortedLhs = toArray(lhs).map(String).sort();
          const sortedRhs = toArray(rhs).map(String).sort();
          return JSON.stringify(sortedLhs) === JSON.stringify(sortedRhs);
        } catch {
          return String(lhs) === String(rhs);
        }
      }
      
      // Handle primitive types
      if (typeof lhs === 'boolean' && typeof rhs === 'boolean') {
        return lhs === rhs;
      }
      
      if (typeof lhs === 'string' && typeof rhs === 'string') {
        const normalize = str => str.trim().toLowerCase();
        const normalizedLhs = normalize(lhs);
        const normalizedRhs = normalize(rhs);
        return normalizedLhs === normalizedRhs;
      }
      
      if (!isNaN(lhs) && !isNaN(rhs)) {
        return Number(lhs) === Number(rhs);
      }
      
      return String(lhs) === String(rhs);
    },
    formatValue(value) {
      if (value === undefined) return 'undefined';
      if (value === null) return 'null';
      if (value?.summary) return value; // For summary entries
      
      // For numbers that represent counts, make it more readable
      if (typeof value === 'number') {
        // Check if the path includes 'count' to identify count fields
        return String(value);
      }
      
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    },
    formatId(id) {
      return id;
    },
    updateCustomConfig(config) {
      // Ensure the custom config has all necessary properties from the default config
      const defaultConfig = this.comparisonConfigs.openalex;
      this.customOpenAlexConfig = {
        ...defaultConfig,
        fields: [...config.fields],
        booleanFields: [...(config.booleanFields || [])],
        arrayCountFields: [...config.arrayCountFields],
        nestedFields: [...config.nestedFields]
      };
      
      // If there are active comparisons, apply the new configuration immediately
      if (this.activeComparisonType === 'openalex' && this.comparisons.length > 0) {
        // Apply the new config to all current comparisons
        this.comparisons.forEach(comparison => {
          if (comparison.fullPrimaryData && comparison.fullSecondaryData) {
            this.applyCustomConfig(comparison);
          }
        });
      }
    },
    applyCustomConfig(comparison) {
      const config = this.customOpenAlexConfig;
      const primaryData = comparison.fullPrimaryData;
      const secondaryData = comparison.fullSecondaryData;

      comparison.primaryData = this.filterData(primaryData, config, true);
      comparison.secondaryData = this.filterData(secondaryData, config, false);

      comparison.differences = this.generateDifferences(
        comparison.primaryData, 
        comparison.secondaryData, 
        config
      );
    },
    filterData(data, config, isPrimary = true) {
      const filteredData = {};
      
      // Helper function to set nested field values
      const setNestedValue = (obj, path, value) => {
        const parts = path.split('.');
        let current = obj;
        
        // Create the nested structure if it doesn't exist
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
        
        // Set the value at the final level
        const finalPart = parts[parts.length - 1];
        current[finalPart] = value;
      };

      // Copy fields (handling nested paths)
      for (const field of config.fields) {
        if (field.includes('.')) {
          // Handle nested field paths
          const value = this.getFieldValue(data, field);
          setNestedValue(filteredData, field, value);
        } else {
          // Handle flat fields
          filteredData[field] = data[field];
        }
      }

      // Copy nested fields
      for (const group of config.nestedFields) {
        const groupName = group.group;
        if (data[groupName]) {
          filteredData[groupName] = {};
          for (const field of group.fields) {
            filteredData[groupName][field] = data[groupName][field];
          }
        }
      }

      // Copy array count fields
      for (const arrayField of config.arrayCountFields) {
        console.log('Filtering array count field:', arrayField);
        
        // Handle different field formats:
        // 1. String: same field for both primary and secondary
        // 2. Object with field property as string: same field for both
        // 3. Object with field property as array: different fields for primary and secondary
        let field, displayName;
        
        if (typeof arrayField === 'object') {
          if (Array.isArray(arrayField.field)) {
            // For filtering, we only need to use the appropriate field for this data source
            // The comparison function will handle matching the right fields
            field = arrayField.field[isPrimary ? 0 : 1]; // Use appropriate field based on data source
          } else {
            field = arrayField.field;
          }
          displayName = arrayField.displayName || field;
        } else {
          field = arrayField;
          displayName = field;
        }

        // Use the general countNestedArrayItems method for all fields
        const count = this.countNestedArrayItems(data, field);
        console.log(`Count for ${field}: ${count}`);
        
        // Create a count property for display in the UI
        if (!filteredData._counts) filteredData._counts = {};
        filteredData._counts[displayName] = count;
        
        // Set the field value in filteredData
        if (field.includes('.')) {
          // Handle nested fields
          const value = this.getFieldValue(data, field);
          if (value) {
            setNestedValue(filteredData, field, value);
          }
        } else if (data[field]) {
          // Handle direct fields
          filteredData[field] = data[field];
        }
      }

      console.log('Filtered data:', filteredData);
      return filteredData;
    },
    generateDifferences(primaryData, secondaryData, config) {
      const differences = [];
      
      // Check for _counts property in both primary and secondary data
      if (primaryData?._counts || secondaryData?._counts) {
        const primaryCounts = primaryData?._counts || {};
        const secondaryCounts = secondaryData?._counts || {};
        
        // Get all unique keys from both objects
        const allCountKeys = new Set([
          ...Object.keys(primaryCounts),
          ...Object.keys(secondaryCounts)
        ]);
        
        // Add differences for each count field
        allCountKeys.forEach(key => {
          const primaryCount = primaryCounts[key] || 0;
          const secondaryCount = secondaryCounts[key] || 0;
          
          if (primaryCount !== secondaryCount) {
            differences.push({
              path: [key],
              kind: 'E',
              lhs: primaryCount,
              rhs: secondaryCount
            });
          }
        });
      }

      // Compare flat and nested fields in the fields array
      for (const field of config.fields) {
        const primaryValue = field.includes('.') ? this.getFieldValue(primaryData, field) : primaryData[field];
        const secondaryValue = field.includes('.') ? this.getFieldValue(secondaryData, field) : secondaryData[field];
        
        if (primaryValue !== secondaryValue) {
          differences.push({
            path: [field],
            kind: 'E',
            lhs: primaryValue,
            rhs: secondaryValue
          });
        }
      }
      
      // Compare boolean fields
      if (config.booleanFields) {
        for (const field of config.booleanFields) {
          // Skip if this field is already in the fields array to avoid duplication
          if (config.fields.includes(field)) continue;
          
          const primaryValue = this.getFieldValue(primaryData, field);
          const secondaryValue = this.getFieldValue(secondaryData, field);
          
          // For boolean fields, it's a match if the secondary value exists, regardless of primary
          const secondaryExists = ![null, undefined, '-'].includes(secondaryValue) && secondaryValue !== '';
          
          // Only add to differences if secondary doesn't exist
          if (!secondaryExists) {
            differences.push({
              path: [field],
              kind: 'E',
              lhs: primaryValue,
              rhs: secondaryValue
            });
          }
        }
      }

      // Compare nested fields
      for (const group of config.nestedFields) {
        const groupName = group.group;

        // Skip if either object doesn't have the group
        if (!primaryData[groupName] || !secondaryData[groupName]) {
          if (primaryData[groupName] || secondaryData[groupName]) {
            differences.push({
              path: [groupName],
              kind: 'E',
              lhs: primaryData[groupName],
              rhs: secondaryData[groupName]
            });
          }
          continue;
        }

        // Compare each field in the group
        for (const field of group.fields) {
          if (primaryData[groupName][field] !== secondaryData[groupName][field]) {
            differences.push({
              path: [groupName, field],
              kind: 'E',
              lhs: primaryData[groupName][field],
              rhs: secondaryData[groupName][field]
            });
          }
        }
      }

      // Compare array count fields
      for (const arrayField of config.arrayCountFields) {
        console.log('Processing array count field:', arrayField);
        
        // Handle different field formats:
        // 1. String: same field for both primary and secondary
        // 2. Object with field property as string: same field for both
        // 3. Object with field property as array: different fields for primary and secondary
        let primaryField, secondaryField, displayName;
        
        if (typeof arrayField === 'object') {
          if (Array.isArray(arrayField.field)) {
            // Different fields for primary and secondary
            [primaryField, secondaryField] = arrayField.field;
          } else {
            // Same field for both
            primaryField = secondaryField = arrayField.field;
          }
          displayName = arrayField.displayName || primaryField;
        } else {
          // String field name
          primaryField = secondaryField = arrayField;
          displayName = arrayField;
        }

        let primaryLength = 0;
        let secondaryLength = 0;
        
        primaryLength = this.countNestedArrayItems(primaryData, primaryField);
        secondaryLength = this.countNestedArrayItems(secondaryData, secondaryField);
        

        // If lengths differ, add to differences
        if (primaryLength !== secondaryLength) {
          const pathDisplay = Array.isArray(arrayField.field) ? 
            `${displayName} (${primaryField}/${secondaryField})` : 
            displayName;
            
          differences.push({
            path: [pathDisplay],
            kind: 'E',
            lhs: primaryLength,
            rhs: secondaryLength
          });
        }
      }

      return differences;
    },
  }
}
</script>

<style>
/* Base styles */
.d2h-wrapper {
  text-align: left;
}

.d2h-file-header {
  display: none !important;
}

/* Colors */
.d2h-del {
  background-color: #ffd7d9 !important;
}

.d2h-ins {
  background-color: #ccffd8 !important;
}

/* Side by side layout */
.d2h-files-diff {
  display: flex !important;
  width: 100% !important;
}

.d2h-file-side-diff {
  margin: 0 !important;
  width: 50% !important;
  overflow-x: auto !important;
  overflow-y: auto !important;
}

.d2h-code-side-linenumber {
  position: sticky !important;
  left: 0 !important;
  background-color: #f6f8fa !important;
}

/* Container adjustments */
.d2h-file-wrapper {
  border: none !important;
}

.d2h-code-wrapper {
  border-left: 1px solid #d8dee4 !important;
}

/* Header column alignment */
.column-headers {
  display: flex;
  width: 100%;
}

.left-header, .right-header {
  width: 50%;
  display: flex;
  align-items: center;
}

.deletion-dot, .addition-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 10px;
  margin-right: 4px;
  vertical-align: middle;
}

.deletion-dot {
  background-color: #cf222e;
}

.addition-dot {
  background-color: #1a7f37;
}

/* Differences list */
.differences-list {
  max-width: 100%;
  overflow-x: auto;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  font-size: 12px;
}

.differences-content {
  word-break: break-word;
  min-width: 0;
}

.diff-item {
  border-bottom: 1px solid #e1e4e8;
}

.diff-item:last-child {
  border-bottom: none;
}

.diff-path {
  background-color: #f6f8fa;
  color: #24292e;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  font-weight: 600;
}

.diff-header {
  background-color: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
}

.differences-list pre {
  margin: 4px 0 0 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
}

.inline-diff-view {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  font-size: 12px;
  line-height: 1.3;
  background-color: #ffffff;
  overflow-x: auto;
}

.diff-content {
  padding: 0 !important;
}

.differences-list .removed,
.differences-list .added {
  line-height: 1.2;
  padding: 4px 8px;
}

.differences-list .removed {
  background-color: #ffd7d9;
  margin-bottom: 1px;
}

.differences-list .added {
  background-color: #ccffd8;
}

/* Fix Vuetify window height constraints */
.v-window__container {
  height: auto !important;
}

.v-window-item--active {
  height: auto !important;
}

.bulk-comparison {
  background-color: white;
  border-radius: 4px;
}
</style>
