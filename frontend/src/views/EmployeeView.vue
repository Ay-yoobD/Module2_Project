<template>
  <header class="PayRollHead">
    <h2 class=" p-3 fw-bold">Employee Management:</h2>
  </header>

  <div class="container mt-4">
    <!-- <h2 class="mb-4">Employees</h2> -->

    <!-- Add Button -->
    <button class="btn mb-3 btnaddemp" @click="openAddModal">Add Employee</button>

    <!-- Employees Table -->
    <table class="table table-striped table-bordered">
      <thead>
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
        <tr v-for="(emp, index) in employees" :key="emp.id">
          <th>{{ emp.id }}</th>
          <td>{{ emp.name }}</td>
          <td>{{ emp.position }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.salary }}</td>
          <td>{{ emp.employmentHistory }}</td>
          <td>{{ emp.contact }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="openEditModal(emp, index)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteEmployee(index)">Delete</button>
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
                  <input v-model="form.name" type="text" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Position</label>
                  <input v-model="form.position" type="text" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Department</label>
                  <input v-model="form.department" type="text" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Salary</label>
                  <input v-model="form.salary" type="number" class="form-control" required>
                </div>
                <div class="col-md-12">
                  <label class="form-label">Employment History</label>
                  <input v-model="form.employmentHistory" type="text" class="form-control">
                </div>
                <div class="col-md-12">
                  <label class="form-label">Contact</label>
                  <input v-model="form.contact" type="email" class="form-control" required>
                </div>
              </div>
              <div class="mt-3">
                <button type="submit" class="btn mx-3 btn-success">{{ isEdit ? 'Update' : 'Add' }}</button>
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
export default {
  data() {
    return {
      employees: [
        {
          id: 1,
          name: "Ay-yoob Dawood",
          position: "Software Engineer",
          department: "Development",
          salary: 70000,
          employmentHistory: "Joined in 2015, promoted to Senior in 2018",
          contact: "Ayoob2322dawood@moderntech.com"
        },
        {
          id: 2,
          name: "Laila Abdurahman",
          position: "HR Manager",
          department: "HR",
          salary: 80000,
          employmentHistory: "Joined in 2013, promoted to Senior Manager in 2017",
          contact: "lailaabdurahman@moderntech.com"
        },

        {
          id: 3,
          name: "Zayaan Salie",
          position: "Quality Analyst",
          department: "QA",
          salary: 55000,
          employmentHistory: "Joined in 2018",
          contact: "zayaansalie@moderntech.com"
        },
        {
          id: 4,
          name: "Kauthar Naidoo",
          position: "Sales Representative",
          department: "Sales",
          salary: 60000,
          employmentHistory: "Joined in 2020",
          contact: "kauthar.naidoo@moderntech.com"
        },
        {
          id: 5,
          name: "zubair Davids",
          position: "Marketing Specialist",
          department: "Marketing",
          salary: 58000,
          employmentHistory: "Joined in 2019",
          contact: "zubair453@moderntech.com"
        },
        {
          id: 6,
          name: "Sipho Zulu",
          position: "UI/UX Designer",
          department: "Design",
          salary: 65000,
          employmentHistory: "Joined in 2016",
          contact: "sipho.zulu@moderntech.com"
        },
        {
          id: 7,
          name: "Natheerah Abdullah",
          position: "DevOps Engineer",
          department: "IT",
          salary: 72000,
          employmentHistory: "Joined in 2017",
          contact: "natheerah8909@moderntech.com"
        },
        {
          id: 8,
          name: "Farah thomas",
          position: "Content Strategist",
          department: "Marketing",
          salary: 56000,
          employmentHistory: "Joined in 2021",
          contact: "farah9081@moderntech.com"
        },
        {
          id: 9,
          name: "Daniel davis",
          position: "Accountant",
          department: "Finance",
          salary: 62000,
          employmentHistory: "Joined in 2018",
          contact: "Daniel2345@moderntech.com"
        },
        {
          id: 10,
          name: "Fatima Patel",
          position: "Customer Support Lead",
          department: "Support",
          salary: 58000,
          employmentHistory: "Joined in 2016",
          contact: "fatima.patel@moderntech.com"
        }
      ]
        // ... Other employees
      ,
      form: {
        name: '',
        position: '',
        department: '',
        salary: '',
        employmentHistory: '',
        contact: ''
      },
      isEdit: false,
      currentIndex: null
    };
  },
  methods: {
    openAddModal() {
      this.resetForm();
      this.isEdit = false;
      new bootstrap.Modal(this.$refs.modal).show();
    },
    openEditModal(emp, index) {
      this.form = { ...emp };
      this.currentIndex = index;
      this.isEdit = true;
      new bootstrap.Modal(this.$refs.modal).show();
    },
    saveEmployee() {
      if (this.isEdit) {
        this.employees.splice(this.currentIndex, 1, { ...this.form, id: this.employees[this.currentIndex].id });
      } else {
        const newId = this.employees.length ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
        this.employees.push({ ...this.form, id: newId });
      }
      bootstrap.Modal.getInstance(this.$refs.modal).hide();
      this.resetForm();
    },
    deleteEmployee(index) {
      if (confirm("Are you sure you want to delete this employee?")) {
        this.employees.splice(index, 1);
      }
    },
    resetForm() {
      this.form = {
        name: '',
        position: '',
        department: '',
        salary: '',
        employmentHistory: '',
        contact: ''
      };
      this.currentIndex = null;
    }
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
  font-size: 1.08rem;
  
}

thead {
  background-color: #3794f1;
  color: white;
}

th{
  background-color: #2c3e50;
  color : whitesmoke ;
}

.btnaddemp{
  text-align: center;
  border-radius: 5px;
  border: #0c2c47 solid 3px;
  box-shadow: #B497BD 3px 3px 2px;
  background: #93d1cb;
  transition: background 0.3s ease;
  transition: box-shadow 0.2s ease;
  transition: transform 0.3s ease;
  font-size: 18px;

  
  
}

.btnaddemp:hover {
    background: #B497BD;
    box-shadow: none;
    transform: scale(1.026);
}


</style>
