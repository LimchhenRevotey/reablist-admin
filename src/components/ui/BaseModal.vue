<script setup>
defineProps({
    show: { type: Boolean, default: false },
    title: { type: String, default: 'Confirm Action' },
    message: { type: String, default: 'Are you sure you want to proceed?' },
    confirmText: { type: String, default: 'Confirm' }
})
const emit = defineEmits(['close', 'confirm'])
</script>

<template>
    <div v-if="show">
        <div class="modal fade show" tabindex="-1" style="display: block;" role="dialog">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <div class="modal-content p-4 rounded-5 text-center">

                    <div class="mb-3 mt-2 icon-box text-danger opacity-75">
                        <i class="bi bi-exclamation-triangle-fill"></i>
                    </div>

                    <h2 class="fw-bold mb-2 text-dark">{{ title }}</h2>
                    <p class="text-muted mb-4 fs-6">
                        {{ message }}
                    </p>

                    <div class="d-flex justify-content-center gap-3 mb-2">
                        <button type="button" class="btn btn-custom-cancel btn-lg-custom" @click="$emit('close')">
                            Cancel
                        </button>

                        <button type="button"
                            class="btn btn-danger btn-custom-delete btn-lg-custom d-flex align-items-center gap-2"
                            @click="$emit('confirm')">
                            <i class="bi bi-trash3-fill"></i> {{ confirmText }}
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show"></div>
    </div>
</template>

<style scoped>
/* Custom Styles to match the image exactly */
body {
    background-color: #f0f2f5;
    /* Just for demo visibility */
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    border: none;
    /* Remove default border */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    /* Soft shadow */
}

.icon-box {
    font-size: 80px;
    /* Size of the warning icon */
    line-height: 1;
}

/* Custom styling for the Cancel button to match the grey */
.btn-custom-cancel {
    background-color: #e2e6ea;
    color: #212529;
    border: none;
    font-weight: 600;
}

.btn-custom-cancel:hover {
    background-color: #dbe0e5;
    color: #000;
}

/* Custom styling for the Delete button */
.btn-custom-delete {
    background-color: #dc3545;
    border: none;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(220, 53, 69, 0.3);
    /* Red shadow */
}

.btn-lg-custom {
    padding: 10px 24px;
    font-size: 1rem;
    border-radius: 12px;
    /* Smooth button corners */
}
</style>