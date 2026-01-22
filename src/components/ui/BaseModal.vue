<script setup>
defineProps({
    show: { type: Boolean, default: false },
})

</script>

<template>
    <div v-if="show">
        <div class="modal fade show" tabindex="-1" style="display: block;" role="dialog">
            <div class="modal-dialog modal-dialog-centered" style="max-width: 400px;">
                <slot name="modal"></slot>
            </div>
        </div>
        <div class="modal-backdrop fade show"></div>
    </div>
</template>
<style scoped>

</style>