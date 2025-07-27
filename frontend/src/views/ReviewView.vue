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
      <option v-for="emp in UsersInfo" :key="emp.EmployeeID" :value="emp.EmployeeID">
        {{ emp.Name }}
      </option>
    </select>

    <!-- Review Cards -->
    <div v-if="filteredReviews.length ">
      <div v-for="review in filteredReviews" :key="review.id" class="card p-3 mb-3">
        <h5 class="mb-1">{{ getEmployeeName(review.EmployeeID) }}</h5>
        <small class="text-muted">Reviewed by: {{ review.Reviewer }} on {{ review.Date }}</small>
        <p class="mb-1">Rating: {{ review.Rating }}/5</p>
        <p>{{ review.Comments }}</p>
      </div>
    </div>
    <p v-else-if="selectedEmployeeId">No reviews found for this employee.</p>
  </div>
</template>

<script>


export default {
  data() {
    return {
      UsersInfo: [],
      ReviewInfo: [],
      selectedEmployeeId: ''
    }
  },
  computed: {

    filteredReviews() {
      if (!this.selectedEmployeeId || !Array.isArray(this.ReviewInfo)) return [];
      return this.ReviewInfo.filter(
        review => review.EmployeeID === Number(this.selectedEmployeeId)
      );
    },


    selectedUserInfo() {
      return this.UsersInfo.find(
        EmployeeData => EmployeeData.EmployeeID === Number(this.selectedEmployeeId)
      );

    },

    UsersUpd() {
      return this.$store.state.users;

    },

    reviews() {
      return this.$store.state.reviews;
    },


  },

  methods: {
    getEmployeeName(id) {
      const EmpID = this.UsersInfo.find(i => i.EmployeeID === id);
      return EmpID ? EmpID.Name : 'Unknown';
    },

  },

  mounted() {


    this.$store.dispatch('getReviews').then(() => {
      this.ReviewInfo = this.$store.state.reviews;
      console.log(this.ReviewInfo)
    });

    this.$store.dispatch('getUsers').then(() => {
      this.UsersInfo = this.$store.state.users;
    });
   console.log(this.ReviewInfo)
  },

  watch: {
    UsersUpd(newUsers) {
      this.UsersInfo = newUsers;
    },

  }

}


</script>

<style scoped>
.card {

  border: #0c2c47 solid 3px;
  padding: 35px;
  border-radius: 5px;
}
</style>
