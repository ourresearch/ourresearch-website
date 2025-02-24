<template>
  <div class="comparison-table-wrapper">
    <div class="results-message">
      <span>{{ responsePercent }}% response, {{ passingPercent }}% matching (rows), {{ matchingCellsPercent }}% matching (cells)</span>
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
          <tr :key="`${item.id}-${row.source}`" :class="{ 'first-row': index === 0, 'error-row': row.hasError }">
            <td v-if="index === 0" :rowspan="2" :class="['id-cell', getCellClass(row, 'id')]">
              <template v-if="config.idType === 'doi'">
                <a v-if="item.id" :href="`${row.source === 'primary' ? config.endpoints.primary : config.endpoints.secondary}${item.id}?email=team@ourresearch.org`" target="_blank" rel="noopener">{{ item.id }}</a>
                <template v-else>{{ item.id }}</template>
              </template>
              <template v-else>
                {{ formatId(item.id) }}
              </template>
            </td>
            <td v-for="header in headers.slice(1)" :key="header.value" :class="getCellClass(row, header.value)">
              <template v-if="header.value === 'source'">
                <template v-if="config.idType === 'doi'">
                  <a :href="`${row.source === 'primary' ? config.endpoints.primary : config.endpoints.secondary}${item.id}?email=team@ourresearch.org`" target="_blank" rel="noopener">{{ config.labels[row.source] }}</a>
                </template>
                <template v-else>
                  <a :href="`${row.source === 'primary' ? config.endpoints.primary : config.endpoints.secondary}${item.id}`" target="_blank" rel="noopener">{{ config.labels[row.source] }}</a>
                </template>
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
    },
    config: {
      type: Object,
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
          text: this.config.idType === 'doi' ? 'DOI' : 'OpenAlex ID',
          value: 'id',
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
        ...this.config.fields.map(field => {
          const header = {
            text: field,
            value: field
          };
          
          // Add minimum widths only for specific columns that need them
          if (['title', 'journal_name', 'publisher'].includes(field)) {
            header.minWidth = '200px';
          }
          return header;
        }),
        ...(this.config.arrayCountFields || []).map(field => ({
          text: field.displayName,
          value: `${field.field}_count`
        })),
        ...(this.config.nestedFields || []).flatMap(group => 
          group.fields.map(field => {
            const header = {
              text: `${group.group}.${field}`,
              value: `${group.group}.${field}`
            };
            
            // Add minimum widths for URL fields
            if (field.includes('url')) {
              header.minWidth = '200px';
            }
            return header;
          })
        )
      ]
    },
    flattenedComparisons() {
      return this.comparisons.flatMap(comparison => {
        // Map data based on primary/secondary configuration
        const primaryData = comparison.primaryData?.error ? this.createEmptyRow() : this.flattenData(comparison.primaryData);
        const secondaryData = comparison.secondaryData?.error ? this.createEmptyRow() : this.flattenData(comparison.secondaryData);

        return [
          {
            ...primaryData,
            id: comparison.id,
            source: 'primary',
            rowType: 'primary',
            hasError: !!comparison.primaryData?.error
          },
          {
            ...secondaryData,
            id: comparison.id,
            source: 'secondary',
            rowType: 'secondary',
            hasError: !!comparison.secondaryData?.error
          }
        ];
      });
    },
    groupedComparisons() {
      const groups = [];
      for (let i = 0; i < this.flattenedComparisons.length; i += 2) {
        const openAlexData = this.flattenedComparisons[i];
        groups.push({
          id: openAlexData.id,
          passing: openAlexData.passing,
          rows: [
            this.flattenedComparisons[i],
            this.flattenedComparisons[i + 1]
          ]
        });
      }
      return groups;
    },
    totalIds() {
      return this.comparisons.length;
    },
    passingIds() {
      // Get unique IDs where both rows are passing
      const uniqueIds = new Set(
        this.flattenedComparisons
          .filter(row => row.passing)
          .map(row => row.id)
      );
      return uniqueIds.size;
    },
    failingIds() {
      return this.totalIds - this.passingIds - this.missingIds;
    },
    missingIds() {
      return this.comparisons.filter(comparison => 
        comparison.primaryData?.error?.includes('Not found')
      ).length;
    },
    passingPercent() {
      return Math.round((this.passingIds / this.totalIds) * 100) || 0;
    },
    missingPercent() {
      return Math.round((this.missingIds / this.totalIds) * 100) || 0;
    },
    responsePercent() {
      // Get total number of comparisons
      const total = this.comparisons.length;
      if (!total) return 0;

      // Count responses that don't have errors in secondaryData
      const successfulResponses = this.comparisons.filter(comparison => {
        return !comparison.secondaryData?.error;
      }).length;

      return Math.round((successfulResponses / total) * 100);
    },
    matchingCellsPercent() {
      let totalCells = 0;
      let matchingCells = 0;
      
      // Count only non-ID and non-source columns
      const columnsToCheck = this.headers.filter(h => !['id', 'source'].includes(h.value));
      
      this.flattenedComparisons.forEach(row => {
        if (row.source === 'secondary') {
          columnsToCheck.forEach(header => {
            const matchingRow = this.flattenedComparisons.find(
              r => r.id === row.id && r.source === 'primary'
            );
            
            if (matchingRow) {
              totalCells++;
              if (header.value === 'journal_issns') {
                // Special handling for journal_issns
                const secondaryIssns = row.journal_issns?.split(',').map(issn => issn.trim()) || [];
                const primaryIssns = matchingRow.journal_issns?.split(',').map(issn => issn.trim()) || [];
                if (secondaryIssns.every(issn => primaryIssns.includes(issn))) {
                  matchingCells++;
                }
              } else if (row[header.value] === matchingRow[header.value]) {
                matchingCells++;
              }
            }
          });
        }
      });
      
      return Math.round((matchingCells / totalCells) * 100) || 0;
    }
  },
  methods: {
    formatId(id) {
      return id;
    },
    createEmptyRow() {
      return {
        display_name: '-',
        publication_year: '-',
        publication_date: '-',
        type: '-',
        doi: '-',
        language: '-',
        cited_by_count: '-',
        authorships_count: '-',
        locations_count: '-',
        concepts_count: '-',
        'primary_location.is_oa': '-',
        'primary_location.landing_page_url': '-',
        'primary_location.pdf_url': '-',
        'primary_location.version': '-',
        'open_access.is_oa': '-',
        'open_access.oa_status': '-',
        'open_access.oa_url': '-'
      };
    },
    getCellClass(row, column) {
      // Source column should always be green
      if (column === 'source') {
        return 'matching-cell';
      }

      // Find the matching row for comparison
      const group = this.groupedComparisons.find(g => g.id === row.id);
      if (!group) return '';

      const [primaryRow, secondaryRow] = group.rows;
      if (!primaryRow || !secondaryRow) return '';

      // If either row has an error, mark as different
      if (primaryRow.hasError || secondaryRow.hasError) {
        return 'different-cell';
      }

      // For ID column, check if all other columns match (except source)
      if (column === 'id') {
        const allOtherColumnsMatch = this.headers
          .filter(h => !['id', 'source'].includes(h.value))
          .every(h => primaryRow[h.value] === secondaryRow[h.value]);
        return allOtherColumnsMatch ? 'matching-cell' : 'different-cell';
      }

      // For regular cells, compare values directly
      const primaryValue = primaryRow[column];
      const secondaryValue = secondaryRow[column];
      return primaryValue === secondaryValue ? 'matching-cell' : 'different-cell';
    },
    areValuesEqual(val1, val2) {
      // Handle null/undefined
      if (val1 == null && val2 == null) return true;
      if (val1 == null || val2 == null) return false;

      // Handle arrays
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) return false;
        return val1.every((v, i) => this.areValuesEqual(v, val2[i]));
      }

      // Handle objects
      if (typeof val1 === 'object' && typeof val2 === 'object') {
        const keys1 = Object.keys(val1);
        const keys2 = Object.keys(val2);
        if (keys1.length !== keys2.length) return false;
        return keys1.every(key => this.areValuesEqual(val1[key], val2[key]));
      }

      // Handle primitive values
      return val1 === val2;
    },
    flattenData(data) {
      // Only treat as empty if data is null/undefined
      if (!data) {
        const emptyData = {};
        this.config.fields.forEach(attr => {
          emptyData[attr] = '-';
        });
        (this.config.arrayCountFields || []).forEach(field => {
          emptyData[`${field.field}_count`] = '-';
        });
        (this.config.nestedFields || []).forEach(group => {
          group.fields.forEach(attr => {
            emptyData[`${group.group}.${attr}`] = '-';
          });
        });
        return emptyData;
      }

      const result = {};
      
      // Flatten basic fields
      this.config.fields.forEach(attr => {
        result[attr] = data[attr] || '-';
      });
      
      // Count array fields
      (this.config.arrayCountFields || []).forEach(field => {
        result[`${field.field}_count`] = (data[field.field] || []).length || '0';
      });
      
      // Flatten nested fields
      (this.config.nestedFields || []).forEach(group => {
        const nestedData = data[group.group] || {};
        group.fields.forEach(attr => {
          result[`${group.group}.${attr}`] = nestedData[attr] || '-';
        });
      });
      
      return result;
    }
  },
  watch: {
    comparisons() {
      //console.log(this.comparisons);
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

.matching-cell {
  background-color: #e6ffe6 !important; /* Light green */
}

.different-cell {
  background-color: #ffe6e6 !important; /* Light red */
}

.id-cell {
  vertical-align: middle !important;
  text-align: center !important;
  border-right: 1px solid #e0e0e0 !important;
}

.id-cell:not(.matching-cell):not(.different-cell) {
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
