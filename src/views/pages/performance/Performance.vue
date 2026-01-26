<script setup>
import BaseTable from "@/components/ui/BaseTable.vue";
const columns = [
  { key: "user", label: "អ្នកប្រើប្រាស់" },
  { key: "created", label: "ភារកិច្ចដែលបានបង្កើត", align: "center" },
  { key: "completed", label: "ភារកិច្ចដែលបានបញ្ចប់", align: "center" },
  { key: "efficiency", label: "ប្រសិទ្ធភាព", align: "end" },
];

const rows = [
  {
    user: "Mark Wilson",
    created: 42,
    completed: 38,
    efficiency: 90.4,
  },
  {
    user: "Jane Doe",
    created: 15,
    completed: 14,
    efficiency: 93.3,
  },
];
</script>

<template>
  <section id="section-performance" class="content-section">
    <h3 class="fw-bold mb-4">ប្រសិទ្ធភាពនៃសកម្មភាពការងារ</h3>

    <div class="row g-4">
      <div class="col-md-12">
        <div class="card p-4 border-0 shadow-sm rounded-3">
          <h6 class="fw-bold mb-4">អ្នករួមចំណែកល្អបំផុត (ថ្ងៃនេះ)</h6>

          <BaseTable :columns="columns" :rows="rows">
            <!-- Custom cell for user -->
            <template #cell-user="{ row }">
              <span class="fw-bold">{{ row.user }}</span>
            </template>

            <!-- Custom cell for efficiency -->
            <template #cell-efficiency="{ row }">
              <span class="text-success fw-bold"> {{ row.efficiency }}% </span>
            </template>
          </BaseTable>
        </div>
      </div>
    </div>
  </section>
</template>
