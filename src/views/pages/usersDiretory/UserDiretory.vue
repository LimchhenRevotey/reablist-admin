<script setup>
import { onMounted, ref } from "vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import api from "@/api/api";

const users = ref([]);

const token = ref(localStorage.getItem("token") || null);
console.log(token.value);

onMounted(()=>{
  getUsers();
})

const getUsers = async () => {
  try{
    const res = await api.get('/users',{
      headers : {
        Authorization: `Bearer ${token.value}`,
      }
    });
    users.value = res.data.data.items; 
    console.log("Users:", users.value);
  }
  catch(error){
    console.log(error);
    
  }
}


function viewUser(user) {
  navigateToSection("view-user", user);
}

function updateUser(user) {
  navigateToSection("update-user", user);
}

function toggleStatus(user) {
  user.active = !user.active;
}
</script>

<template>
  <section id="section-users" class="content-section">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0">Users Directory</h4>
      <button class="btn btn-brand btn-sm d-flex align-items-center gap-2" onclick="navigateToSection('create-user')">
        <user-plus size="20"></user-plus> Create New User
      </button>
    </div>
    <div class="card overflow-hidden">
      <BaseTable :users="users" @view="viewUser" @edit="updateUser" @toggle-status="toggleStatus"></BaseTable>
    </div>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid var(--border-color);
  border-radius: var(--card-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  background: #fff;
  margin-bottom: 1.5rem;
}

.stat-card {
  padding: 1.75rem;
  border: none;
  transition: all 0.2s;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(19, 112, 127, 0.08);
}

.btn-brand {
  background-color: var(--brand-primary);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  border: none;
  transition: all 0.2s;
}

.btn-brand:hover {
  background-color: var(--brand-hover);
  color: white;
}

.table thead th {
  background: #daeaeb;
  font-size: 1rem;
  text-transform: uppercase;
  color: #13707f;
  padding: 1.25rem 1rem;
}

.badge-status {
  padding: 0.4em 0.8em;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 0.75rem;
}
</style>
