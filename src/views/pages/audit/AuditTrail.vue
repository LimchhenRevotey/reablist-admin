<script setup>
import BaseTable from "@/components/ui/BaseTable.vue";

const columns = [
  { key: "timestamp", label: "កាលបរិច្ឆេទ និងម៉ោង" },
  { key: "admin", label: "អ្នកគ្រប់គ្រង" },
  { key: "action", label: "ប្រភេទសកម្មភាព" },
  { key: "target", label: "Target ID" },
  { key: "outcome", label: "លទ្ធផល" },
];

const rows = [
  {
    timestamp: "2025-10-24 10:20:01",
    admin: "Alex Thompson",
    action: "USER_STATUS_CHG",
    target: "UID#4012",
    outcome: "SUCCESS",
  },
  {
    timestamp: "2025-10-24 11:45:12",
    admin: "Alex Thompson",
    action: "USER_CREATE",
    target: "UID#4055",
    outcome: "SUCCESS",
  },
];
</script>

<template>
  <section class="container-fluid p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">ប្រវត្តិនៃការត្រួតពិនិត្យ</h3>
    </div>

    <div class="card overflow-hidden border-0 shadow-sm rounded-4">
      <BaseTable :columns="columns" :rows="rows">
        
        <!-- Admin column -->
        <template #cell-admin>
          
        </template>

        <!-- Action column -->
        <template #cell-action>
          
        </template>

        <!-- Outcome column -->
        <template #cell-outcome>
          
        </template>

      </BaseTable>
    </div>
  </section>
</template>
