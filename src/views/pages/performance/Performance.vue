<script setup>
import BaseTable from "@/components/ui/BaseTable.vue";
import { useNotesStore } from "@/stores/notesStore";
import { onMounted, ref } from "vue";
const notesStore = useNotesStore();

const columns = [
  { key: "user", label: "អ្នកប្រើប្រាស់", class: "ps-4 text-start", bodyClass: "ps-4 py-3 text-start",  },
  { key: "created", label: "ភារកិច្ចដែលបានបង្កើត", align: "center" },
  { key: "completed", label: "ភារកិច្ចដែលបានបញ្ចប់", align: "center" },
  { key: "efficiency", label: "ប្រសិទ្ធភាព", align: "end" },
];

let isLoading = ref(false);
onMounted(() => {
  getUsers();
});
const getUsers = async () => {
  isLoading.value = true;
  try {
    await notesStore.getAllNotes();
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section id="section-performance" class="content-section">
    <h3 class="fw-bold mb-4">ប្រសិទ្ធភាពនៃសកម្មភាពការងារ</h3>

    <div class="row g-4">
      <div class="col-md-12">
        <div class="card p-4 border-0 shadow-sm rounded-3">
          <h6 class="fw-bold mb-4">អ្នករួមចំណែកល្អបំផុត (ថ្ងៃនេះ)</h6>

          <BaseTable :columns="columns" :rows="notesStore.notes" :loading="isLoading" :perPage="5" :currentPage="1">
            <!-- Custom cell for user -->
            <template #cell-user="{ row }">
              <span class="fw-bold align-content-start">{{ row.fullname }}</span>
            </template>
            <!-- created -->
            <template #cell-created="{ row }">
              <span>{{ row.totalCreatedTasks }}</span>
            </template>
            <!-- completed -->
            <template #cell-completed="{ row }">
              <span>{{ row.totalCompletedTasks }}</span>
            </template>
            <!-- Custom cell for efficiency -->
            <template #cell-efficiency="{ row }">
              <span class="text-success fw-bold"> {{ row.effectivenessPercent }}% </span>
            </template>
          </BaseTable>
          <div v-if="notesStore.notes.length === 0 && !isLoading" class="text-center py-5 text-muted">
            រកមិនឃើញអ្នកប្រើប្រាស់
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
