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
      
      <!-- Add match percentage row as the first row in the body -->
      <template v-slot:body>
        <tr class="match-percentage-row">
          <td :class="['match-percentage-cell', 'fixed-header']" :style="{ left: '0px' }">Match %</td>
          <td v-for="header in headers.slice(1)" :key="header.value" :class="['match-percentage-cell', header.fixed ? 'fixed-header' : '']" :style="header.fixed ? { left: header.fixedOffset + 'px' } : {}">
            <div class="match-percentage-value">{{ columnMatchingPercentages[header.text] ? columnMatchingPercentages[header.text] + '%' : '' }}</div>
          </td>
        </tr>
        <template v-for="item in groupedComparisons">
          <tr v-for="(row, index) in item.rows" :key="`${item.id}-${row.source}`" :class="{ 'first-row': index === 0, 'error-row': row.hasError }">
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
      
      <!-- The item slot is now handled in the body slot above -->
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
              } else if (this.compareValues(matchingRow[header.value], row[header.value], header.value)) {
                matchingCells++;
              }
            }
          });
        }
      });
      
      return Math.round((matchingCells / totalCells) * 100) || 0;
    },
    columnMatchingPercentages() {
      // Initialize an object to store column matching statistics
      const columnStats = {};
      
      // Count only non-ID and non-source columns
      const columnsToCheck = this.headers.filter(h => !['id', 'source'].includes(h.value));
      
      // Initialize counters for each column
      columnsToCheck.forEach(header => {
        columnStats[header.text] = {
          total: 0,
          matching: 0
        };
      });
      
      // Calculate matches for each column
      this.flattenedComparisons.forEach(row => {
        if (row.source === 'secondary') {
          columnsToCheck.forEach(header => {
            const matchingRow = this.flattenedComparisons.find(
              r => r.id === row.id && r.source === 'primary'
            );
            
            if (matchingRow) {
              columnStats[header.text].total++;
              
              if (header.value === 'journal_issns') {
                // Special handling for journal_issns
                const secondaryIssns = row.journal_issns?.split(',').map(issn => issn.trim()) || [];
                const primaryIssns = matchingRow.journal_issns?.split(',').map(issn => issn.trim()) || [];
                if (secondaryIssns.every(issn => primaryIssns.includes(issn))) {
                  columnStats[header.text].matching++;
                }
              } else if (this.compareValues(matchingRow[header.value], row[header.value], header.value)) {
                columnStats[header.text].matching++;
              }
            }
          });
        }
      });
      
      // Calculate percentages for each column
      const percentages = {};
      Object.keys(columnStats).forEach(column => {
        const { total, matching } = columnStats[column];
        percentages[column] = Math.round((matching / total) * 100) || 0;
      });
      
      return percentages;
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
          .every(h => this.compareValues(primaryRow[h.value], secondaryRow[h.value], h.value));
        return allOtherColumnsMatch ? 'matching-cell' : 'different-cell';
      }

      // For regular cells, compare values
      const primaryValue = primaryRow[column];
      const secondaryValue = secondaryRow[column];
      return this.compareValues(primaryValue, secondaryValue, column) ? 'matching-cell' : 'different-cell';
    },
    
    // Helper method to compare values with special handling for count fields and boolean fields
    compareValues(primaryValue, secondaryValue, columnName) {
      // Check if this is a count field
      if (columnName.endsWith('_count')) {
        // For count fields, secondary >= primary is considered a match
        const primaryNum = parseInt(primaryValue, 10);
        const secondaryNum = parseInt(secondaryValue, 10);
        
        // Only compare if both values are valid numbers
        if (!isNaN(primaryNum) && !isNaN(secondaryNum)) {
          return secondaryNum >= primaryNum;
        }
      }
      
      // Check if this is a boolean field (from the config)
      if (this.config.booleanFields && this.config.booleanFields.some(boolField => {
        // Handle exact match or if field is a nested path that starts with the boolean field
        return boolField === columnName || 
               (columnName.includes('.') && boolField.includes('.') && columnName.startsWith(boolField));
      })) {
        // For boolean fields, it's a match if the secondary value exists, regardless of primary
        return ![null, undefined, '-', ''].includes(secondaryValue);
      }
      
      // For non-count fields, use exact equality
      return primaryValue === secondaryValue;
    },
    
    // Format cell value with special handling for count fields
    formatCellValue(row, columnName) {
      // If not a count field or not a secondary row, just return the value
      if (!columnName.endsWith('_count') || row.source !== 'secondary') {
        return row[columnName];
      }
      
      // For count fields in secondary rows, check if value is greater than primary
      const group = this.groupedComparisons.find(g => g.id === row.id);
      if (!group) return row[columnName];
      
      const [primaryRow, secondaryRow] = group.rows;
      if (!primaryRow || !secondaryRow) return row[columnName];
      
      const primaryValue = parseInt(primaryRow[columnName], 10);
      const secondaryValue = parseInt(secondaryRow[columnName], 10);
      
      // If both are valid numbers and secondary > primary, append ' +'
      if (!isNaN(primaryValue) && !isNaN(secondaryValue) && secondaryValue > primaryValue) {
        return `${row[columnName]}+`;
      }
      
      return row[columnName];
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
      // Helper function to get value from a nested path
      const getNestedValue = (obj, path) => {
        if (!obj) return undefined;
        const parts = path.split('.');
        let value = obj;
        
        for (const part of parts) {
          if (value === null || value === undefined) return undefined;
          value = value[part];
        }
        
        return value;
      };
      
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
        // Handle nested fields in the fields array
        if (attr.includes('.')) {
          result[attr] = getNestedValue(data, attr) || '-';
        } else {
          result[attr] = data[attr] || '-';
        }
      });
      
      // Count array fields
      (this.config.arrayCountFields || []).forEach(field => {
        // Check if this is a nested array count (e.g., 'authorships.affiliations')
        if (field.field.includes('.')) {
          const [parentField, childField] = field.field.split('.');
          // Get the parent array
          const parentArray = data[parentField] || [];
          // Count all items in the nested arrays
          let totalCount = 0;
          parentArray.forEach(item => {
            if (item && Array.isArray(item[childField])) {
              totalCount += item[childField].length;
            }
          });
          result[`${field.field}_count`] = totalCount || '0';
        } else {
          // Regular array count
          result[`${field.field}_count`] = (data[field.field] || []).length || '0';
        }
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

.custom-header {
  width: 100%;
}

.custom-header-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-header-table th {
  font-weight: 600 !important;
  white-space: nowrap;
  background-color: #f5f5f5 !important;
  padding: 0 8px !important;
  height: 48px;
  text-align: left;
}

.custom-header-table .match-percentage-row th {
  font-weight: 500 !important;
  height: 30px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.custom-header-table .fixed-header {
  position: sticky;
  z-index: 2;
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
  background-color: #f5f5f5 !important;
  vertical-align: middle !important;
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

.match-percentage-row {
  background-color: #f5f5f5;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.comparison-table :deep(.match-percentage-row) {
  background-color: #f5f5f5;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.match-percentage-cell {
  font-size: 0.85rem;
  font-weight: 500 !important;
  padding: 4px 8px !important;
  white-space: nowrap;
  height: 30px;
  background-color: #f5f5f5;
  vertical-align: middle !important;
}

.match-percentage-value {
  display: flex;
  height: 100%;
}

.comparison-table :deep(.match-percentage-cell) {
  font-size: 0.85rem;
  font-weight: 500 !important;
  padding: 4px 8px !important;
  white-space: nowrap;
  vertical-align: middle !important;
  height: 30px;
  background-color: #f5f5f5;
}

.passing-count {
  color: #2ecc71;
}

.failing-count {
  color: #e74c3c;
}
</style>
