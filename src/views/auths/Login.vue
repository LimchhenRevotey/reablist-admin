<script setup>
import BaseInput from '@/components/ui/BaseInput.vue';
import { useAuthStore } from '@/stores/authStore';
import z, { string } from 'zod';
import { ref } from 'vue';
import router from '@/router';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import loginImage from '@/assets/images/login-img.png';

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
  <div class="login-wrapper container-fluid min-vh-100 d-flex align-items-center justify-content-center ">
    <div class="card border-0 position-relative overflow-hidden d-flex flex-column justify-content-center ">
      <div class="shape-main"></div>
      <div class="shape-bottom-left "></div>
      <div class="shape-bottom-center"></div>
      <div class="shape-bottom-right"></div>
      <div class="shape-top"></div>
      <div class="row g-0 w-100 " style="z-index: 2; max-width: 1200px;">
        <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center ps-2 text-white images-left">
          <div  style="max-width: 550px;" class="px-4">
            <img :src="loginImage" alt="Login Background" class="img-fluid w-75">
          </div>
        </div>
        <div class="col-lg-6 d-flex align-items-center justify-content-center p-4 p-lg-5">

          <div class=" w-100" style="max-width: 450px;">
            <h1 class="fw-bold text-dark mb-2 fs-1" style="font-size: 2.5rem;">ចូលប្រើប្រាស់គណនី</h1>
            <p class="text-secondary mb-2 ">សូមបញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីបន្ត</p>

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

.login-wrapper {
  position: relative;
  background-color: #9bc3cb;
  min-height: 100vh;
  overflow: hidden;
}

.card {
  width: 1000px;
  height: 600px;
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
}

.images-left {
  margin-bottom: 130px;
}

.social-btn {
  width: 50px;
  height: 50px;
  transition: transform 0.2s;
}

.social-btn:hover {
  transform: translateY(-2px);
  background-color: #f8f9fa;
}

.icon-box {
  font-size: 80px;
  line-height: 1;
}



.shape-main {
  position: absolute;
  top: -20%;
  left: -16%;
  width: 44vw;
  height: 85vh;
  background-color: #427c87;
  border-radius: 50%;
  z-index: 1;
}

.shape-bottom-left {
  position: absolute;
  bottom: -90px;
  left: -150px;
  width: 300px;
  height: 300px;
  background: linear-gradient(180deg,#65afbc, #32606a);
  border-radius: 50%;
  box-shadow: 1px 4px 20px rgba(216, 215, 215, 0.1);
  z-index: 10;
}

.shape-bottom-center {
  position: absolute;
  bottom: 25px;
  left: 26%;
  transform: translateX(-50%);
  width: 160px;
  height: 160px;
  background: linear-gradient(180deg,#65afbc, #32606a);
  border-radius: 50%;
  z-index: 10;
}

.shape-bottom-right {
  position: absolute;
  bottom: -130px;
  right: -150px;
  width: 270px;
  height: 270px;
  background: linear-gradient(100deg,#4b98a5, #32606a);
  border-radius: 50%;
  box-shadow: 1px 4px 20px rgba(216, 215, 215, 0.1);
  z-index: 1;
}

.shape-top {
  position: absolute;
  top: -130px;
  right: -100px;
  width: 270px;
  height: 270px;
  background: linear-gradient(100deg,#4b98a5, #32606a);
  border-radius: 50%;
  box-shadow: 1px 4px 20px rgba(216, 215, 215, 0.1);
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
  .card {
    width: 90%;
    height: auto;
    min-height: 520px;
  }

  .shape-main {
    width: 70vw;
    height: 70vh;
    top: -25%;
    left: -30%;
  }

  .shape-bottom-left {
    width: 220px;
    height: 220px;
    left: -120px;
    bottom: -100px;
  }

  .shape-bottom-center {
    width: 130px;
    height: 130px;
    left: 30%;
    bottom: 30px;
  }

  .shape-bottom-right {
    width: 220px;
    height: 220px;
    right: -120px;
    bottom: -120px;
  }

  .shape-top {
    width: 220px;
    height: 220px;
    right: -120px;
    top: -120px;
  }
}



@media (max-width: 576px) {
  .card {
    width: 92%;
    height: auto;
    padding: 24px;
  }

  .images-left {
    margin-bottom: 40px;
  }

  .icon-box {
    font-size: 60px;
  }

  .shape-main {
    width: 63%;
    height: 32vh;
    left: -20%;
    top: -22%;
  }

  .shape-bottom-left {
    width: 160px;
    height: 160px;
    left: -90px;
    bottom: -50px;
  }

  .shape-bottom-center {
    width: 130px;
    height: 130px;
    left: 20%;
    bottom: -60px;
  }

  .shape-bottom-right {
    width: 160px;
    height: 160px;
    right: -60px;
    bottom: -60px;
  }

  .shape-top {
    width: 150px;
    height: 150px;
    right: -60px;
    top: -50px;
  }
}


</style>