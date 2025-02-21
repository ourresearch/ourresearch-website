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
          <tr :key="`${item.id}-${row.source}`" :class="{ 'first-row': index === 0 }">
            <td v-if="index === 0" :rowspan="2" :class="['id-cell', getCellClass(item.rows[0], 'id')]">
              <template v-if="config.idType === 'doi'">
                <a v-if="item.id" :href="`https://doi.org/${item.id}`" target="_blank" rel="noopener">{{ item.id }}</a>
                <template v-else>{{ item.id }}</template>
              </template>
              <template v-else>
                <a v-if="item.id" :href="`https://openalex.org/${item.id.replace('works/', '')}`" target="_blank" rel="noopener">{{ item.id }}</a>
                <template v-else>{{ item.id }}</template>
              </template>
            </td>
            <td v-for="header in headers.slice(1)" :key="header.value" :class="getCellClass(row, header.value)">
              <template v-if="header.value === 'source'">
                <template v-if="config.idType === 'doi'">
                  <a :href="`${row.source === 'Unpaywall' ? 'https://api.unpaywall.org/' : 'https://api.openalex.org/unpaywall/'}${item.id}?email=team@ourresearch.org`" target="_blank" rel="noopener">{{ row.source }}</a>
                </template>
                <template v-else>
                  <a :href="`${row.source === 'OpenAlex' ? 'https://api.openalex.org/' : 'https://api.openalex.org/v2/'}${item.id}`" target="_blank" rel="noopener">{{ row.source === 'Unpaywall' ? 'Walden' : 'OpenAlex' }}</a>
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
        // Check if all fields match
        const isPassing = this.config.fields.concat(
          (this.config.arrayCountFields || []).map(field => `${field.field}_count`)
        ).every(attr => {
          const unpaywallValue = this.getFieldValue(comparison.unpaywallData, attr);
          const openAlexValue = this.getFieldValue(comparison.openAlexData, attr);
          return unpaywallValue === openAlexValue;
        });

        const baseUnpaywall = {
          id: comparison.id,
          source: 'Unpaywall',
          rowType: 'unpaywall',
          passing: isPassing,
          ...this.flattenData(comparison.unpaywallData)
        };
        const baseOpenAlex = {
          id: comparison.id,
          source: 'OpenAlex',
          rowType: 'openalex',
          passing: isPassing,
          ...this.flattenData(comparison.openAlexData)
        };
        return [baseOpenAlex, baseUnpaywall];
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
        comparison.openAlexData?.error?.includes('Not found')
      ).length;
    },
    passingPercent() {
      return Math.round((this.passingIds / this.totalIds) * 100) || 0;
    },
    missingPercent() {
      return Math.round((this.missingIds / this.totalIds) * 100) || 0;
    },
    responsePercent() {
      return 100 - this.missingPercent;
    },
    matchingCellsPercent() {
      let totalCells = 0;
      let matchingCells = 0;
      
      // Count only non-ID and non-source columns
      const columnsToCheck = this.headers.filter(h => !['id', 'source'].includes(h.value));
      
      this.flattenedComparisons.forEach(row => {
        if (row.source === 'Unpaywall') {
          columnsToCheck.forEach(header => {
            const matchingRow = this.flattenedComparisons.find(
              r => r.id === row.id && r.source === 'OpenAlex'
            );
            
            if (matchingRow) {
              totalCells++;
              if (header.value === 'journal_issns') {
                // Special handling for journal_issns
                const unpaywallIssns = row.journal_issns?.split(',').map(issn => issn.trim()) || [];
                const openAlexIssns = matchingRow.journal_issns?.split(',').map(issn => issn.trim()) || [];
                if (unpaywallIssns.every(issn => openAlexIssns.includes(issn))) {
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
    flattenData(data) {
      if (!data || data.error) {
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
      this.config.fields.forEach(attr => {
        result[attr] = data[attr] ?? '-';
      });

      (this.config.arrayCountFields || []).forEach(field => {
        result[`${field.field}_count`] = Array.isArray(data[field.field]) ? data[field.field].length : '-';
      });

      (this.config.nestedFields || []).forEach(group => {
        group.fields.forEach(attr => {
          result[`${group.group}.${attr}`] = data[group.group]?.[attr] ?? '-';
        });
      });

      return result;
    },
    getFieldValue(data, attr) {
      if (!data || data.error) return '-';
      
      // Handle array count fields
      if (attr.endsWith('_count')) {
        const field = attr.replace('_count', '');
        return Array.isArray(data[field]) ? data[field].length : '-';
      }
      
      return data[attr] ?? '-';
    },
    getRowClass(item) {
      return {
        'unpaywall-row': item.rowType === 'unpaywall',
        'openalex-row': item.rowType === 'openalex'
      }
    },
    getCellClass(row, column) {
      // Source column should always be green
      if (column === 'source') {
        return 'matching-cell';
      }

      // Find the matching row for comparison
      const currentId = row.source === 'Unpaywall' ? row.id : this.groupedComparisons.find(g => g.rows.includes(row)).id;
      const otherSource = row.source === 'Unpaywall' ? 'OpenAlex' : 'Unpaywall';
      const matchingRow = this.flattenedComparisons.find(
        r => r.id === currentId && r.source === otherSource
      );

      if (!matchingRow) return '';

      // Check if either row is missing data (404 case)
      const isCurrentRowMissing = row.source === 'OpenAlex' && 
        Object.entries(row)
          .filter(([key]) => !['source', 'id', 'rowType'].includes(key))
          .every(([_, value]) => value === '-' || value === '');

      const isMatchingRowMissing = matchingRow.source === 'OpenAlex' && 
        Object.entries(matchingRow)
          .filter(([key]) => !['source', 'id', 'rowType'].includes(key))
          .every(([_, value]) => value === '-' || value === '');

      // If either row is missing data, mark all cells as different
      if (isCurrentRowMissing || isMatchingRowMissing) {
        return 'different-cell';
      }

      // For ID column, check if all other columns match (except source)
      if (column === 'id') {
        const allOtherColumnsMatch = this.headers
          .filter(h => !['id', 'source'].includes(h.value))
          .every(h => {
            if (h.value === 'journal_issns') {
              // Special handling for journal_issns
              const unpaywallIssns = row.journal_issns?.split(',').map(issn => issn.trim()) || [];
              const openAlexIssns = matchingRow.journal_issns?.split(',').map(issn => issn.trim()) || [];
              return unpaywallIssns.every(issn => openAlexIssns.includes(issn));
            }
            return row[h.value] === matchingRow[h.value];
          });
        return allOtherColumnsMatch ? 'matching-cell' : 'different-cell';
      }

      // Special handling for journal_issns column
      if (column === 'journal_issns') {
        const unpaywallIssns = (row.source === 'Unpaywall' ? row : matchingRow).journal_issns?.split(',').map(issn => issn.trim()) || [];
        const openAlexIssns = (row.source === 'OpenAlex' ? row : matchingRow).journal_issns?.split(',').map(issn => issn.trim()) || [];
        return unpaywallIssns.every(issn => openAlexIssns.includes(issn)) ? 'matching-cell' : 'different-cell';
      }

      // For other columns, compare values normally
      return row[column] === matchingRow[column] ? 'matching-cell' : 'different-cell';
    },
    getDoiUrl(item) {
      return item.id;
    },
    getSourceUrl(source, id) {
      if (source === 'Unpaywall') {
        return `https://api.unpaywall.org/${id}?email=team@ourresearch.org`;
      } else if (source === 'OpenAlex') {
        return `https://api.openalex.org/unpaywall/${id}?email=team@ourresearch.org`;
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

.comparison-table :deep(td:nth-child(2)) {
  left: 150px;  /* Width of the ID column */
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
