<template>
  <div class="login-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            v-model.trim="username"
            type="text"
            id="username"
            class="form-control"
            autocomplete="username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model.trim="password"
            type="password"
            id="password"
            class="form-control"
            autocomplete="current-password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Log In</button>
        <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch("http://localhost:9090/verify-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('sessionId', data.sessionId);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.error = "";
          this.$router.push("/home");
        } else {
          this.error = data.message || "Invalid username or password";
        }
      } catch (err) {
        this.error = "Error logging in. Please try again.";
        console.error("Login error:", err);
      }
    }
  }
};  
</script>

<style scoped>
.login-container {
  background: linear-gradient(to right, #0c2c47, #7ea1af);
}
.card {
  border: none;
  border-radius: 10px;
}
</style>