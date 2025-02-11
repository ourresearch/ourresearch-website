<template>
  <div class="comparison-table-wrapper">
    <div class="results-message">
      <span>{{ passingPercent }}% passing, {{ missingPercent }}% missing, </span>
      <template v-if="passingDois > 0">{{ passingDois }} passing</template>
      <template v-if="failingDois > 0"><template v-if="passingDois > 0">, </template>{{ failingDois }} failing</template>
      <template v-if="missingDois > 0"><template v-if="passingDois > 0 || failingDois > 0">, </template>{{ missingDois }} missing</template>
    </div>
    <v-data-table
      dense
      class="comparison-table"
      :headers="headers"
      :items="groupedComparisons"
      disable-pagination
      hide-default-footer
      fixed-header
      fixed-column
      :headers-length="headers.length"
    >
      <template v-slot:item="{ item }">
        <template v-for="(row, index) in item.rows">
          <tr :key="row.source" :class="{ 'first-row': index === 0 }">
            <td v-if="index === 0" :rowspan="2" :class="['doi-cell', getCellClass(item.rows[0], 'doi')]">
              <a v-if="getDoiUrl(item)" :href="getDoiUrl(item)" target="_blank" rel="noopener">{{ item.doi }}</a>
              <template v-else>{{ item.doi }}</template>
            </td>
            <td v-for="header in headers.slice(1)" :key="header.value" :class="getCellClass(row, header.value)">
              <template v-if="header.value === 'source'">
                <a :href="getSourceUrl(row.source, item.doi)" target="_blank" rel="noopener">{{ row[header.value] }}</a>
              </template>
              <template v-else>
                {{ row[header.value] }}
              </template>
            </td>
          </tr>
        </template>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'UnpaywallComparisonTable',
  props: {
    comparisons: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      primitiveAttributes: [
        'title',
        'genre',
        'is_oa',
        'journal_issns',
        'journal_name',
        'published_date',
        'publisher',
        'year'
      ],
      bestOaLocationAttributes: [
        'evidence',
        'host_type',
        'is_best',
        'license',
        'url',
        'url_for_pdf',
        'version'
      ]
    }
  },
  computed: {
    headers() {
      return [
        { 
          text: 'DOI',
          value: 'doi',
          minWidth: '150px',
          fixed: true,
          fixedOffset: 0
        },
        { 
          text: 'Source',
          value: 'source',
          width: '100px',
          fixed: true,
          fixedOffset: 150
        },
        ...this.primitiveAttributes.map(attr => {
          const header = {
            text: attr,
            value: attr
          };
          
          // Add minimum widths only for specific columns that need them
          if (['title', 'journal_name', 'publisher'].includes(attr)) {
            header.minWidth = '200px';
          }
          return header;
        }),
        ...this.bestOaLocationAttributes.map(attr => {
          const header = {
            text: `best_oa_location.${attr}`,
            value: `best_oa_location.${attr}`
          };
          
          // Add minimum widths for URL fields
          if (attr.includes('url')) {
            header.minWidth = '200px';
          }
          return header;
        })
      ]
    },
    flattenedComparisons() {
      return this.comparisons.flatMap(comparison => {
        // Check if all fields match
        const isPassing = this.primitiveAttributes.concat(this.bestOaLocationAttributes).every(attr => {
          const unpaywallValue = comparison.unpaywallData?.[attr] ?? '-';
          const openAlexValue = comparison.openAlexData?.[attr] ?? '-';
          return unpaywallValue === openAlexValue;
        });

        const baseUnpaywall = {
          doi: this.formatDoi(comparison.doi),
          doi_url: comparison.unpaywallData?.doi_url || null,
          source: 'Unpaywall',
          rowType: 'unpaywall',
          passing: isPassing,
          ...this.flattenData(comparison.unpaywallData)
        };
        const baseOpenAlex = {
          doi: this.formatDoi(comparison.doi),
          doi_url: comparison.unpaywallData?.doi_url || null,
          source: 'OpenAlex',
          rowType: 'openalex',
          passing: isPassing,
          ...this.flattenData(comparison.openAlexData)
        };
        return [baseUnpaywall, baseOpenAlex];
      });
    },
    groupedComparisons() {
      const groups = [];
      for (let i = 0; i < this.flattenedComparisons.length; i += 2) {
        const unpaywallData = this.flattenedComparisons[i];
        groups.push({
          doi: unpaywallData.doi,
          doi_url: unpaywallData.doi_url,
          passing: unpaywallData.passing,
          rows: [
            this.flattenedComparisons[i],
            this.flattenedComparisons[i + 1]
          ]
        });
      }
      return groups;
    },
    totalDois() {
      return this.comparisons.length;
    },
    passingDois() {
      return this.comparisons.filter(comparison => comparison.passing).length;
    },
    failingDois() {
      return this.comparisons.filter(comparison => !comparison.passing).length;
    },
    missingDois() {
      return this.comparisons.filter(comparison => 
        comparison.openAlexData?.error?.includes('Not found')
      ).length;
    },
    passingPercent() {
      return Math.round((this.passingDois / this.totalDois) * 100) || 0;
    },
    missingPercent() {
      return Math.round((this.missingDois / this.totalDois) * 100) || 0;
    }
  },
  methods: {
    formatDoi(doi) {
      return doi.replace('https://doi.org/', '')
    },
    flattenData(data) {
      if (!data || data.error) {
        return this.primitiveAttributes.concat(this.bestOaLocationAttributes).reduce((acc, attr) => {
          acc[attr] = '-';
          return acc;
        }, {});
      }

      const result = {};
      this.primitiveAttributes.forEach(attr => {
        result[attr] = data[attr] ?? '-';
      });

      this.bestOaLocationAttributes.forEach(attr => {
        result[`best_oa_location.${attr}`] = data.best_oa_location?.[attr] ?? '-';
      });

      return result;
    },
    getRowClass(item) {
      return {
        'unpaywall-row': item.rowType === 'unpaywall',
        'openalex-row': item.rowType === 'openalex'
      }
    },
    getCellClass(row, column) {
      // Find the matching row for comparison
      const currentDoi = row.source === 'Unpaywall' ? row.doi : this.groupedComparisons.find(g => g.rows.includes(row)).doi;
      const otherSource = row.source === 'Unpaywall' ? 'OpenAlex' : 'Unpaywall';
      const matchingRow = this.flattenedComparisons.find(
        r => r.doi === currentDoi && r.source === otherSource
      );

      if (!matchingRow) return '';

      // Check if either row is missing data (404 case)
      const isCurrentRowMissing = row.source === 'OpenAlex' && 
        Object.entries(row)
          .filter(([key]) => !['source', 'doi', 'rowType'].includes(key))
          .every(([_, value]) => value === '-' || value === '');

      const isMatchingRowMissing = matchingRow.source === 'OpenAlex' && 
        Object.entries(matchingRow)
          .filter(([key]) => !['source', 'doi', 'rowType'].includes(key))
          .every(([_, value]) => value === '-' || value === '');

      // If either row is missing data, mark all cells as different
      if (isCurrentRowMissing || isMatchingRowMissing) {
        return 'different-cell';
      }

      // For DOI and Source columns, check if all other columns match
      if (column === 'doi' || column === 'source') {
        const allOtherColumnsMatch = this.headers
          .filter(h => !['doi', 'source'].includes(h.value))
          .every(h => row[h.value] === matchingRow[h.value]);
        return allOtherColumnsMatch ? 'matching-cell' : 'different-cell';
      }

      // For other columns, compare values normally
      return row[column] === matchingRow[column] ? 'matching-cell' : 'different-cell';
    },
    getDoiUrl(item) {
      return item.doi_url;
    },
    getSourceUrl(source, doi) {
      if (source === 'Unpaywall') {
        return `https://api.unpaywall.org/${doi}?email=team@ourresearch.org`;
      } else if (source === 'OpenAlex') {
        return `https://api.openalex.org/unpaywall/${doi}?email=team@ourresearch.org`;
      }
      return '';
    }
  }
}
</script>

