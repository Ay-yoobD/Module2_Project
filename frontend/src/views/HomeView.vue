<template>
  <div class="home-wrapper">
    <div class="content-container">
      <div class="top-section">
        <div class="left">
          <img
            src="https://images.stockcake.com/public/5/8/4/5844644a-d098-4361-9149-ee3ee27b0ca5_large/technology-meets-design-stockcake.jpg"
            alt="Modern Tech Logo"
            class="logo"
          />

          <h1 class="title">Welcome to Modern Tech</h1>
          <p class="subtitle">Your seamless employee management solution</p>

          <div class="buttons-container">
            <router-link to="/employees" class="btn primary">View Employees</router-link>
            <router-link to="/employees" class="btn primary">Manage Account</router-link>
            <router-link to="/payroll" class="btn primary">View Payroll</router-link>
          </div>

          <div class="search-section">
            <input v-model="searchQuery" type="text" placeholder="Search employee by name..." class="search-bar" />
            <p v-if="searchQuery" class="search-results">Searching for: <strong>{{ searchQuery }}</strong></p>
          </div>
        </div>

        <div class="right">
          <h3 class="chart-title">Employee Growth Overview</h3>
          <canvas id="employeeChart"></canvas>
        </div>
      </div>

      <hr class="divider" />

      <div class="features-section">
        <h2 class="features-title">Why Choose ModernTech?</h2>
        <ul class="features-list">
          <li><i class="bi bi-people-fill"></i> Centralized Employee Directory with Instant Access</li>
          <li><i class="bi bi-calendar-check-fill"></i> Streamlined Time-Off Management for Improved HR Flow</li>
          <li><i class="bi bi-cash-coin"></i> Automated Payroll That Saves You Time</li>
          <li><i class="bi bi-bar-chart-line-fill"></i> Track Reviews and Performance Over Time</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'HomePage',
  setup() {
    const searchQuery = ref('');

    onMounted(() => {
      const ctx = document.getElementById('employeeChart');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Employees Added',
              data: [5, 8, 10, 15, 20, 30],
              fill: true,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: { color: '#333' },
            },
          },
          scales: {
            x: { ticks: { color: '#555' } },
            y: { ticks: { color: '#555' } },
          },
        },
      });
    });

    return { searchQuery };
  },
};
</script>

<style scoped>
.home-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #ece9e6, #ffffff);
  padding: 40px 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  overflow-x: auto;
}

.content-container {
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  max-width: 1300px;
  width: 100%;
  box-sizing: border-box;
}

.top-section {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.left {
  flex: 1;
  min-width: 300px;
}

.right {
  flex: 1;
  min-width: 300px;
}

.logo {
  width: 250px;
  margin-bottom: 20px;
  border-radius: 12px;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 25px;
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 25px;
}

.btn {
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 6px 14px rgba(0, 123, 255, 0.2);
}

.btn.primary {
  background-color: #007bff;
  color: #fff;
}

.btn.primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.search-section {
  margin-top: 20px;
}

.search-bar {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-results {
  margin-top: 8px;
  font-size: 0.95rem;
  color: #444;
}

.divider {
  margin: 40px auto;
  border-top: 1px solid #ddd;
  width: 90%;
}

.features-section {
  margin-top: 30px;
}

.features-title {
  text-align: center;
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 20px;
}

.features-list {
  list-style: none;
  padding: 0;
  font-size: 1.05rem;
  color: #444;
  line-height: 1.7;
}

.features-list li {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.features-list i {
  color: #007bff;
  font-size: 1.2rem;
  margin-right: 10px;
}

.chart-title {
  font-size: 0.0rem;
  margin-bottom: 0px;
  text-align: center;
}

#employeeChart {
  width: 0%;
  height: 0px;
}
</style>
