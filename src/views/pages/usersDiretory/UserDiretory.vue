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
const createUser = () => {
  router.push({ name: "CreateUser" });
};
</script>

<template>
  <section id="section-users" class="content-section">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0">Users Directory</h4>
      <button class="btn btn-brand btn-sm d-flex align-items-center gap-2" @click="createUser">
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
        <template #actions="{ row }">
          <div class="d-flex align-items-center justify-content-center">
            <button class="btn-action-modern btn-view action-view" title="View Profile" @click="viewUser(row)">
              <eye />
            </button>
            <button class="btn-action-modern btn-edit action-edit" title="Edit User" @click="updateUser(row)">
              <square-pen />
            </button>
          </div>
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

.btn-action-modern.action-edit {
  color: #9333ea;
}

.btn-action-modern.action-view {
  color: #0284c7;
}

.btn-action-modern {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: 1px solid transparent;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
}


.btn-action-modern.btn-view:hover {
  background-color: #e0f2fe;
  border-color: #bae6fd;
  color: #0284c7;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-action-modern.btn-edit:hover {
  background-color: #f3e8ff;
  border-color: #e9d5ff;
  color: #9333ea;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-action-modern:active {
  transform: translateY(0);
  box-shadow: none;
}
</style>
