<script setup>
defineProps({
    label: { Boolean, default: '' },
    type: { String, default: 'text' },
    placeholder: { String, default: '' },
    message_error: { String, default: '' },
    modelValue: { String, default: '' }
});
const emit = defineEmits(['update:modelValue']);
const onInput = (event) => {
    console.log(event.target.value);
    emit("update:modelValue", event.target.value);
}



</script>

<template>
    <div>
        <div class="mb-2">
            <label class="form-label fw-bold small text-teal">{{ label }}</label>
            <input :type="type" :placeholder="placeholder" :value="modelValue"
                class="custom-input form-control form-control-lg border-0 fs-6" 
                @input="onInput"
            >
            <small class="text-danger fs-7">{{ message_error }}</small>
        </div>

    </div>
</template>

<style scoped>
/* Input Styles */
.text-teal {
  color: #427c87 !important;
}

.custom-input {
  background-color: #e0ecee;
  padding: 12px 14px;
}
.custom-input::placeholder {
    color: #8faab6;
}

.custom-input:focus {
  background-color: #e0ecee;
  box-shadow: 0 0 0 2px #427c87;
}
</style>