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
        const response = await fetch("/login_credentials.json");
        const users = await response.json();

        console.log("Users loaded:", users);
        console.log("Entered:", this.username, this.password);

        const validUser = users.find(user =>
          user.username === this.username && user.password === this.password
        );

        if (validUser) {
          console.log("Login successful!");
          this.error = "";
          this.$router.push("/home");
        } else {
          console.warn("Invalid credentials");
          this.error = "Invalid username or password";
        }
      } catch (err) {
        console.error("Login failed:", err);
        this.error = "Error logging in. Please try again.";
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  background: linear-gradient(to right, #0c2c47, #7ea1af);
  padding: none;
}
.card {
  border: none;
  border-radius: 10px;
}
</style>