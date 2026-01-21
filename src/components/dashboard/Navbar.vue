<script setup>


</script>

<template>
    <header class="top-navbar">
        <div class="d-flex align-items-center">
            <button class="btn btn-light d-lg-none me-3" id="sidebar-toggle">
                <i class="bi bi-justify"></i>
            </button>
            <div class="input-group d-none d-md-flex" id="global-search-container" style="width: 380px;">
                <span class="input-group-text bg-light border-0"><i class="bi bi-search" size="18"></i></span>
                <input type="text" class="form-control bg-light border-0" id="global-search"
                    placeholder="Search across platform...">
            </div>
        </div>

        <div class="d-flex align-items-center gap-3">
            <div class="d-flex align-items-center gap-2 border-end pe-3">
                <div class="text-end d-none d-sm-block">
                    <div class="fw-bold small">Alex Thompson</div>
                    <div class="text-muted"
                        style="font-size: 10px; font-weight: 800; color: var(--brand-primary) !important;">ROOT ACCESS
                    </div>
                </div>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" class="rounded-circle border"
                    width="40" alt="Admin">

            </div>
            <button type="button" class="btn btn-outline-success position-relative rounded-pill">
                <Bell />
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    99+
                    <span class="visually-hidden">unread messages</span>
                </span>
            </button>
        </div>
    </header>
</template>

<style scoped>
.top-navbar {
    height: 80px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3rem;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.root-badge {
    font-size: 10px;
    font-weight: 800;
    color: var(--brand-primary) !important;
}
</style>
