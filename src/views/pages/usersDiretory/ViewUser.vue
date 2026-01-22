<script setup>
import { onMounted, ref } from 'vue';
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

const viewUser = async () => {
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
    <section class="container-fluid p-4">

        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center gap-3">
                <button class="btn btn-light text-dark py-2 rounded-circle text-decoration-none border-0" @click="$router.go(-1)">
                    <i class="bi bi-chevron-left" style="-webkit-text-stroke: 1px;"></i>
                </button>
                <h3 class="fw-bold mb-0">User profile insights</h3>
            </div>

            <button class="btn btn-custom-teal text-white px-4 py-2 rounded-2 d-flex align-items-center gap-2">
                <i class="bi bi-pencil-square"></i> Edit profile
            </button>
        </div>

        <div class="row g-4">

            <div class="col-lg-4">
                <div class="card border-0 shadow-sm rounded-4 p-3 h-100">
                    <div class="card-body text-center">

                        <div class="mb-3 position-relative d-inline-block">
                            <img :src="user?.avatar || 'https://via.placeholder.com/150'" class="rounded-circle"
                                width="120" height="120"
                                style="object-fit: cover; border: 4px solid #fff; box-shadow: 0 0 0 1px #dee2e6;">
                        </div>

                        <h4 class="fw-bold mb-1">{{ user?.fullname || 'Alex Thonpmas' }}</h4>
                        <p class="text-muted mb-3">{{ user?.email || 'thonpmasalex@gmail.com' }}</p>

                        <span class="badge rounded-pill px-4 py-2 mb-4 badge-soft-blue">
                            {{ user?.role?.name || 'Admin' }}
                        </span>

                        <hr class="my-4 text-muted opacity-25">

                        <div class="text-start px-2">
                            <div class="d-flex justify-content-between mb-3">
                                <span class="text-muted">Account Status:</span>
                                <span class="text-success fw-bold">{{ user?.status ? "ACTIVATED" : "DEACTIVATED"}}</span>
                            </div>
                            <div class="d-flex justify-content-between mb-3">
                                <span class="fw-medium text-secondary">Member Since :</span>
                                <span class="fw-bold text-dark">{{ formatDate(user?.registeredAt)}}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="fw-medium text-secondary">Last Login :</span>
                                <span class="fw-bold text-dark">2 mins ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-8">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
                    <div class="card-body">

                        <h5 class="fw-bold mb-4">Activity Summary</h5>

                        <div class="row g-3 mb-5">
                            <div class="col-md-4">
                                <div class="stat-box stat-gray p-4 rounded-4 text-center">
                                    <h2 class="fw-bold mb-1" style="color: #4b5563;">142</h2>
                                    <div class="small fw-bold text-secondary tracking-wide">TASKS CREATE</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="stat-box stat-blue p-4 rounded-4 text-center">
                                    <h2 class="fw-bold mb-1" style="color: #2563eb;">128</h2>
                                    <div class="small fw-bold text-primary-subtle tracking-wide"
                                        style="color: #60a5fa;">TASKS DONE</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="stat-box stat-green p-4 rounded-4 text-center">
                                    <h2 class="fw-bold mb-1" style="color: #16a34a;">90%</h2>
                                    <div class="small fw-bold text-success-subtle tracking-wide"
                                        style="color: #4ade80;">EFFICIENCY</div>
                                </div>
                            </div>
                        </div>

                        <h5 class="fw-bold mb-3">Recent Interaction Logo</h5>
                        <hr class="mb-4 text-muted opacity-25">

                        <div class="vstack gap-3">
                            <div class="d-flex align-items-center">
                                <div class="icon-circle me-3 text-success">
                                    <i class="bi bi-check-circle fs-5"></i>
                                </div>
                                <span class="fw-medium">Completed Tasks</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="icon-circle me-3 text-primary">
                                    <i class="bi bi-pencil-square fs-5"></i>
                                </div>
                                <span class="fw-medium">Created Tasks</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
.btn-custom-teal {
    background-color: #325e6d;
    border-color: #325e6d;
    font-weight: 500;
}
.btn-custom-teal:hover {
    background-color: #264b56;
}
.badge-soft-blue {
    background-color: #dbeafe;
    color: #2563eb;
    font-size: 0.9rem;
    font-weight: 600;
}
.stat-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 0.2s;
}

.stat-gray {
    background-color: #e3e8ef;
}
.stat-blue {
    background-color: #dbeafe;
}
.stat-green {
    background-color: #e8f5e9;
}
.tracking-wide {
    letter-spacing: 0.5px;
    font-size: 0.75rem;
    text-transform: uppercase;
}
</style>