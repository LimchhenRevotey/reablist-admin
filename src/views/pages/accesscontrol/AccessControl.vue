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
  <section id="section-roles" class="content-section ">
    <h3 class="fw-bold mb-4">
      RBAC: ការអនុញ្ញាតសម្រាប់ Admin និងអ្នកប្រើប្រាស់
    </h3>

    <div class="row g-4">
      <div class="col-12">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <h6 class="fw-bold mb-4">
            ការចូលប្រើប្រាស់ Endpoint តាមតួនាទី
          </h6>

          <div class="table-responsive rounded-4 ">
            <BaseTable :columns="columns" :rows="rows" :loading="roleStore.isLoading" :perPage="5">

              <!-- Get all users -->
              <template #cell-getAll>
                <check-circle class="text-success" />
              </template>

              <!-- Get single user -->
              <template #cell-getOne>
                <check-circle class="text-success" />
              </template>

              <!-- Create user -->
              <template #cell-create="{ row }">
                <check-circle v-if="isAdmin(row)" class="text-success" />
                <x-circle v-else class="text-danger" />
              </template>

              <!-- Change status -->
              <template #cell-status="{ row }">
                <check-circle v-if="isAdmin(row)" class="text-success" />
                <x-circle v-else class="text-danger" />
              </template>

            </BaseTable>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
