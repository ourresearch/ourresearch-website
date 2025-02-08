<template>
  <v-container class="unpaywall-qa">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">Unpaywall QA</h1>

        <v-card class="doi-comparison pa-3" color="grey lighten-3 ">
          <v-card-title class="text-h5">
            DOI Comparison
          </v-card-title>

          <v-card-text>
            <div class="d-flex align-center mb-6">
              <v-text-field
                v-model="doi"
                label="Enter DOI"
                outlined
                background-color="white"
                :loading="isLoading"
                :disabled="isLoading"
                @keyup.enter="compareDOI"
                class="mr-4"
                hide-details
                density="comfortable"
              ></v-text-field>
              <v-btn
                color="primary"
                :loading="isLoading"
                :disabled="isLoading"
                @click="compareDOI"
                class="mr-2"
              >
                Compare
              </v-btn>
              <v-btn
                color="primary"
                :disabled="isLoading"
                @click="showBulkDialog = true"
              >
                Bulk Compare
              </v-btn>
            </div>

            <div v-if="error" class="error--text mb-6">
              {{ error }}
            </div>

            <div v-if="isBulkComparison" class="text-body-1 mb-4">
              <template v-if="missingDoiSummary && (missingDoiSummary.unpaywall > 0 || missingDoiSummary.openAlex > 0)">
                {{ completedDois }} DOIs compared:
                <div v-if="missingDoiSummary.unpaywall > 0">{{ missingDoiSummary.unpaywall }} not found in Unpaywall</div>
                <div v-if="missingDoiSummary.openAlex > 0">{{ missingDoiSummary.openAlex }} not found in OpenAlex</div>
              </template>
              <template v-else-if="completedDois > 0">
                {{ completedDois }} DOIs compared, all found in Unpaywall & OpenAlex
              </template>
            </div>

            <div v-for="(comparison, index) in comparisons" :key="comparison.doi" class="mb-8">
              <div class="text-h6 mb-4">
                <template v-if="isBulkComparison">{{ index + 1 }}. </template>
                {{ comparison.doi }}
              </div>
              <div v-if="comparison.error" class="error--text mb-4">
                {{ comparison.error }}
              </div>
              <v-card v-if="comparison.unpaywallData && comparison.openAlexData">
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
                              <span><a :href="`https://api.unpaywall.org/${comparison.doi}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">Unpaywall<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a></span>
                            </div>
                            <div class="right-header">
                              <span class="addition-dot"></span>
                              <span><a :href="`https://api.openalex.org/unpaywall/${comparison.doi}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">OpenAlex<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a></span>
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
                              <span class="ml-1"><a :href="`https://api.unpaywall.org/${comparison.doi}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">Unpaywall<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a></span>
                            </div>
                            <div>
                              <span class="addition-dot"></span>
                              <span class="ml-1"><a :href="`https://api.openalex.org/unpaywall/${comparison.doi}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">OpenAlex<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a></span>
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
                              <span class="deletion-dot"></span> <a :href="`https://api.unpaywall.org/${comparison.doi}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">Unpaywall<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a>
                            </span>
                            <span>
                              <span class="addition-dot"></span> <a :href="`https://api.openalex.org/unpaywall/${comparison.doi}?email=team@ourresearch.org`" target="_blank" rel="noopener" style="color: inherit; text-decoration: none;">OpenAlex<i class="v-icon mdi mdi-open-in-new" style="font-size: 14px; vertical-align: text-bottom; margin: 0 -4px 0 2px;"></i></a>
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

            <!-- Bulk Compare Dialog -->
            <v-dialog v-model="showBulkDialog" max-width="600px">
              <v-card>
                <v-card-title>Bulk Compare DOIs</v-card-title>
                <v-card-text>
                  <p class="mb-4">Enter DOIs one per line or comma separated:</p>
                  <v-textarea
                    v-model="bulkDois"
                    outlined
                    rows="10"
                    :disabled="isLoading"
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
                    @click="compareBulkDOIs"
                    :loading="isLoading"
                    :disabled="isLoading"
                  >
                    Compare
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { diff } from 'deep-diff'
import { createPatch } from 'diff'
import { html as diff2html } from 'diff2html'

