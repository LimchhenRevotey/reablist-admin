<template>
  <table class="table mb-0">
    <thead>
      <tr class="text-center">
        <th class="ps-4 text-start">User Details</th>
        <th>Role</th>
        <th>Account Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class="align-middle text-center">
      <tr v-for="user in users" :key="user.id">
        <td class="ps-4 py-3 text-start">
          <div class="fw-bold">{{ user.fullname }}</div>
          <div class="text-muted small">{{ user.email }}</div>
        </td>

        <td>
          <span
            class="badge"
            :class="
              user.role?.name .trim().toLowerCase() === 'admin'
                ? 'bg-primary-subtle text-primary'
                : 'bg-danger-subtle text-danger'
            "
          >
            {{ user.role?.name }}
          </span>
        </td>

        <td>
          <span
            class="badge-status"
            :class="
              user.status
                ? 'bg-success-subtle text-success'
                : 'bg-danger-subtle text-danger'
            "
          >
            {{ user.status ? "Active" : "Activated" }}
          </span>
        </td>

        <td class="text-center">
          <button
            class="btn btn-sm action-view"
            title="View Detail"
            @click="$emit('view', user)"
          >
            <square-pen />
          </button>

          <button
            class="btn btn-sm action-edit ms-1"
            title="Update User"
            @click="$emit('edit', user)"
          >
            <eye />
          </button>

          <button class="btn btn-sm ms-1 action-delete" title="Toggle Status">
            <trash />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
});
</script>

<style>
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

.badge-status {
  padding: 0.4em 0.8em;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 0.75rem;
}
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
