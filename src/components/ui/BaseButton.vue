<script setup>
    defineProps({
        type: { String, default: 'button' },
        loading: { Boolean, default: false },
        background: { String, default: 'btn-teal' },
        icon: { String, default: '' },
        text: { String, default: 'text-white' },
    });

</script>

<template>
    <div>
        <button :class="`btn ${background} w-100 py-2 fw-bold ${text} mb-2 shadow-sm`" :type="type">
            <span v-if="loading"></span>
            <i v-else-if="icon" :class="icon"></i>
            <slot></slot>
        </button>
    </div>
</template>

<style scoped>
.btn-teal {
    background-color: #5b8c9d;
    border: none;
    transition: background-color 0.2s;
}

.btn-teal:hover {
    background-color: #4a7585;
}

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
.btn-custom-delete {
    background-color: #dc3545;
    border: none;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(220, 53, 69, 0.3);
}

.btn-lg-custom {
    padding: 10px 24px;
    font-size: 1rem;
    border-radius: 12px;
}
.btn-custom-light {
    background-color: #e0ebf0;
    border: none;
    color: #4b6b7a;
    font-size: 0.85rem;
    border-radius: 6px;
    
}

.btn-custom-light:hover {
    background-color: #d1dee4;
    color: #374f5b;
}
.btn-custom-teal {
    background-color: #3b6e7d;
    border: none;
    font-size: 0.85rem;
    border-radius: 6px;
}

.btn-custom-teal:hover {
    background-color: #2e5661;
}

</style>