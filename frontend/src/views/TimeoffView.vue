<template>
  <header class="PayRollHead">
    <h2 class=" p-3 fw-bold">Leave Request Form:</h2>
  </header>

  <div class="main-container LeaveBody">
    <!-- <h1>Leave Request Form</h1> -->

    <div class="form-container">
      <form @submit.prevent="submitForm">

        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required>

        <label for="date">Date:</label>
        <input type="date" id="date" v-model="form.date" required />

        <label for="type">Type:</label>
        <select id="type" v-model="form.type" required>
          <option selected disabled hidden value="">Please choose...</option>
          <option>Sick leave</option>
          <option>Annual leave</option>
          <option>Maternity leave</option>
          <option>Parental leave</option>
          <option>Bereavement</option>
          <option>Unpaid leave</option>
          <option>Study leave</option>
        </select>

        <label for="reason">Reason:</label>
        <textarea id="reason" v-model="form.reason" required></textarea>

        <button type="submit">Request</button>
      </form>

      <div class="requests-list" style="margin-top: 40px;">
        <h2>New Leave Requests (Pending HR Review)</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="leaveRequests.length === 0">
              <td colspan="6" style="text-align: center; font-style: italic; color: #666;">
                No new leave requests.
              </td>
            </tr>
            <tr v-for="(request, index) in leaveRequests" :key="request.id">
              <td>{{ request.name }}</td>
              <td>{{ request.date }}</td>
              <td>{{ request.type }}</td>
              <td>{{ request.reason }}</td>
              <td>{{ request.status }}</td>
              <td>
                <button @click="approveRequest(index)">Approve</button>
                <button @click="denyRequest(index)">Deny</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- JSON employee data leave requests -->
    <div v-if="employeeData.length" class="requests-list">
      <h2>All Employee Leave Requests</h2>
      <div v-for="(employee, index) in employeeData" :key="index" class="employee-block">
        <h3 class="h3">{{ employee.name }}</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(request, rIndex) in employee.leaveRequests" :key="rIndex">
              <td>{{ request.date }}</td>
              <td>{{ request.reason }}</td>
              <td>{{ request.type || '-' }}</td>
              <td>{{ request.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeOffView',
  data() {
    return {
      form: {
        name: '',
        date: '',
        type: '',
        reason: ''
      },
      leaveRequests: [], // new unprocessed requests
      employeeData: [] // loaded from JSON
    }
  },
  mounted() {
    fetch('/attendance.json')
      .then(response => response.json())
      .then(data => {
        this.employeeData = data.attendanceAndLeave
      })
      .catch(error => {
        console.error("Failed to load JSON:", error);
      })
  },
  methods: {
    submitForm() {
      const newRequest = {
        ...this.form,
        status: 'pending',
        id: Date.now()
      }
      this.leaveRequests.push(newRequest)

      alert('Leave request submitted successfully!')

      // Reset form
      this.form = { name: '', date: '', type: '', reason: '' }
    },
    approveRequest(index) {
      this.processRequest(index, 'approved')
    },
    denyRequest(index) {
      this.processRequest(index, 'denied')
    },
    processRequest(index, status) {
      const request = this.leaveRequests[index]
      request.status = status

      const employee = this.employeeData.find(emp => emp.name === request.name)
      if (employee) {
        employee.leaveRequests.push({
          date: request.date,
          reason: request.reason,
          type: request.type,
          status: request.status
        })
      } else {
        alert('Employee not found in employee data.')
      }

      // Remove from new requests list
      this.leaveRequests.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.LeaveBody {
  font-family: "Lato", 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #0f0f0f;
}



h1 {
  text-align: center;
}

.h3 {
  margin-top: 20px;
  text-decoration: underline;
}

form {
  width: 400px;
  border: 1px solid #0f0f0f;
  border-radius: 5px;
  margin: 0 auto;
  color: #0f0f0f;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

label {
  display: block;
  width: 95%;
  padding-bottom: 3px;
}

input,
select,
textarea {
  width: 99%;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

button {
  display: block;
  width: 100%;
  letter-spacing: 0.5px;
  background-color: white;
  border: 1px solid #0f0f0f;
  border-radius: 3px;
  padding: 8px 0;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  margin-bottom: 5px;
}

button:hover {
  background-color: #0C2C4A;
  color: #fff;
  border: 1px solid #0f0f0f;
}

.main-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 30px;
}

.requests-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

.requests-list h2 {
  margin-bottom: 10px;
}

.requests-list table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
}

.requests-list th,
.requests-list td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.requests-list th {
  background-color: #f4f6fb;
}

.employee-block {
  margin-bottom: 20px;
  width: 100%;
}
</style>
