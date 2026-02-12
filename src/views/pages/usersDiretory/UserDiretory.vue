<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";
import BaseTable from "@/components/ui/BaseTable.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import { UserPlus, Eye } from "lucide-vue-next";

const router = useRouter();
const isLoading = ref(false);
const users = ref([]);
const isShowModal = ref(false);

const columns = [
  { key: "avatar", label: "រូបភាព", class: "d-none d-md-table-cell", bodyClass: "d-none d-md-table-cell" },
  { key: "user", label: "ព័ត៌មានអ្នកប្រើប្រាស់", class: "text-start ps-4", bodyClass: "text-start ps-4 py-3" },
  { key: "role", label: "តួនាទី", class: "d-none d-md-table-cell", bodyClass: "d-none d-md-table-cell" },
  { key: "status", label: "ស្ថានភាព", class: "d-none d-sm-table-cell", bodyClass: "d-none d-sm-table-cell" },
];

const getUsers = async () => {
  isLoading.value = true;
  try {
    const res = await api.get('/users?_page=1&_per_page=100&sortBy=id&sortDir=DESC');
    users.value = res.data.data?.items || [];
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    isLoading.value = false;
  }
}

const toggleStatus = async (user) => {
  if (!user) return;
  const oldStatus = user.status;
  const newStatus = oldStatus === 'ACTIVATED' ? "DEACTIVATED" : "ACTIVATED";
  user.status = newStatus;
  try {
    await api.put(`/users/${user.id}`, { status: newStatus });
  } catch (error) {
    user.status = oldStatus;
    isShowModal.value = true;
  }
}

const viewUser = (user) => router.push({ name: "View-User", params: { id: user.id } });
const createUser = () => router.push({ name: "CreateUser" });

onMounted(getUsers);
</script>

<template>
  <div class="user-page p-2 p-md-4">
    <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
      <h3 class="fw-bold mb-0">បញ្ជីឈ្មោះអ្នកប្រើប្រាស់</h3>
      <button class="btn btn-brand d-flex align-items-center justify-content-center gap-2" @click="createUser">
        <UserPlus :size="18" /> បង្កើតអ្នកប្រើប្រាស់ថ្មី
      </button>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div class="p-3 p-md-4">
        <BaseTable :columns="columns" :rows="users" :loading="isLoading" :perPage="5">
          <template #cell-avatar="{ row }">
            <img :src="row.avatar" class="rounded-circle border" width="40" height="40" style="object-fit: cover;" />
          </template>

          <template #cell-user="{ row }">
            <div class="fw-bold text-dark">{{ row.fullname }}</div>
            <div class="text-muted small text-truncate" style="max-width: 180px;">{{ row.email }}</div>
          </template>

          <template #cell-role="{ row }">
            <span class="badge rounded-pill px-3 py-2"
              :class="row.role?.name?.toLowerCase().includes('admin') ? 'bg-primary-subtle text-primary' : 'bg-info-subtle text-info'">
              {{ row.role?.name }}
            </span>
          </template>

          <template #cell-status="{ row }">
            <span class="badge-status" @click="toggleStatus(row)"
              :class="row.status === 'ACTIVATED' ? 'active-st' : 'inactive-st'">
              <i class="bi me-1" :class="row.status === 'ACTIVATED' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'"></i>
              {{ row.status }}
            </span>
          </template>

          <template #actions="{ row }">
            <button class="btn-view-modern" @click="viewUser(row)">
              <Eye :size="18" />
            </button>
          </template>
        </BaseTable>
      </div>
    </div>

    <BaseModal :show="isShowModal" @close="isShowModal = false">
      <template #modal>
        <div class="p-4 text-center">
          <i class="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
          <h4 class="fw-bold mt-3">កំហុស!</h4>
          <p class="text-muted">មិនអាចផ្លាស់ប្ដូរស្ថានភាពបានទេ។</p>
          <button class="btn btn-danger w-100 rounded-3 mt-3" @click="isShowModal = false">បិទ</button>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.btn-brand {
  background: #13707f;
  color: white;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 700;
  border: none;
}

.badge-status {
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.7rem;
  cursor: pointer;
  transition: 0.2s;
  display: inline-flex;
  align-items: center;
}

.active-st {
  background: #dcfce7;
  color: #15803d;
}

.inactive-st {
  background: #fee2e2;
  color: #b91c1c;
}

.btn-view-modern {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: #e0f2fe;
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.btn-view-modern:hover {
  background: #0284c7;
  color: white;
}
</style>