<style scoped>
.comparison-table-wrapper {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin: 16px 0;
  position: relative;
}

.comparison-table {
  font-size: 0.875rem;
  min-width: 100%;
  width: max-content !important;
  table-layout: auto !important;
  overflow-x: auto;
}

.comparison-table :deep(table) {
  border-spacing: 0;
  border-collapse: separate;
}

.comparison-table :deep(th) {
  font-weight: 600 !important;
  white-space: nowrap;
  background-color: #f5f5f5 !important;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 0 8px !important;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.comparison-table :deep(td) {
  white-space: nowrap;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px !important;
  height: 48px;
}

.comparison-table :deep(.v-data-table__wrapper) {
  overflow-x: auto;
  margin-bottom: 8px;
}

.unpaywall-row {
  background-color: rgba(0, 0, 0, 0.02) !important;
}

.openalex-row {
}

.matching-cell {
  background-color: #e6ffe6 !important; /* Light green */
}

.different-cell {
  background-color: #ffe6e6 !important; /* Light red */
}

.doi-cell {
  vertical-align: middle !important;
  text-align: center !important;
  border-right: 1px solid #e0e0e0 !important;
}

.doi-cell:not(.matching-cell):not(.different-cell) {
  background-color: #f5f5f5 !important;
}

/* Table border styles */
.comparison-table :deep(.v-data-table__wrapper table tbody tr:nth-child(2n)) td {
  border-bottom: 1px solid #ddd !important;
}

.comparison-table :deep(.v-data-table__wrapper table tbody tr:nth-child(2n-1)) td {
  border-bottom: 0px solid #ddd !important;
}

.comparison-table :deep(.v-data-table__wrapper table thead tr th) {
  border-bottom: 2px solid #bdbdbd !important;
}


/* For cells that might have long content */
.comparison-table :deep(td.truncate-text) {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.comparison-table :deep(td:nth-child(2)) {
  left: 150px;  /* Width of the DOI column */
}

/* Style links in the source column */
.comparison-table :deep(td) a {
  color: inherit;
  text-decoration: none;
}

.comparison-table :deep(td) a:hover {
  text-decoration: underline;
}

.results-message {
  padding: 8px;
  background-color: #f5f5f5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.passing-count {
  color: #2ecc71;
}

.failing-count {
  color: #e74c3c;
}
</style>
