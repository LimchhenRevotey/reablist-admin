<script setup>
import { onMounted, computed } from "vue";
import { useRoleStore } from "@/stores/roleStore";
import BaseTable from "@/components/ui/BaseTable.vue";
const roleStore = useRoleStore();;

onMounted(() => {
  roleStore.getRoles();
});

// table columns
const columns = [
  { key: "name", label: "ឈ្មោះតួនាទី", class: "ps-4 text-start", bodyClass: "ps-4 py-3 text-start fw-bold", },
  { key: "getAll", label: "ទាញយកទិន្នន័យអ្នកប្រើប្រាស់ទាំងអស់", },
  { key: "getOne", label: "ទាញយកទិន្នន័យអ្នកប្រើប្រាស់ម្នាក់ៗ", },
  { key: "create", label: "បង្កើតអ្នកប្រើប្រាស់ថ្មី", },
  { key: "status", label: "ផ្លាស់ប្តូរស្ថានភាព", },
];
// rows
const rows = computed(() => roleStore.roles);

// helper
const isAdmin = (role) =>
  role.name?.toLowerCase() === "admin";

</script>

<template>
  <section class="role-page-container">
    <h3 class="fw-bold mb-4">RBAC: ការអនុញ្ញាត</h3>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
      <div class="card-body p-0 d-flex flex-column">
        <h6 class="fw-bold p-4 mb-0">ការចូលប្រើប្រាស់ Endpoint តាមតួនាទី</h6>

        <div class="table-content-area p-4 pt-0">
          <BaseTable :columns="columns" :rows="rows" :loading="roleStore.isLoading" :perPage="10">
            <template #cell-getAll>
              <i class="bi bi-check-circle-fill text-success"></i>
            </template>
            <template #cell-getOne>
              <i class="bi bi-check-circle-fill text-success"></i>
            </template>
            <template #cell-create="{ row }">
              <i v-if="isAdmin(row)" class="bi bi-check-circle-fill text-success"></i>
              <i v-else class="bi bi-x-circle-fill text-danger"></i>
            </template>
            <template #cell-status="{ row }">
              <i v-if="isAdmin(row)" class="bi bi-check-circle-fill text-success"></i>
              <i v-else class="bi bi-x-circle-fill text-danger"></i>
            </template>
          </BaseTable>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.role-page-container {
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-content-area {
  flex-grow: 1;
  overflow: hidden;
}
</style>
