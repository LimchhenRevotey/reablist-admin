<script setup>
import Navbar from '@/components/dashboard/Navbar.vue';
import Sidebar from '@/components/dashboard/Sidebar.vue';

</script>

<template>
    <div class="d-flex">
        <!-- silebar  -->
        <Sidebar></Sidebar>
        <!-- Main area -->
        <div class="flex-grow-1 min-vh-100 bg-light" id="main-wrapper">
            <!-- navbar  -->
            <Navbar></Navbar>
            <!-- Page content -->
            <main class="p-4 p-lg-5">
                <!-- content  -->
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>
<style scoped>
#main-wrapper {
    margin-left: var(--sidebar-width);
    min-height: 100vh;
    transition: all 0.3s ease;
}

@media (max-width: 991px) {
    #main-wrapper {
        margin-left: 0 !important;
    }
}
</style>