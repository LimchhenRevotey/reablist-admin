<template>
  <div class="wrapper">
    <div class="shape-main"></div>
    <div class="shape-bottom-left"></div>
    <div class="shape-bottom-right"></div>

    <div class="content-container">
      <div class="left-panel">
        <div class="text-content">
          <h1 class="welcome-title">WELCOME BACK</h1>
          <h2 class="welcome-subtitle">Your Handle Your Name</h2>
          <p class="welcome-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmo, dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
        </div>
      </div>

      <div class="right-panel">
        <div>
          <h1 class="signin-title">Sign in</h1>
          <p class="signin-subtitle">Lorem ipsum dolor amet, consectetur adipiscing.</p>

          <form onsubmit="return false;">
            <div class="input-group">
              <label>Email</label>
              <input type="email" placeholder="Enter Your email" class="custom-input">
            </div>

            <div class="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter Your password" class="custom-input">
            </div>

            <div class="form-actions">
              <div class="checkbox-container">
                <input type="checkbox" id="remember">
                <label for="remember">Remember me</label>
              </div>
              <a href="#" class="forgot-link">Forget password?</a>
            </div>

            <button class="btn-signin">Sign in</button>

            <div class="divider">or</div>

            <div class="social-login">
              <button class="social-btn">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.489 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.799 L -6.734 42.379 C -8.804 40.439 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
              </button>
              <button class="social-btn">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" fill="#1877F2"/></svg>
              </button>
              <button class="social-btn">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.67 4.17-1.44 1.03.09 2.04.53 2.89 1.25-2.61 1.63-2.18 5.61.46 7.02-.45 1.55-1.32 3.19-2.6 5.4zm-3.08-13.25c.57-1.12.35-2.69-.74-3.79-1.06-1.1-2.79-1.36-3.46-.22-.72 1.16-.48 2.83.65 3.86 1.02.92 2.82 1.22 3.55.15z" fill="#000000"/></svg>
              </button>
            </div>

            <div class="signup-footer">
              Don't you have an account? <a href="#">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Reset & Base */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

/* Wrapper */
.wrapper { width: 100vw; height: 100vh; position: relative; background-color: #ffffff; overflow: hidden; display: flex; justify-content: center; align-items: center; }

/* --- BACKGROUND SHAPES (ទំហំធំដូចដើមវិញ) --- */
.shape-main {
  position: absolute;
  top: -10%;       /* ត្រឡប់ទៅតម្លៃដើម */
  left: -20%;      /* ត្រឡប់ទៅតម្លៃដើម */
  width: 70vw;     /* ត្រឡប់ទៅទំហំធំ */
  height: 120vh;   /* ត្រឡប់ទៅទំហំធំ */
  background-color: #427c87;
  border-radius: 50%;
  z-index: 1;
}

.shape-bottom-left {
  position: absolute;
  bottom: -150px;  /* ត្រឡប់ទៅតម្លៃដើម */
  left: -100px;    /* ត្រឡប់ទៅតម្លៃដើម */
  width: 350px;    /* ត្រឡប់ទៅទំហំធំ */
  height: 350px;   /* ត្រឡប់ទៅទំហំធំ */
  background-color: #32606a;
  border-radius: 50%;
  z-index: 2;
  opacity: 0.9;
}

.shape-bottom-right {
  position: absolute;
  bottom: -200px;  /* ត្រឡប់ទៅតម្លៃដើម */
  right: -150px;   /* ត្រឡប់ទៅតម្លៃដើម */
  width: 400px;    /* ត្រឡប់ទៅទំហំធំ */
  height: 400px;   /* ត្រឡប់ទៅទំហំធំ */
  background-color: #32606a;
  border-radius: 50%;
  z-index: 1;
}

/* --- TEXT CONTENT (រក្សាពណ៌ឱ្យច្បាស់ដូចសំណើមុន) --- */
.content-container { position: relative; z-index: 10; width: 100%; max-width: 1400px; height: 100%; display: flex; }
.left-panel { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-left: 100px; padding-right: 150px; }
.text-content { max-width: 600px; }
.welcome-title { font-size: 56px; font-weight: 700; letter-spacing: 2px; margin-bottom: 20px; text-transform: uppercase; color:#FFFFFF; }
.welcome-subtitle { font-size: 32px; font-weight: 400; color: #FFFFFF; }
.welcome-desc { font-size: 16px; line-height: 1.6; font-weight: 300; color: #F0F0F0; }

/* --- RIGHT PANEL & FORM (រក្សាទម្រង់ដែលមើលឃើញច្បាស់ និងជិតគ្នា) --- */
.right-panel { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-right: 150px; }

.login-card {
  background: white;
  width: 100%;
  max-width: 480px;
  padding: 40px; /* រក្សា Padding តូច */
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 20;
}

.signin-title {
  font-size: 40px; 
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.signin-subtitle {
  color: #555; 
  font-size: 14px;
  margin-bottom: 25px; /* រក្សាគម្លាតតូច */
}

/* Input Styles */
.input-group {
  margin-bottom: 15px; /* រក្សាគម្លាតតូច */
}

label {
  display: block;
  color: #2c535a; 
  font-size: 14px;
  margin-bottom: 6px;
  font-weight: 600;
}

.custom-input {
  width: 100%;
  padding: 14px;
  border-radius: 6px;
  border: 1px solid #ced4da; /* រក្សាស៊ុម */
  background-color: #f8f9fa; 
  font-size: 14px;
  color: #000;
  outline: none;
  transition: all 0.2s;
}

.custom-input:focus {
  border-color: #5a94a0;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(90, 148, 160, 0.1);
}

.custom-input::placeholder {
  color: #888; 
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

/* Sign In Button */
.btn-signin {
  width: 100%;
  padding: 14px;
  background-color: #427c87; 
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-signin:hover {
  opacity: 0.9;
}

.divider {
  text-align: center;
  margin: 16px 0; 
  font-weight: 500;
  font-size: 13px;
  color: #888;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px; 
}

.social-btn {
  background: white;
  border: 1px solid #e5e7eb; 
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.social-btn:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.signup-footer {
  text-align: center;
  font-size: 13px;
  color: #333;
}

.signup-footer a {
  color: #427c87;
  text-decoration: none;
  font-weight: 700;
}

@media (max-width: 1024px) {
  .wrapper { flex-direction: column; height: auto; overflow-y: auto; }
  
  /* Reset responsive shapes to larger default logic */
  .shape-main { 
    width: 150%; 
    height: 50vh; 
    left: -25%; 
    top: -10%; 
    border-radius: 0 0 50% 50%; 
  }
  
  .content-container { flex-direction: column; }
  .left-panel { padding: 80px 40px 60px 40px; align-items: center; text-align: center; }
  .right-panel { padding: 60px 20px; background: white; }
}
</style>