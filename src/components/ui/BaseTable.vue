<script setup>
  defineProps({
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  });
</script>
<template>
  <table class="table mb-0">
    <thead>
      <tr class="text-center">
        <th v-for="col in columns" :key="col.key" :class="col.class">
          {{ col.label }}
        </th>
        <th v-if="$slots.actions">សកម្មភាព</th>
      </tr>
    </thead>

    <tbody class="align-middle text-center">
      <tr v-for="row in rows" :key="row.id">
        <td v-for="col in columns" :key="col.key" :class="col.bodyClass">
          <!-- Custom cell -->
          <slot :name="`cell-${col.key}`" :row="row">
            {{ row[col.key] }}
          </slot>
        </td>

        <!-- Actions -->
        <td v-if="$slots.actions">
          <slot name="actions" :row="row" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
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
</style>
