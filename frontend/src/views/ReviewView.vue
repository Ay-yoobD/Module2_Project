<template>
  <header class="PayRollHead">
    <h2 class=" p-3 fw-bold">Employee Reviews:</h2>
  </header>

  <div class="container mt-4">
    <!-- <h2>Employee Reviews</h2> -->

    <!-- Employee Selector -->
    <label for="employeeSelect" class="form-label">Select an Employee:</label>
    <select id="employeeSelect" v-model="selectedEmployeeId" class="form-select mb-3">
      <option disabled value="">-- Choose an Employee --</option>
      <option v-for="emp in employees" :key="emp.employeeId" :value="emp.employeeId">
        {{ emp.name }}
      </option>
    </select>

    <!-- Review Cards -->
    <div v-if="filteredReviews.length">
      <div v-for="review in filteredReviews" :key="review.id" class="card p-3 mb-3">
        <h5 class="mb-1">{{ getEmployeeName(review.employeeId) }}</h5>
        <small class="text-muted">Reviewed by: {{ review.reviewer }} on {{ review.date }}</small>
        <p class="mb-1">Rating: {{ review.rating }}/5</p>
        <p>{{ review.comments }}</p>
      </div>
    </div>
    <p v-else-if="selectedEmployeeId">No reviews found for this employee.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      reviews: [],
      selectedEmployeeId: ''
    }
  },
  computed: {
    filteredReviews() {
      if (!this.selectedEmployeeId) return [];
      return this.reviews.filter(
        review => review.employeeId === parseInt(this.selectedEmployeeId)
      );
    }
  },
  methods: {
    getEmployeeName(id) {
      const emp = this.employees.find(e => e.employeeId === id);
      return emp ? emp.name : 'Unknown';
    },
    async fetchData() {
      const empRes = await fetch('/employee_info.json');
      const empData = await empRes.json();
      this.employees = empData.employeeInformation;

      const revRes = await fetch('/employee_reviews.json');
      const revData = await revRes.json();
      this.reviews = revData;
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