export default {
  name: 'UnpaywallQA',
  data() {
    return {
      doi: '',
      bulkDois: '',
      error: null,
      isLoading: false,
      showBulkDialog: false,
      comparisons: [],
      missingDoiSummary: null,
      isBulkComparison: false,
      totalDois: 0,
      completedDois: 0
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
  methods: {
    getDefaultTab() {
      return parseInt(localStorage.getItem('unpaywallQaDefaultTab') || '0')
    },
    updateDefaultTab(tab) {
      localStorage.setItem('unpaywallQaDefaultTab', tab.toString())
    },
    async compareDOI() {
      if (!this.doi) return
      
      this.error = null
      this.isLoading = true
      this.missingDoiSummary = null
      this.isBulkComparison = false
      
      try {
        const comparison = await this.fetchComparison(this.doi)
        this.comparisons = [comparison]
        this.doi = ''
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    async compareBulkDOIs() {
      if (!this.bulkDois) return
      
      this.error = null
      this.isLoading = true
      this.showBulkDialog = false
      this.missingDoiSummary = null
      this.isBulkComparison = true
      this.comparisons = []
      this.completedDois = 0
      
      const dois = this.bulkDois
        .split(/[\n,]/)
        .map(doi => doi.trim())
        .filter(doi => doi)
      
      this.totalDois = dois.length
      
      try {
        // Process DOIs sequentially to maintain order
        for (const doi of dois) {
          const comparison = await this.fetchComparison(doi)
          this.comparisons.push(comparison)
          this.completedDois++
          this.updateMissingDoiSummary(this.comparisons)
        }
        this.bulkDois = ''
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    updateMissingDoiSummary(comparisons) {
      const summary = {
        unpaywall: 0,
        openAlex: 0
      }
      
      for (const comparison of comparisons) {
        if (comparison.unpaywallData?.error?.includes('Not found')) {
          summary.unpaywall++
        }
        if (comparison.openAlexData?.error?.includes('Not found')) {
          summary.openAlex++
        }
      }
      
      this.missingDoiSummary = summary
    },
    async fetchComparison(doi) {
      const comparison = {
        doi,
        error: null,
        unpaywallData: null,
        openAlexData: null,
        differences: null,
        inlineJsonDiff: null,
        sideBySideDiff: null,
        activeTab: this.getDefaultTab()
      }

      try {
        const processResponse = async (response, source) => {
          try {
            if (response.ok) return await response.json();
            if (response.status === 404) return { error: `Not found in ${source}` };
            throw new Error(`${source} API error: ${response.status}`);
          } catch (err) {
            return { error: err.message };
          }
        };

        // Fetch both responses
        const [unpaywallResponse, openAlexResponse] = await Promise.all([
          fetch(`https://api.unpaywall.org/${doi}?email=team@ourresearch.org`),
          fetch(`https://api.openalex.org/unpaywall/${doi}?email=team@ourresearch.org`)
        ]);

        // Process responses
        const [unpaywallJson, openAlexJson] = await Promise.all([
          processResponse(unpaywallResponse, 'Unpaywall'),
          processResponse(openAlexResponse, 'OpenAlex')
        ]);

        comparison.unpaywallData = unpaywallJson;
        comparison.openAlexData = openAlexJson;
        
        // Collect errors if any
        const errors = [unpaywallJson, openAlexJson]
          .filter(data => data?.error)
          .map(data => `${data.error}`)
          .join(' | ');
        if (errors) comparison.error = errors;

        // Generate diffs
        comparison.differences = diff(unpaywallJson, openAlexJson) || [];
        
        const patch = createPatch(
          'file.json', 
          JSON.stringify(unpaywallJson, null, 2), 
          JSON.stringify(openAlexJson, null, 2), 
          'Unpaywall', 
          'OpenAlex'
        );

        const diffOptions = {
          drawFileList: false,
          matching: 'lines',
          renderNothingWhenEmpty: true,
          diffStyle: 'word',
          lineWrapping: true,
          matchWordsThreshold: 0.25,
          matchingMaxComparisons: 2500
        };
        
        // Generate the diffs
        const inlineHtml = diff2html(patch, { ...diffOptions, outputFormat: 'line-by-line' });
        const sideBySideHtml = diff2html(patch, { ...diffOptions, outputFormat: 'side-by-side' });
        
        // Add truncation message with links if content appears to be truncated
        const truncationMessage = `
          <div class="truncation-message" style="padding: 10px; text-align: center; color: #666;">
            Remaining content identical. 
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 8px;">
              <a href="https://api.unpaywall.org/${doi}?email=team@ourresearch.org" target="_blank" rel="noopener" style="color: #666; text-decoration: none;">
                Unpaywall JSON <i class="v-icon mdi mdi-open-in-new" style="font-size: 16px; vertical-align: text-bottom;"></i>
              </a>
              <a href="https://api.openalex.org/unpaywall/${doi}?email=team@ourresearch.org" target="_blank" rel="noopener" style="color: #666; text-decoration: none;">
                OpenAlex JSON <i class="v-icon mdi mdi-open-in-new" style="font-size: 16px; vertical-align: text-bottom;"></i>
              </a>
            </div>
          </div>
        `;
        
        // Check for truncation by analyzing the deep-diff results
        const unpaywallStr = JSON.stringify(unpaywallJson, null, 2);
        const openAlexStr = JSON.stringify(openAlexJson, null, 2);
        
        // Find the last difference position
        let lastDiffPos = -1;
        if (comparison.differences.length > 0) {
          const lastDiff = comparison.differences[comparison.differences.length - 1];
          const lastPath = lastDiff.path.join('.');
          lastDiffPos = unpaywallStr.indexOf(`"${lastPath}"`);
        }
        
        // If we have differences and there's a significant amount of content after the last difference,
        // it's likely that content is being truncated
        const contentAfterLastDiff = lastDiffPos > 0 ? 
          unpaywallStr.length - lastDiffPos : 0;
        
        const isTruncated = comparison.differences.length > 0 && 
                           contentAfterLastDiff > 1000 && 
                           unpaywallStr.slice(-500) === openAlexStr.slice(-500);
        
        comparison.inlineJsonDiff = inlineHtml + (isTruncated ? truncationMessage : '');
        comparison.sideBySideDiff = sideBySideHtml + (isTruncated ? truncationMessage : '');
      } catch (err) {
        comparison.error = `Error fetching data for DOI ${doi}: ${err.message}`;
      }

      return comparison;
    },
    filteredDifferences(comparison) {
      if (!comparison?.differences) return [];
      
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
        return diffs.filter(diff => !this.areValuesEffectivelyEqual(diff.lhs, diff.rhs));
      });
    },
    areValuesEffectivelyEqual(lhs, rhs) {
      // Handle null/undefined/todo cases
      if ([null, undefined].includes(lhs) && [null, undefined].includes(rhs)) return true;
      if ([null, undefined].includes(lhs) && rhs?.todo === 'todo') return true;
      if ([null, undefined].includes(rhs) && lhs?.todo === 'todo') return true;
      
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
        if (['todo'].includes(normalizedLhs) || ['todo'].includes(normalizedRhs)) return false;
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
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
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
</style>
