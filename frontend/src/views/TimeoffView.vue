because here's what i have but only the buttons arent linked to the db for some reason:

<template>
  <header class="PayRollHead">
    <h2 class="p-3 fw-bold">Leave Request Form:</h2>
  </header>

  <div class="main-container">
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <label for="employeeName">Employee Name:</label>
        <select id="employeeName" v-model="form.employeeName" required>
          <option value="" disabled selected>Select employee</option>
          <option v-for="name in employeeNames" :key="name" :value="name">
            {{ name }}
          </option>
        </select>

        <label for="date">Date:</label>
        <input type="date" id="date" v-model="form.date" required />

        <label for="type">Leave Type:</label>
        <select id="type" v-model="form.type" required>
          <option value="" disabled selected>Select type</option>
          <option>Sick Leave</option>
          <option>Personal</option>
          <option>Family Responsibility</option>
          <option>Vacation</option>
          <option>Medical Appointment</option>
          <option>Bereavement</option>
          <option>Childcare</option>
        </select>

        <label for="reason">Reason:</label>
        <textarea id="reason" v-model="form.reason" required></textarea>

        <button type="submit">Submit Request</button>
      </form>

      <div class="requests-list" style="margin-top: 40px;">
        <h2>Leave Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
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
                No leave requests found.
              </td>
            </tr>
            <tr v-for="(request, index) in leaveRequests" :key="request.leaveRequestID">
              <td>{{ request.Name }}</td>
              <td>{{ formatDate(request.Date) }}</td>
              <td>{{ extractLeaveType(request.Reason) }}</td>
              <td>{{ extractLeaveReason(request.Reason) }}</td>
              <td :class="statusClass(request.Status)">
                {{ request.Status }}
              </td>
              <td>
                <button @click="updateRequest(request.leaveRequestID, 'Approved')"
                  :disabled="request.Status !== 'Pending'">Approve</button>
                <button @click="updateRequest(request.leaveRequestID, 'Denied')"
                  :disabled="request.Status !== 'Pending'">Deny</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeoffView',
  data() {
    return {
      form: {
        employeeName: '',
        date: '',
        type: '',
        reason: ''
      },
      leaveRequests: [],
      employeeNames: [],
      currentUser: null
    }
  },
  async mounted() {
    await this.fetchCurrentUser();
    await this.fetchEmployeeNames();
    await this.fetchLeaveRequests();
  },
  methods: {
    async fetchCurrentUser() {
      try {
        const response = await fetch('http://localhost:3000/current-user');
        this.currentUser = await response.json();
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    async fetchEmployeeNames() {
      try {
        const response = await fetch('http://localhost:3000/leave-requests/employee-names');
        this.employeeNames = await response.json();
      } catch (error) {
        console.error("Failed to load employee names:", error);
      }
    },
    async fetchLeaveRequests() {
      try {
        const response = await fetch('http://localhost:3000/leave-requests');
        this.leaveRequests = await response.json();
      } catch (error) {
        console.error("Failed to load leave requests:", error);
      }
    },
    async submitForm() {
      try {
        const fullReason = `${this.form.type}: ${this.form.reason}`;

        const response = await fetch('http://localhost:3000/leave-requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employeeName: this.form.employeeName,
            date: this.form.date,
            reason: fullReason
          })
        });

        if (response.ok) {
          alert('Leave request submitted successfully!');
          this.resetForm();
          await this.fetchLeaveRequests();
        } else {
          throw new Error('Failed to submit request');
        }
      } catch (error) {
        console.error("Error submitting leave request:", error);
        alert('Error submitting request. Please try again.');
      }
    },
    async updateRequest(leaveRequestID, status) {
      try {
        await
          fetch(`http://localhost:3000/leave-requests/${leaveRequestID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
          });
        this.fetchLeaveRequests();
      } catch (err) {
        console.error(err);
      }
    },
    resetForm() {
      this.form = {
        employeeName: '',
        date: '',
        type: '',
        reason: ''
      };
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    extractLeaveType(reason) {
      return reason.split(':')[0];
    },
    extractLeaveReason(reason) {
      return reason.split(':').slice(1).join(':').trim();
    },
    statusClass(status) {
      return {
        'text-success': status === 'Approved',
        'text-danger': status === 'Denied',
        'text-warning': status === 'Pending'
      };
    }
  }
}
</script>

<style scoped>
* {
  font-family: "Lato", 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #0f0f0f;
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

.text-success {
  color: green;
}

.text-danger {
  color: red;
}

.text-warning {
  color: orange;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

select {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>