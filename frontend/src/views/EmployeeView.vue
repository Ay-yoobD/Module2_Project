<template>
  <header class="PayRollHead">
    <h2 class="p-3 fw-bold">Employee Management:</h2>
  </header>

  <div class="container mt-4">
    <button class="btn btn-primary mb-3" @click="openAddModal">Add Employee</button>

    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Employment History</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id">
          <th>{{ emp.id }}</th>
          <td>{{ emp.name }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.salary }}</td>
          <td>{{ emp.employmentHistory }}</td>
          <td>{{ emp.contact }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="openEditModal(emp)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteEmployee(emp.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="employeeModal" tabindex="-1" aria-labelledby="employeeModalLabel" aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="employeeModalLabel">{{ isEdit ? 'Edit Employee' : 'Add Employee' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveEmployee">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Name</label>
                  <input v-model="form.name" type="text" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Position</label>
                  <input v-model="form.position" type="text" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Department</label>
                  <input v-model="form.department" type="text" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Salary</label>
                  <input v-model="form.salary" type="number" class="form-control" required />
                </div>
                <div class="col-md-12">
                  <label class="form-label">Employment History</label>
                  <input v-model="form.employmentHistory" type="text" class="form-control" />
                </div>
                <div class="col-md-12">
                  <label class="form-label">Contact</label>
                  <input v-model="form.contact" type="email" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Username</label>
                  <input v-model="form.username" type="text" class="form-control" :required="!isEdit" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Password</label>
                  <input v-model="form.password" type="password" class="form-control" :required="!isEdit" />
                </div>
              </div>
              <div class="mt-3">
                <button type="submit" class="btn btn-success">{{ isEdit ? 'Update' : 'Add' }}</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
      form: {
        name: '',
        position: '',
        department: '',
        salary: '',
        employmentHistory: '',
        contact: '',
        username: '',
        password: ''
      },                            
      isEdit: false,
      currentId: null
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get('http://localhost:9090/users');
        this.employees = response.data.map(user => ({
          id: user.EmployeeID,
          name: user.Name,
          position: user.Position,
          department: user.Department,
          salary: user.Salary,
          employmentHistory: user.EmploymentHistory,
          contact: user.Contact
        }));
      } catch (error) {
        alert("Failed to fetch employees");
        console.error(error);
      }
    },
    openAddModal() {
      this.resetForm();
      this.isEdit = false;
      new bootstrap.Modal(this.$refs.modal).show();
    },
    openEditModal(emp) {
      this.form = {
        name: emp.name,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
        employmentHistory: emp.employmentHistory,
        contact: emp.contact,
        username: '',
        password: ''
      };
      this.currentId = emp.id;
      this.isEdit = true;
      new bootstrap.Modal(this.$refs.modal).show();
    },
    async saveEmployee() {
      try {
        const payload = {
          Name: this.form.name,
          Position: this.form.position,
          Department: this.form.department,
          Salary: this.form.salary,
          EmploymentHistory: this.form.employmentHistory,
          Contact: this.form.contact
        };

        if (!this.isEdit) {
          payload.Username = this.form.username;
          payload.Password = this.form.password;
        }

        if (this.isEdit) {
          await axios.put(`http://localhost:9090/users/${this.currentId}`, payload);
        } else {
          await axios.post('http://localhost:9090/users', payload);
        }

        bootstrap.Modal.getInstance(this.$refs.modal).hide();
        this.resetForm();
        this.fetchEmployees();
      } catch (error) {
        alert("Failed to save employee");
        console.error(error);
      }
    },
    async deleteEmployee(id) {
      if (confirm("Are you sure you want to delete this employee?")) {
        try {
          await axios.delete(`http://localhost:9090/users/${id}`);
          this.fetchEmployees();
        } catch (error) {
          alert("Failed to delete employee");
          console.error(error);
        }
      }
    },
    resetForm() {
      this.form = {
        name: '',
        position: '',
        department: '',
        salary: '',
        employmentHistory: '',
        contact: '',
        username: '',
        password: ''
      };
      this.currentId = null;
    }
  },
  mounted() {
    this.fetchEmployees();
  }
};
</script>

<style scoped>
.container {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 16px rgba(46, 143, 240, 0.1);
  padding: 32px;
}

th, td {
  text-align: left;
  padding: 10px 8px;
  font-size: 1rem;
}

thead {
  background-color: #3794f1;
  color: white;
}
</style>
