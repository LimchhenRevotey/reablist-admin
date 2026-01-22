<script setup>
import { ref, onMounted } from "vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import api from "@/api/api";
import { useRouter } from "vue-router";

const router = useRouter();

const users = ref([]);


/* Columns definition */
const columns = [
  {
    key: "user",
    label: "User Details",
    class: "ps-4 text-start",
    bodyClass: "ps-4 py-3 text-start",
  },
  { key: "role", label: "Role" },
  { key: "status", label: "Account Status" },
];

onMounted(() => {
  getUsers();
});

async function getUsers() {
  try {
    const res = await api.get("/users");
    users.value = res.data.data.items;
    console.log(users.value);
    
  } catch (error) {
    console.error(error);
  }
}


/* Actions */
const viewUser = (user) => {
  router.push({ name: "View-User", params: { id: user.id } });
};

const updateUser = (user) => {
  router.push({ name: "UpdateUser", params: { id: user.id } });
};



function toggleStatus(user) {
  user.status = !user.status;
}
</script>

<template>
  <section id="section-users" class="content-section">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0">Users Directory</h4>

      <button class="btn btn-brand btn-sm d-flex align-items-center gap-2" onclick="navigateToSection('create-user')">
        <user-plus size="20" />
        Create New User
      </button>
    </div>

    <div class="card overflow-hidden">
      <BaseTable :columns="columns" :rows="users">

        <!-- User details -->
        <template #cell-user="{ row }">
          <div class="fw-bold">{{ row.fullname }}</div>
          <div class="text-muted small">{{ row.email }}</div>
        </template>

        <!-- Role -->
        <template #cell-role="{ row }">
          <span class="badge" :class="row.role?.name.trim().toLowerCase() === 'admin'
            ? 'bg-primary-subtle text-primary'
            : 'bg-danger-subtle text-danger'">
            {{ row.role?.name }}
          </span>
        </template>

        <!-- Status -->
        <template #cell-status="{ row }">
          <span class="badge-status" :class="row.status
            ? 'bg-success-subtle text-success'
            : 'bg-danger-subtle text-danger'">
            {{ row.status ? "ACTIVATED" : "DEACTIVATED" }}
          </span>
        </template>

        <!-- Actions -->
        <template #actions ="{ row }">

          <button class="btn btn-sm action-edit ms-1"  title="View" @click="viewUser(row)">
            <eye />
          </button>
          
          <button class="btn btn-sm action-view" title="Edit" @click="updateUser(row)" >
            <square-pen />
          </button>

          

        </template>

      </BaseTable>
    </div>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid var(--border-color);
  border-radius: var(--card-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  background: #fff;
}

.btn-brand {
  background-color: var(--brand-primary);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
}

.badge-status,
.badge {
  padding: 0.4em 0.8em;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 0.75rem;
}

.action-view {
  color: #0d6dfd96;
}

.action-edit {
  color: #1987549c;
}

.action-delete {
  color: #dc3546c3;
}
</style>
