<script setup>
import BaseInput from '@/components/ui/BaseInput.vue';
import { useAuthStore } from '@/stores/authStore';
import z, { string } from 'zod';
import { ref } from 'vue';
import router from '@/router';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import loginImage from '@/assets/images/bg-login.png';

let authStore = useAuthStore();
let email = ref('');
let password = ref('');
let error = ref('');
let loading = ref(false);
let showModal = ref(false);

const loginSham = z.object({
  email: z
    .string()
    .min(1, 'សូមបញ្ចូលអ៊ីមែលរបស់អ្នក!')
    .email("សូមបញ្ចូលអ៊ីមែលឱ្យបានត្រឹមត្រូវ!"),
  password: z
    .string()
    .min(1, 'សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក!')
    .min(8, 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៨ តួអក្សរ!')
});

const handleLogin = async () => {
  let result = loginSham.safeParse({
    email: email.value,
    password: password.value
  })
  authStore.message_error = "";
  error.value = {};
  if (!result.success) {
    let formated = result.error.format();
    error.value.email = formated.email?._errors[0] || '';
    error.value.password = formated.password?._errors[0] || '';
    return;
  }
  try {
    loading.value = true;
    await authStore.login(email.value, password.value);
    router.push('/dashboard');

  } catch (err) {
    showModal.value = true;
    if (err.message === "UNAUTHORIZED_ROLE") {
    } else {
        if (!authStore.message_error) {
             authStore.message_error = "អ៊ីមែល ឬពាក្យសម្ងាត់ដែលបានបញ្ចូលមិនត្រឹមត្រូវ។ សូមពិនិត្យមើល និងព្យាយាមម្តងទៀត។";
        }
    }
  } finally {
    loading.value = false;
  }
}
const closeModal = () => {
  showModal.value = false;
}

</script>

<template>
  <div class="container-fluid min-vh-100 position-relative overflow-hidden bg-white p-4 d-flex align-items-center">
    <div class="shape-main"></div>
    <div class="shape-bottom-left"></div>
    <div class="shape-bottom-right"></div>
    <div class="row g-0 w-100 position-relative" style="z-index: 2;">
      <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center ps-5 text-white">
        <div class="p-5" style="max-width: 650px;">
          <img :src="loginImage" alt="Login Background" class="img-fluid rounded-4 shadow-sm">
        </div>
      </div>
      <div class="col-lg-6 d-flex align-items-center justify-content-center p-4">
        
        <div class=" w-100" style="max-width: 450px;">
          <h1 class="fw-bold text-dark mb-2" style="font-size: 3rem;">ចូលប្រើប្រាស់</h1>
          <p class="text-secondary mb-2">សូមបញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីបន្ត។</p>

          <form action="" @submit.prevent="handleLogin">
            <BaseInput label="អ៊ីមែល" type="email" placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក" :message_error="error.email"
              v-model="email">
            </BaseInput>
            <BaseInput label="ពាក្យសម្ងាត់" type="password" placeholder="បញ្ចូលពាក្យសម្ងាត់របស់អ្នក"
              :message_error="error.password" v-model="password">
            </BaseInput>
            <br>
            <BaseButton type="submit" :loading="loading">
              {{ loading ? 'កំពុងដំណើរការ...' : 'ចូលប្រើប្រាស់' }}
            </BaseButton>
          </form>
        </div>
      </div>
    </div>

    <BaseModal :show="showModal">
      <template #modal>
        <div class="modal-content p-4 rounded-5 text-center">
          <div class="mb-3 mt-2 icon-box text-danger opacity-75">
            <i class="bi bi-exclamation-triangle-fill"></i>
          </div>
          <h2 class="fw-bold mb-2 text-dark">ការចូលប្រើប្រាស់បរាជ័យ</h2>
          <p class="text-muted mb-4 fs-6">
            {{ authStore.message_error }}
          </p>
          <div class="d-flex justify-content-center gap-3 mb-2">
            <BaseButton type="button" background="btn-custom-cancel btn-lg-custom" text="text-black"
              @click="closeModal">
              បិទ
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.social-btn {
  width: 50px;
  height: 50px;
  transition: transform 0.2s;
}

.social-btn:hover {
  transform: translateY(-2px);
  background-color: #f8f9fa;
}

.shape-main {
  position: absolute;
  top: -10%;
  left: -20%;
  width: 70vw;
  height: 120vh;
  background-color: #427c87;
  border-radius: 50%;
  z-index: 1;
}

.icon-box {
  font-size: 80px;
  line-height: 1;
}

.shape-bottom-left {
  position: absolute;
  bottom: -150px;
  left: -100px;
  width: 350px;
  height: 350px;
  background-color: #32606a;
  border-radius: 50%;
  z-index: 2;
  opacity: 0.9;
}

.shape-bottom-right {
  position: absolute;
  bottom: -200px;
  right: -150px;
  width: 400px;
  height: 400px;
  background-color: #32606a;
  border-radius: 50%;
  z-index: 1;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 13px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

input[type="checkbox"] {
  accent-color: #427c87;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkbox-container label {
  color: #333;
  margin: 0;
  cursor: pointer;
}

.forgot-link {
  color: #427c87;
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 991px) {
  .shape-main {
    width: 150%;
    height: 50vh;
    left: -25%;
    top: -10%;
    border-radius: 0 0 50% 50%;
  }
}
</style>