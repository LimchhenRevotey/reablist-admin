<script setup>
import { watch, computed, ref } from 'vue';

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  perPage: { type: Number, default: 10 },
});
// Pagination

const currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil(props.rows.length / props.perPage)
);

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * props.perPage
  return props.rows.slice(start, start + props.perPage)
});

watch(() => props.rows, () => {
  currentPage.value = 1
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);
  for (let i = current - delta; i <= current + delta; i++) {
    if (i < total && i > 1) {
      range.push(i);
    }
  }
  range.push(total);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
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
  <div>
    <table class="table mb-0 align-middle">
      <thead>
        <tr class="text-center">
          <th v-for="col in columns" :key="col.key" :class="col.class">
            {{ col.label }}
          </th>
          <th v-if="$slots.actions">សកម្មភាព</th>
        </tr>
      </thead>
      <tbody class="align-middle text-center">
        <tr v-if="loading">
          <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="py-5">
            <div class="d-flex flex-column align-items-center justify-content-center text-muted py-4">
              <div class="spinner-border text-brand mb-2" role="status" style="width: 2rem; height: 2rem;"></div>
              <span class="small text-secondary">កំពុងទាញយកទិន្នន័យ...</span>
            </div>
          </td>
        </tr>
        <tr v-for="(row, index) in paginatedRows" :key="index">
          <td v-for="col in columns" :key="col.key" :class="col.bodyClass">
            <!-- Custom cell -->
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
          <!-- Actions -->
          <td v-if="$slots.actions">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1"
      class="pagination-container d-flex justify-content-between align-items-center mt-4 px-2 py-3">
      <small class="text-muted">
        ទំព័រ {{ currentPage }} នៃ {{ totalPages }}
      </small>
      <ul class="pagination mb-0">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link icon-btn" @click="changePage(currentPage - 1)">
            <i class="bi bi-chevron-left"></i>
          </button>
        </li>
        <li v-for="(page, index) in visiblePages" :key="index" class="page-item">
          <button class="page-link" :class="{
            'active-page': page === currentPage,
            'dots': page === '...'}" @click="changePage(page)">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link icon-btn" @click="changePage(currentPage + 1)">
            <i class="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.table thead th {
  background: #daeaeb;
  font-size: 1rem;
  text-transform: uppercase;
  color: #13707f;
  padding: 1.25rem 1rem;
}

.table tbody td {
  background: #f3f3f3;
}

.pagination {
  gap: 0.25rem;
  align-items: center;
}

.page-item {
  border: none;
}

.page-link {
  border: none;
  background: transparent;
  color: #6e6b7b;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-link:hover:not(.active-page):not(.dots):not(:disabled) {
  background-color: #f3f3f3;
  color: #13707f;
}

.page-link.active-page {
  background-color: #13707f !important;
  color: #ffffff !important;
  box-shadow: 0 4px 8px rgb(19, 112, 127);
}

.page-link.dots {
  cursor: default;
  background: transparent;
}

.page-link.dots:hover {
  background: transparent;
}

.icon-btn {
  background-color: #f8f8f8;
  color: #b9b9c3;
  font-size: 0.8rem;
}

.icon-btn:hover {
  background-color: #e0e0e0;
  color: #13707f;
}

.page-item.disabled .page-link {
  opacity: 0.5;
  pointer-events: none;
  background-color: transparent;
}

.form-select {
  cursor: pointer;
  padding-right: 2rem;
  background-position: right 0.5rem center;
}
</style>