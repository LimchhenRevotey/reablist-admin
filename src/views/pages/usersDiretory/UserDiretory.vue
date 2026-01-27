<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";
import BaseTable from "@/components/ui/BaseTable.vue";

const router = useRouter();
const users = ref([]);
const isLoading = ref(false);

/* Columns definition */
const columns = [
  { key: "user", label: "ព័ត៌មានលម្អិតអ្នកប្រើប្រាស់", class: "ps-4 text-start", bodyClass: "ps-4 py-3 text-start", },
  { key: "role", label: "តួនាទី" },
  { key: "status", label: "ស្ថានភាពគណនី" },
];

onMounted(() => {
  getUsers();
});

// Get All Users
const getUsers = async () => {
  isLoading.value = true;
  try {
    const res = await api.get('/users?_page=1&_per_page=100&search&sortBy=id&sortDir=DESC');
    users.value = res.data.data?.items || res.data.data || [];
    console.log("Fetched Users:", users.value);
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    isLoading.value = false;
  }
}

// Actions 
const viewUser = (user) => {
  router.push({ name: "View-User", params: { id: user.id } });
};

const createUser = () => {
  router.push({ name: "CreateUser" });
};

// Change User Status
const toggleStatus = async (user) => {
  const isActive = user.status === 'ACTIVATED';
  const newStatus = isActive ? "DEACTIVATED" : "ACTIVATED";
  const oldStatus = user.status;
  user.status = newStatus;

  try {
    await api.put(`/users/${user.id}`, {
      status: newStatus
    });
    console.log(`User ${user.id} status updated to ${newStatus}`);
  } catch (error) {
    console.error("Failed to update status:", error);
    user.status = oldStatus;
    alert("Failed to update status. Please try again.");
  }
}
</script>

<template>
  <section class="container-fluid p-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">បញ្ជីឈ្មោះអ្នកប្រើប្រាស់</h3>
      <div class="d-flex gap-2">
        <button class="btn btn-brand btn-sm d-flex align-items-center gap-2" @click="createUser">
          <UserPlus :size="20" />
          បង្កើតអ្នកប្រើប្រាស់ថ្មី
        </button>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-12">
        <div class="card border-0 shadow-sm rounded-4 p-4">
          <h6 class="fw-bold mb-4">
            បញ្ជីឈ្មោះអ្នកប្រើប្រាស់ទាំងអស់
          </h6>
          <div class="table-responsive rounded-4 ">
            <div class="card overflow-hidden border-0 shadow-sm rounded-4">
              <BaseTable :columns="columns" :rows="users" :loading="isLoading" :perPage="10" :currentPage="1">

                <template #cell-user="{ row }">
                  <div class="fw-bold text-dark">{{ row.fullname }}</div>
                  <div class="text-muted small">{{ row.email }}</div>
                </template>

                <template #cell-role="{ row }">
                  <span class="badge rounded-pill px-3 py-2" :class="row.role?.name?.toLowerCase().includes('admin')
                    ? 'bg-primary-subtle text-primary'
                    : 'bg-info-subtle text-info'">
                    {{ row.role?.name || 'User' }}
                  </span>
                </template>

                <template #cell-status="{ row }">
                  <span class="badge-status cursor-pointer" @click="toggleStatus(row)" :class="(row.status === 'ACTIVATED')
                    ? 'bg-success-subtle text-success'
                    : 'bg-danger-subtle text-danger'">

                    <i class="bi me-1" :class="(row.status === 'ACTIVATED')
                      ? 'bi-check-circle-fill'
                      : 'bi-x-circle-fill'">
                    </i>

                    {{ (row.status === 'ACTIVATED') ? "ACTIVATED" : "DEACTIVATED" }}
                  </span>
                </template>

                <template #actions="{ row }">
                  <div class="d-flex align-items-center justify-content-center gap-2">
                    <button class="btn-action-modern btn-view" title="View Profile" @click="viewUser(row)">
                      <Eye :size="18" />
                    </button>
                  </div>
                </template>

              </BaseTable>

              <div v-if="users.length === 0 && !isLoading" class="text-center py-5 text-muted">
                រកមិនឃើញអ្នកប្រើប្រាស់
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.btn-brand {
  background-color: var(--brand-primary);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-brand:hover {
  background-color: var(--brand-primary);
}

.badge-status {
  padding: 0.35em 0.8em;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s;
  user-select: none;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  opacity: 0.8;
}

.btn-action-modern.btn-view {
  color: #0284c7;
}

.btn-action-modern {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid transparent;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-action-modern.btn-view:hover {
  background-color: #e0f2fe;
  color: #0284c7;
}

/* Animation for Refresh */
.spin-anim {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>