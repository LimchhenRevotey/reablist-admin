<script setup>
import BaseInput from '@/components/ui/BaseInput.vue';
import { useAuthStore } from '@/stores/authStore';
import z, { string } from 'zod';
import { ref } from 'vue';
import router from '@/router';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
let authStore = useAuthStore();
let email = ref('');
let password = ref('');
let error = ref('');
let loading = ref(false);
let showModal = ref(false);

const loginSham = z.object({
  email: z
    .string()
    .min(1, 'Please enter your email!')
    .email("Enter your email!"),
  password: z
    .string()
    .min(1, ' Please Enter your password!')
    .min(8, 'Enter 8 latter for password!')
});

const handleLogin = async () => {
  let result = loginSham.safeParse({
    email: email.value,
    password: password.value
  })
  console.log(result);
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
    router.push('/dashboard')
  } catch (err) {
    showModal.value = true;
    authStore.message_error = "Please check your credentials and try again.";
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
          <h3 class="display-4 fw-bold text-uppercase mb-3">Welcome Back</h3>
          <h5 class="fw-normal mb-2">Your Handle Your Name</h5>
          <p class=" fw-light opacity-75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmo, dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod.
          </p>
        </div>
      </div>
      <div class="col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div class="w-100" style="max-width: 450px;">
          <h1 class="fw-bold text-dark mb-2" style="font-size: 3rem;">Sign in</h1>
          <p class="text-secondary mb-2">Lorem ipsum dolor amet, consectetur adipiscing.</p>

          <form action="" @submit.prevent="handleLogin">
            <BaseInput label="Email" type="email" placeholder="Enter your email" :message_error="error.email" v-model="email">
            </BaseInput>
            <BaseInput label="Password" type="password" placeholder="Enter your password" :message_error="error.password" v-model="password">
            </BaseInput>

            <div class="d-flex justify-content-between align-items-center mb-4 form-actions">
              <div class="checkbox-container ">
                <input type="checkbox" id="remember">
                <label for="remember">Remember me</label>
              </div>
              <a href="#" class="forgot-link">Forget password?</a>
            </div>
            <BaseButton type="submit" :loading="loading"> {{ loading ? 'Loading...' : 'Sign in' }}</BaseButton>
            <!-- <div class="position-relative text-center mb-2">
              <span class="text-secondary small">or</span>
            </div> -->
            <!-- <div class="d-flex justify-content-center gap-3 mb-4">
              <button class="btn border rounded-circle social-btn d-flex align-items-center justify-content-center">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.489 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.799 L -6.734 42.379 C -8.804 40.439 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
              </button>
              <button class="btn border rounded-circle social-btn d-flex align-items-center justify-content-center">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"
                    fill="#1877F2" />
                </svg>
              </button>
              <button class="btn border rounded-circle social-btn d-flex align-items-center justify-content-center">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.67 4.17-1.44 1.03.09 2.04.53 2.89 1.25-2.61 1.63-2.18 5.61.46 7.02-.45 1.55-1.32 3.19-2.6 5.4zm-3.08-13.25c.57-1.12.35-2.69-.74-3.79-1.06-1.1-2.79-1.36-3.46-.22-.72 1.16-.48 2.83.65 3.86 1.02.92 2.82 1.22 3.55.15z"
                    fill="#000000" />
                </svg>
              </button>
            </div> -->
            <!-- <div class="text-center small text-secondary">
              Don't you have an account? <a href="#" class="text-decoration-none fw-bold" style="color: #427c87;">
                Sign up</a>
            </div> -->
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
                    <h2 class="fw-bold mb-2 text-dark">Login failed</h2>
                    <p class="text-muted mb-4 fs-6">
                        {{ authStore.message_error }}
                    </p>
                    <div class="d-flex justify-content-center gap-3 mb-2">
                        <BaseButton type="button" background="btn-custom-cancel btn-lg-custom" text="text-black"
                            @click="closeModal">
                            Cancel
                        </BaseButton>
                    </div>
                </div>
            </template>
    </BaseModal>
  </div>
</template>

<style scoped>
/* 3. Social Button */
.social-btn {
  width: 50px;
  height: 50px;
  transition: transform 0.2s;
}

.social-btn:hover {
  transform: translateY(-2px);
  background-color: #f8f9fa;
}

/* 4. BACKGROUND SHAPES */
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

/* Actions */
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

/* Responsive Fix */
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