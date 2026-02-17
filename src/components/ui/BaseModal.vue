<script setup>
defineProps({
    show: { type: Boolean, default: false },
})

defineEmits(['close'])
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="modal-wrapper">
            <div class="modal-backdrop fade show" @click="$emit('close')"></div>
            <div class="modal fade show d-block" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                    <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                        <slot name="modal"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal {
    z-index: 1060;
}

.modal-content {
    background: white;
    position: relative;
}
</style>