<script setup>
import { watch, computed, ref } from 'vue';

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  perPage: { type: Number, default: 10 },
});

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.rows.length / props.perPage));

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * props.perPage;
  return props.rows.slice(start, start + props.perPage);
});

watch(() => props.rows, () => { currentPage.value = 1; });

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);
  for (let i = current - delta; i <= current + delta; i++) {
    if (i < total && i > 1) range.push(i);
  }
  if (total > 1) range.push(total);

  for (let i of range) {
    if (l) {
      if (i - l === 2) rangeWithDots.push(l + 1);
      else if (i - l !== 1) rangeWithDots.push('...');
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
});

const changePage = (page) => {
  if (page === '...' || page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}
</script>

<template>
  <div class="base-table-wrapper">
    <div class="table-responsive custom-scrollbar">
      <table class="table mb-0 align-middle">
        <thead>
          <tr class="text-center text-nowrap">
            <th v-for="col in columns" :key="col.key" :class="col.class">
              {{ col.label }}
            </th>
            <th v-if="$slots.actions">សកម្មភាព</th>
          </tr>
        </thead>
        <tbody class="align-middle text-center">
          <tr v-if="loading">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="py-5">
              <div class="d-flex flex-column align-items-center py-4">
                <div class="spinner-border text-teal mb-2" role="status"></div>
                <span class="small text-secondary">កំពុងទាញយកទិន្នន័យ...</span>
              </div>
            </td>
          </tr>

          <tr v-for="(row, index) in paginatedRows" :key="index">
            <td v-for="col in columns" :key="col.key" :class="col.bodyClass">
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="pagination-container mt-4">
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
        <small class="text-muted order-2 order-sm-1">ទំព័រ {{ currentPage }} នៃ {{ totalPages }}</small>
        <ul class="pagination mb-0 order-1 order-sm-2">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link icon-btn" @click="changePage(currentPage - 1)">
              <i class="bi bi-chevron-left"></i>
            </button>
          </li>
          <li v-for="(page, index) in visiblePages" :key="index" class="page-item d-none d-sm-block">
            <button class="page-link" :class="{ 'active-page': page === currentPage, 'dots': page === '...' }"
              @click="changePage(page)">
              {{ page }}
            </button>
          </li>
          <li class="page-item d-sm-none">
            <span class="page-link active-page">{{ currentPage }}</span>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link icon-btn" @click="changePage(currentPage + 1)">
              <i class="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  min-width: 900px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

thead th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #daeaeb !important;
  color: #13707f;
  padding: 1.25rem 1rem;
  font-weight: 800;
  border-bottom: 2px solid #13707f;
}

.custom-scrollbar {
  max-height: 450px;
  overflow: auto;
  border-radius: 12px;
  border: 1px solid #eee;
  background: #fff;
  -webkit-overflow-scrolling: touch;
}

.table tbody td {
  background: #fdfdfd;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  padding: 1rem !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #13707f;
  border-radius: 10px;
}

/* Pagination */
.pagination {
  gap: 5px;
}

.page-link {
  border: none;
  background: #f8fafc;
  color: #64748b;
  width: 36px;
  height: 36px;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}

.page-link.active-page {
  background: #13707f !important;
  color: white !important;
}

.icon-btn {
  background: #eee;
  color: #13707f;
}
</style>