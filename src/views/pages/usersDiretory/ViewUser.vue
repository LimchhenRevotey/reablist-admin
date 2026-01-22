<script setup>
import { onMounted , ref} from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api/api';
import { useDate } from '@/composible/UseDate';

const { formatDate } = useDate();

const route = useRoute();
const userId = route.params.id;

const user = ref({});

onMounted(() => {
  viewUser();
});

const viewUser = async() => {
  try {
    const res = await api.get(`/users/${userId}`);
    user.value = res.data.data;
    console.log(user.value);
    
  } catch (error) {
    console.error(error);
  }
};

</script>
<template>
    <section id="section-view-user" class="content-section">
        <div class="d-flex align-items-center gap-3 mb-4">
            <button class="btn btn-light btn-sm rounded-circle p-2" @click="$router.go(-1)">
                <chevron-left/>
            </button>
            <h4 class="fw-bold mb-0">User Profile</h4>
        </div>

        <div class="row g-4">
            <div class="col-lg-4">
                <div class="card p-4 text-center">
                    <img :src="user?.avatar" alt="User Avatar"
                        class="rounded-circle border mb-3 mx-auto" width="100">
                    <h5 class="fw-bold mb-1">{{ user?.fullname }}</h5>
                    <p class="text-muted small">{{ user?.email }}</p>
                    <span class="badge bg-primary mx-auto" style="width: fit-content;">{{ user?.role?.name }}</span>
                    <hr class="my-4">
                    <div class="text-start small">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Account Status:</span>
                            <span class="text-success fw-bold">{{ user?.status ? "ACTIVATED" : "DEACTIVATED" }}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Member Since:</span>
                            <span>{{ formatDate(user?.registeredAt) }}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-muted">Last Login:</span>
                            <span>2 mins ago</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card p-4">
                    <h6 class="fw-bold mb-4">Activity Summary</h6>
                    <div class="row g-3">
                        <div class="col-md-4">
                            <div class="bg-light p-3 rounded-4 text-center">
                                <h3 class="fw-bold mb-0">142</h3>
                                <small class="text-muted fw-bold">TASKS CREATED</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="bg-light p-3 rounded-4 text-center">
                                <h3 class="fw-bold mb-0">128</h3>
                                <small class="text-muted fw-bold">TASKS DONE</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="bg-light p-3 rounded-4 text-center">
                                <h3 class="fw-bold mb-0 text-success">90%</h3>
                                <small class="text-muted fw-bold">EFFICIENCY</small>
                            </div>
                        </div>
                    </div>
                    <h6 class="fw-bold mt-5 mb-3">Recent Interaction Logs</h6>
                    <div class="list-group list-group-flush small">
                        <div class="list-group-item px-0 py-2 border-0">
                            <i data-lucide="check-circle" size="14" class="text-success me-2"></i> Completed task
                            "Finalize UI"
                        </div>
                        <div class="list-group-item px-0 py-2 border-0">
                            <i data-lucide="plus-circle" size="14" class="text-primary me-2"></i> Created task "Review
                            Budget"
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>